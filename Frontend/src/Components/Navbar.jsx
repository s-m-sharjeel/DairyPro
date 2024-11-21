import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLoginToggle }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prevOpen) => !prevOpen);
  };

  return (
    <nav className="bg-blue-800 p-4 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <img
            src="https://example.com/dairypro-logo.png" // Replace with actual logo URL
            alt="Dairy Pro Logo"
            className="h-10 mr-4"
          />
          <span className="text-white font-bold text-lg">Dairy Pro</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/dashboard" className="text-white">
            Dashboard
          </Link>
          <Link to="/milk-production" className="text-white">
            Milk Production
          </Link>
          <Link to="/feed-management" className="text-white">
            Feed Management
          </Link>
          {isLoggedIn ? (
            <button className="text-white" onClick={onLoginToggle}>
              Logout
            </button>
          ) : (
            <Link to="/signin">
              <button className="text-white" onClick={onLoginToggle}>
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={handleMobileMenuToggle}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700 p-4">
          <Link to="/dashboard" className="text-white block mb-2">
            Dashboard
          </Link>
          <Link to="/milk-production" className="text-white block mb-2">
            Milk Production
          </Link>
          <Link to="/feed-management" className="text-white block mb-2">
            Feed Management
          </Link>
          {isLoggedIn ? (
            <button className="text-white block" onClick={onLoginToggle}>
              Logout
            </button>
          ) : (
            <Link to="/signin">
              <button className="text-white block" onClick={onLoginToggle}>
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
