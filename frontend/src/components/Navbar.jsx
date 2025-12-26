import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo.jsx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import API from "../../config/API.js";
import { AuthContext } from "../context/AuthContext.js";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const [dropdown, setDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  const handleLogout = async () => {
    try {
      await API.post("/logout");
      alert("Logout Successful");
      setUser(null);
    } catch (error) {
      alert("Logout failed");
    }
  };

  const clickToggle = async (e) => {
    navigate(e);
    toggleDropdown();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#d4eded]/95 border-b-2 border-gray-300 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <NavLink to="/" className="flex">
              <Logo />
            </NavLink>

            <div className="hidden md:flex flex-1 justify-center">
              <ul className="flex gap-6 lg:gap-8">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-green-500"
                      : "text-gray-700 hover:text-green-500 transition-colors"
                  }
                  to={"/"}
                >
                  Home
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-green-500"
                      : "text-gray-700 hover:text-green-500 transition-colors"
                  }
                  to={"/doctor"}
                >
                  Doctor
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-green-500"
                      : "text-gray-700 hover:text-green-500 transition-colors"
                  }
                  to={"/about"}
                >
                  About
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-green-500"
                      : "text-gray-700 hover:text-green-500 transition-colors"
                  }
                  to={"/contact"}
                >
                  Contact Us
                </NavLink>
              </ul>
            </div>

            <div className="hidden md:flex items-center">
              {user ? (
                <div className="flex items-center gap-4 relative">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src="/icons/profile.png"
                    alt="Profile"
                  />
                  <div onClick={toggleDropdown} className="cursor-pointer">
                    <button>
                      <img
                        className={`w-3 transition-transform ${
                          dropdown ? "hidden" : ""
                        }`}
                        src="/icons/arrow-down-sign-to-navigate.png"
                        alt="Down"
                      />
                    </button>
                    <button>
                      <img
                        className={`w-3 transition-transform ${
                          dropdown ? "" : "hidden"
                        }`}
                        src="/icons/up.png"
                        alt="Up"
                      />
                    </button>
                  </div>
                  <div
                    className={`absolute top-14 right-0 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden min-w-[180px] ${
                      dropdown ? "" : "hidden"
                    }`}
                  >
                    <button
                      onClick={() => clickToggle("/my-profile")}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => clickToggle("/my-appointments")}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-t text-gray-700"
                    >
                      My Appointments
                    </button>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-[#054456] hover:bg-[#043d3d] rounded-full px-6 py-2 text-white font-semibold transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to={"/login"}
                  className="bg-[#054456] hover:bg-[#043d3d] flex items-center gap-2 rounded-full px-6 py-2 text-white font-semibold transition-colors"
                >
                  <span>Login</span>
                  <img src="/icons/user.png" className="h-5 w-5" alt="User" />
                </Link>
              )}
            </div>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {mobileMenu ? (
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
        </div>

        <div
          className={`md:hidden border-t border-gray-300 bg-white ${
            mobileMenu ? "" : "hidden"
          }`}
        >
          <div className="px-4 py-4 space-y-3">
            <NavLink
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-green-50 text-green-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-green-50 text-green-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
              to={"/doctor"}
            >
              Doctor
            </NavLink>
            <NavLink
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-green-50 text-green-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
              to={"/about"}
            >
              About
            </NavLink>
            <NavLink
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-green-50 text-green-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
              to={"/contact"}
            >
              Contact Us
            </NavLink>

            {user ? (
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3 px-3 py-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="/icons/profile.png"
                    alt="Profile"
                  />
                  <span className="font-medium text-gray-700">My Account</span>
                </div>
                <button
                  onClick={() => {
                    clickToggle("/my-profile");
                    setMobileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    clickToggle("/my-appointments");
                    setMobileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  My Appointments
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenu(false);
                  }}
                  className="w-full bg-[#054456] hover:bg-[#043d3d] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to={"/login"}
                onClick={() => setMobileMenu(false)}
                className="flex items-center justify-center gap-2 bg-[#054456] hover:bg-[#043d3d] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                <span>Login</span>
                <img src="/icons/user.png" className="h-5 w-5" alt="User" />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;