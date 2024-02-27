import React, { useState, useEffect } from "react";
import client from "../../api/client";
import Codelist from "./Codelist";

const FacultyList = () => {
  const [listOfStaff, setListOfStaff] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [editFacultyId, setEditFacultyId] = useState(null); // State to track which faculty member is being edited

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const staffResponse = await client.get("api/Staffs/Faculties/");
      const userResponse = await client.get(`/api/User/?search=${searchQuery}`);
      setListOfStaff(staffResponse.data);
      setListOfUsers(userResponse.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if (
      window.confirm("Are you sure you want to remove this faculty member?")
    ) {
      try {
        await client.delete(`api/Staffs/Faculties/${id}/`);
        console.log("Faculty member removed successfully.");
        fetchData();
      } catch (error) {
        console.error("Failed to remove faculty member:", error);
      }
    }
  };

  const handleAdd = async (id) => {
    if (window.confirm("Are you sure you want to add this faculty member?")) {
      try {
        const payload = {
          user: id,
          position: "Part-Time Faculty",
        };

        await client.post(`api/Staffs/Faculties/`, payload);
        fetchData(); // Fetch data after adding the faculty member
      } catch (error) {
        console.error("Error adding faculty member:", error);
      }
    }
  };

  const handleEdit = async (id) => {
    if (window.confirm("Are you sure you want to edit this faculty member?")) {
      try {
        const payload = {
          position: selectedPosition,
        };

        await client.patch(`api/Staffs/Faculties/${id}/`, payload);
        fetchData(); // Fetch data after editing the faculty member
      } catch (error) {
        console.error("Error editing faculty member:", error);
      }
    }
    setEditFacultyId(null); // Reset editFacultyId after editing
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  return (
    <div className="container mx-auto py-8">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center">
          <button
            className="btn"
            onClick={() => document.getElementById("add_faculty").showModal()}
          >
            Add Faculty
          </button>
          <div>
            <Codelist />
          </div>
        </div>
      </div>

      <br />
      <br />

      <dialog id="add_faculty" className="modal">
        <div className="modal-box">
          <form method="dialog" className="p-6 flex flex-col">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("add_faculty").close()}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg mb-4">Search</h3>

            <div className="w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for users..."
                className="input input-bordered w-full max-w-xs"
              />
              <div className="flex flex-col w-full">
                {searchQuery && // Only render when searchQuery is not empty
                  (isLoading ? (
                    <div>Loading...</div>
                  ) : error ? (
                    <div>Error: {error}</div>
                  ) : (
                    listOfUsers.map((user, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center mb-2"
                      >
                        <h2 className="text-lg font-semibold flex-grow">
                          {user.first_name} {user.last_name}
                        </h2>
                        <button
                          onClick={() => handleAdd(user.id)}
                          className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Add
                        </button>
                      </div>
                    ))
                  ))}
              </div>
            </div>
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
          listOfStaff
            // Filter out office staff
            .filter((staff) => staff.user.staff.position !== "Office")
            .map((staff, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <img
                  src="profile.jpg"
                  alt="Profile"
                  className="w-full h-64  object-cover mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">
                  {staff.user.first_name} {staff.user.last_name}
                </h2>
                <p className="text-gray-600 mb-2">
                  {staff.user.staff.position}
                </p>
                <div className="flex justify-end">
                  <button
                    className="btn mr-2 bg-blue-500 text-white border border-blue-500"
                    onClick={() => setEditFacultyId(staff.user.id)}
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={() => handleRemove(staff.user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Dialog for editing faculty member */}
      {editFacultyId && (
        <dialog id="edit_faculty " className="modal" open>
          <div className="modal-box">
            <form method="dialog" className="p-6 flex flex-col">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setEditFacultyId(null)}
              >
                ✕
              </button>
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
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Director">Director</option>
                  <option value="Admin">Admin</option>
                  <option value="Part-Time Faculty">Part-Time Faculty</option>
                  <option value="Full-Time Faculty">Full-Time Faculty</option>
                </select>
              </div>
              <button
                className="btn mr-2 bg-blue-500 text-white border border-blue-500"
                onClick={() => handleEdit(editFacultyId)}
              >
                Edit Faculty Member
              </button>
            </form>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default FacultyList;
