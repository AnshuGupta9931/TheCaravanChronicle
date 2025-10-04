import React from "react";
import { Link, NavLink } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"; // Example icon

export default function Header() {
  return (
    <header className="shadow-md sticky top-0 z-50 bg-white">
      <nav className="border-b border-gray-100 px-4 lg:px-6 py-3">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          
          {/* Project Title with Icon */}
          <Link to="/" className="flex items-center space-x-2">
            <CurrencyDollarIcon className="h-6 w-6 text-green-800" />
            <span className="text-2xl font-bold text-green-800">Caravan Chronicle</span>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center lg:order-2 space-x-2">
            <Link
              to="/login"
              className="text-gray-800 hover:text-green-800 focus:ring-2 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2 transition"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="bg-green-800 text-white hover:bg-green-600 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition"
            >
              Sign up
            </Link>
          </div>

          {/* Navigation Links */}
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 transition duration-200 rounded ${
                      isActive
                        ? "text-green-800"
                        : "text-gray-700 hover:text-green-800"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 transition duration-200 rounded ${
                       isActive
                        ? "text-green-800"
                        : "text-gray-700 hover:text-green-800"
                    }`
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 transition duration-200 rounded ${
                      isActive
                        ? "text-green-800"
                        : "text-gray-700 hover:text-green-800"
                    }`
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
