import React from 'react';
import LoginButton from './LoginButton';

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-blue-700 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="logo.png"
            alt="Logo"
            className="w-16 h-16 mr-4"
          />
          <a className="text-white text-xl font-bold">PHYSICAL EDUCATION DEPARTMENT OFFICE</a>
        </div>
        <div className="flex items-center">
          <button className="btn btn-square btn-ghost mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
          <LoginButton />
        </div>
      </div> 
    </div>
  );
};

export default Navbar;
