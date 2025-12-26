import React, { useState } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import API from "../../config/API";
import { DocContext } from "../context/DocContext";
import { toast } from 'react-toastify';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setAdmin } = useContext(AdminContext);
  const { doctors } = useContext(DocContext);

  const handleLogout = async () => {
    await API.post("/admin/logout");
    toast.success("logout Successfull");
    setAdmin(null);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white px-4 py-2 rounded shadow-md text-xl font-bold"
      >
        {isOpen ? "X" : "☰"}
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black bg-opacity-30 z-30"
        />
      )}

      <div
        className={`fixed md:static w-64 bg-[#ffffff] h-screen shadow-md border-r border-gray-200 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="mb-8 pb-4 border-b border-gray-200 ">
            <h2 className="text-gray-800 text-2xl font-semibold mb-1">
              Admin Panel
            </h2>
            <p className="text-gray-500 text-sm">Hospital Management</p>
          </div>
          <div className="space-y-3 flex-1">
            <div>
              <NavLink
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-800 text-white font-medium flex items-center px-4 py-3 rounded transition-all duration-200"
                    : "text-gray-700 hover:bg-gray-100 flex items-center px-4 py-3 rounded transition-all duration-200"
                }
                to="/"
              >
                Dashboard
              </NavLink>
            </div>
            <div>
              <NavLink
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-800 text-white font-medium flex items-center px-4 py-3 rounded transition-all duration-200"
                    : "text-gray-700 hover:bg-gray-100 flex items-center px-4 py-3 rounded transition-all duration-200"
                }
                to="/addDoctor"
              >
                Add Doctor
              </NavLink>
            </div>
            <div>
              <NavLink
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-800 text-white font-medium flex items-center px-4 py-3 rounded transition-all duration-200"
                    : "text-gray-700 hover:bg-gray-100 flex items-center px-4 py-3 rounded transition-all duration-200"
                }
                to="/appointments"
              >
                Appointments
              </NavLink>
            </div>
            <div>
              <NavLink
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-800 text-white font-medium flex items-center px-4 py-3 rounded transition-all duration-200"
                    : "text-gray-700 hover:bg-gray-100 flex items-center px-4 py-3 rounded transition-all duration-200"
                }
                to="/doctors"
              >
                Doctors
              </NavLink>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-3 px-4 py-3 rounded text-red-600 hover:bg-red-50 transition-colors"
          >
            <span className="text-lg">⏻</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
