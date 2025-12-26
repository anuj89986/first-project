import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import API from "../../config/API";
import { DocContext } from "../context/DocContext";
import { toast } from 'react-toastify';
const DocNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {setDocPanel} = useContext(DocContext)

  const handleLogout = async () => {
    try {
      await API.post('doctor/logout')
      toast.success("logout succesfull")
      setDocPanel(null)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-1">
        <div className="flex justify-between items-center h-20">
          <Logo />
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 font-medium border-b-2 border-teal-600 pb-1"
                  : "text-gray-600 hover:text-teal-600 transition-colors"
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 font-medium border-b-2 border-teal-600 pb-1"
                  : "text-gray-600 hover:text-teal-600 transition-colors"
              }
              to="/appointments"
            >
              Appointments
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 font-medium border-b-2 border-teal-600 pb-1"
                  : "text-gray-600 hover:text-teal-600 transition-colors"
              }
              to="/profile"
            >
              Profile
            </NavLink>
          </div>
          <div className="hidden md:flex">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "block text-teal-600 font-medium bg-teal-50 px-3 py-2 rounded"
                  : "block text-gray-600 hover:bg-gray-100 px-3 py-2 rounded"
              }
              to="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "block text-teal-600 font-medium bg-teal-50 px-3 py-2 rounded"
                  : "block text-gray-600 hover:bg-gray-100 px-3 py-2 rounded"
              }
              to="/appointments"
              onClick={() => setIsOpen(false)}
            >
              Appointments
            </NavLink>
            
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "block text-teal-600 font-medium bg-teal-50 px-3 py-2 rounded"
                  : "block text-gray-600 hover:bg-gray-100 px-3 py-2 rounded"
              }
              to="/profile"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full text-left bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DocNavbar;
