import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Facultylist = () => {
  const [listofStaff, setListofStaff] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/Staffs/Faculties/");
      setListofStaff(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if (window.confirm('Are you sure you want to remove this faculty member?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/Staffs/Faculties/${id}/`);
        console.log('Faculty member removed successfully.');
        fetchData();
      } catch (error) {
        console.error('Failed to remove faculty member:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8">
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
    <button className="btn" onClick={()=>document.getElementById('add_faculty').showModal()}>Add Faculty</button>
    <br/>
    <br/>

    <dialog id="add_faculty" className="modal">
  <div className="modal-box">
    <form method="dialog" className="p-6">
      {/* Close button */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('add_faculty').close()}>✕</button>
      
      {/* Form content */}
      <h3 className="font-bold text-lg mb-4">Add Faculty</h3>
      
      {/* Dropdown box */}
      <div className="mb-4">
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
        <select id="department" name="department" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          <option value="1">Department 1</option>
          <option value="2">Department 2</option>
          <option value="3">Department 3</option>
        </select>
      </div>
      
      {/* Additional form fields can be added here */}
      
      {/* Submit button */}
      <button type="submit" className="btn btn-primary">Add Faculty</button>
    </form>
    <p className="py-4">Press ESC key or click on ✕ button to close</p>
  </div>
</dialog>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          listofStaff.map((person, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <img src="profile.jpg" alt="Profile" className="w-full h-64  object-cover mb-4" />
              <h2 className="text-lg font-semibold mb-2">{person.user.first_name} {person.user.last_name}</h2>
              <p className="text-gray-600 mb-2">{person.user.staff.position}</p>
              {person.user.staff.position !== 'Office' && (
                <div className="flex justify-end">
                  <button onClick={() => handleRemove(person.user.staff.user)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Facultylist;
