import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {/* Each Link/Tile */}
        <AdminDashboardTile link="/borrow" label="Borrowed Equipment" iconClass="fas fa-laptop-medical" />
        <AdminDashboardTile link="/return" label="Returned Equipment" iconClass="fas fa-undo-alt" />
        <AdminDashboardTile link="/unreturned" label="Unreturned Equipment" iconClass="fas fa-exclamation-triangle" />
        <AdminDashboardTile link="/faculty" label="Faculty" iconClass="fas fa-chalkboard-teacher" />
      </div>
    </div>
  );
}

// Component for each dashboard tile
function AdminDashboardTile({ link, label, iconClass }) {
  return (
    <Link to={link} className="transform transition duration-300 ease-in-out hover:scale-105">
      <div className="flex flex-col items-center justify-center space-y-4 bg-gradient-to-r from-blue-500 to-white-400 text-white hover:from-teal-400 hover:to-blue-500 rounded-lg shadow-lg p-6 h-48 lg:h-64">
        <i className={`${iconClass} text-4xl lg:text-6xl`}></i> {/* Icon */}
        <span className="text-xl lg:text-2xl">{label}</span> {/* Text */}
      </div>
    </Link>
  );
}

export default AdminDashboard;
