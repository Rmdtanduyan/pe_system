import React from 'react';
import LoginButton from './LoginButton';

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-blue-700 py-2 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="logo.png"
            alt="Logo"
            className="w-12 h-12 mr-2" // Smaller logo size
          />
          <a className="text-white text-lg font-bold">PHYSICAL EDUCATION DEPARTMENT OFFICE</a> {/* Smaller text */}
        </div>
        <div className="flex items-center">
          <button className="btn btn-square btn-ghost mr-2 text-sm"> {/* Smaller button and text */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 stroke-current" // Smaller icon size
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
          {/* Assuming LoginButton is also styled with Tailwind, you might need to adjust its classes for size as well */}
          <LoginButton />
        </div>
      </div> 
    </div>
  );
};

export default Navbar;
