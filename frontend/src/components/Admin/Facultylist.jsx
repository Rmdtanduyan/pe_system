import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import client from "../../api/client";
const Facultylist = () => {
  const [listofStaff, setListofStaff] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listofUser, setListofUser] = useState([]);
  const { userData } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  //fetching the data of "http://127.0.0.1:8000/api/Staffs/Faculties/" and http://127.0.0.1:8000/api/User/
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const staffResponse = await client.get( //shortcut key for axios
        "api/Staffs/Faculties/"
      );

      const UserResponse = await client.get(
        `/api/User/?search=${searchQuery}` );

      setListofStaff(staffResponse.data);
      setListofUser(UserResponse.data);

      console.log("Staff: ",staffResponse.data);
      
      console.log("User: ",   UserResponse.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // for remove
  const handleRemove = async (id) => {
    if (
      window.confirm("Are you sure you want to remove this faculty member?")
    ) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/Staffs/Faculties/${id}/`);
        console.log("Faculty member removed successfully.");
        fetchData();
      } catch (error) {
        console.error("Failed to remove faculty member:", error);
      }
    }
  };
  //for search

  useEffect(() => {

    fetchData();
   
  }, [searchQuery]);

  return (
    <div className="container mx-auto py-8">
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("add_faculty").showModal()}
      >
        Add Faculty
      </button>
      <br />
      <br />

      <dialog id="add_faculty" className="modal">
        <div className="modal-box">
          <form method="dialog" className="p-6 flex flex-col">
            {/* Close button */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("add_faculty").close()}
            >
              ✕
            </button>

            {/* Form content */}
            <h3 className="font-bold text-lg mb-4">Search</h3>

            {/* Text input for department and Add Faculty button */}
            <div className="w-full">
            <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for users..."
            className="input input-bordered w-full max-w-xs"
          />
              {/* MANUAL ADDED  (CONSULT TO ANDREW IF WE USE USE AUTH)*/}
              <div className="flex flex-col w-full">
                {isLoading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>Error: {error}</div>
                ) : (
                  listofUser.map((person, index) => (
                    // Wrap each name and button in a div to align them next to each other
                    <div
                      key={index}
                      className="flex justify-between items-center mb-2"
                    >
                      <h2 className="text-lg font-semibold flex-grow">
                        {person.first_name} {person.last_name}
                      </h2>

                      <button
                        onClick={() => {
                          /* function to handle addition */
                        }}
                        className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Add
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Additional form fields can be added here */}
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
              <img
                src="profile.jpg"
                alt="Profile"
                className="w-full h-64  object-cover mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">
                {person.user.first_name} {person.user.last_name}
              </h2>
              <p className="text-gray-600 mb-2">{person.user.staff.position}</p>
              {person.user.staff.position !== "Office" && (
                <div className="flex justify-end">
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn mr-2 bg-blue-500 text-white border border-blue-500"  // Added margin-right to create space
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Edit Details
                  </button>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <div className="mb-4">
                        <label
                          htmlFor="department"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Select Position
                        </label>
                        <select
                          id="department"
                          name="department"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="Director">Director</option>
                          <option value="Admin">Admin</option>
                          <option value="Part-Time Faculty">
                            Part-Time Faculty
                          </option>
                          <option value="Full-Time Faculty">
                            Full-Time Faculty
                          </option>
                        </select>
                      </div>

                      <p className="py-4">
                        Press ESC key or click on ✕ button to close
                      </p>
                    </div>
                  </dialog>
                  <button
                    onClick={() => handleRemove(person.user.staff.user)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  >
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
