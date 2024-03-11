import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

import LoginButton from "./LoginButton";

function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-blue-200">
      <div className="bg-gray-100 rounded-xl shadow-lg p-8 w-96">
        <div className="text-center mb-8">
          <img
            src="logo.png"
            alt="Logo"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h2 className="font-serif font-bold text-xl text-black">Physical Education Department Office</h2>
          <p className="font-serif text-blue-600">Ateneo de Davao University</p>
        </div>
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
