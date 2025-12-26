import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-800/90 text-slate-100 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-start md:items-start justify-between gap-6 md:gap-8">
        <div className="flex-1 w-full md:w-auto">
          <Logo />
          <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-md">
            We combine advanced technology with a compassionate approach to
            ensure the best outcomes for you and your family.
          </p>
        </div>

        <div className="flex-1 w-full md:w-auto">
          <h4 className="font-semibold text-white mb-3 text-sm md:text-base">
            Company
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            <li>
              <Link
                to="/"
                className="hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-1 w-full md:w-auto">
          <h4 className="font-semibold text-white mb-3 text-sm md:text-base">
            Get in Touch
          </h4>
          <div className="text-xs sm:text-sm text-slate-300 space-y-1">
            <div className="font-medium text-white">+91-9811476640</div>
            <div>careplus@getintouch.com</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 mt-6 md:mt-8 border-t border-slate-700 pt-4 text-center text-xs sm:text-sm text-slate-400">
        Made with ♥ by Anuj. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;