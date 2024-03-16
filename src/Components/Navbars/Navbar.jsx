import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AppContext/AppContext";

const Navbar = () => {
  const { signOutUser, user, userData } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`bg-white transition-width duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="px-4 py-5">
        <div className="flex items-center justify-between">
          <div>{/* Your logo or brand name */}</div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800"
            aria-label="toggle menu"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
              {isOpen ? (
                // Icon for X (close)
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289Z"
                />
              ) : (
                // Icon for hamburger menu
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-800 hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-800 hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/services"
            className="text-gray-800 hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/Register"
            className="text-gray-800 hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            onClick={(signOutUser) => setIsOpen(false)}
          >
            Logout
          </Link>
          {/* Add additional links as needed */}
        </div>
      </div>
      <div className="text-3xl font-extrabold ml-14 text-gray-900 dark:text-white font-roboto">
        Community
      </div>
    </nav>
  );
};

export default Navbar;
