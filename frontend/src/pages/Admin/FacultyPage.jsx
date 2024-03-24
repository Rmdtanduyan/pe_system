import React from "react";
import Facultylist from "../../components/Admin/Facultylist";
import Navbar from "../../components/wholepage/Navbar";

const Facultypage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="p-6">
          <Facultylist />
        </div>
      </div>
    </div>
  );
};

export default Facultypage;
