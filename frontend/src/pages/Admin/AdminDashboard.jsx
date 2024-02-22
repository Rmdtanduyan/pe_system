// AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white grid grid-cols-2 md:grid-cols-3 gap-4 p-8 max-w-screen-lg">
        <Link to="/borrow" className="text-center">
          <button className="btn btn-accent w-full h-24 md:h-32">Borrowed Equipment</button>
        </Link>
        <Link to="/borrow" className="text-center">
          <button className="btn btn-accent w-full h-24 md:h-32">Returned Equipment</button>
        </Link>
        <Link to="/borrow" className="text-center">
          <button className="btn btn-accent w-full h-24 md:h-32">Unreturned Equipment</button>
        </Link>
        <Link to="/facultylist" className="text-center">
          <button className="btn btn-accent w-full h-24 md:h-32">Faculty</button>
        </Link>
        <Link to="/borrow" className="text-center">
          <button className="btn btn-accent w-full h-24 md:h-32">Tagging New Equipment</button>
        </Link>
        <Link to="/borrow" className="text-center">
          <button className="btn btn-accent w-full h-24 md:h-32">Monitoring Equipment</button>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
