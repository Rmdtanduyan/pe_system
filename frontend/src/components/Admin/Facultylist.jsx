import React, { useState, useEffect } from "react";
import client from "../../api/client";
import Codelist from "./Codelist";
import Classlist from "./Classlist";

const FacultyList = () => {
  const [listOfStaff, setListOfStaff] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [editFacultyId, setEditFacultyId] = useState(null);

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
        fetchData();
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
        fetchData();
      } catch (error) {
        console.error("Error editing faculty member:", error);
      }
    }
    setEditFacultyId(null);
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center">
        <button
          className="btn btn-sm"
          onClick={() => document.getElementById("add_faculty").showModal()}
        >
          Add Faculty
        </button>
        <div>
          <Codelist />
        </div>
        <div>
          <Classlist />
        </div>
      </div>

      <br />
      <br />

      <dialog id="add_faculty" className="modal">
        <div className="modal-box">
          <form method="dialog" className="p-4 flex flex-col">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("add_faculty").close()}
            >
              ✕
            </button>

            <h3 className="font-bold text-base mb-2">Search</h3>

            <div className="w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for users..."
                className="input input-bordered w-full max-w-xs"
              />
              <div className="flex flex-col w-full">
                {searchQuery &&
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
                        <h2 className="text-sm font-semibold flex-grow">
                          {user.first_name} {user.last_name}
                        </h2>
                        <button
                          onClick={() => handleAdd(user.id)}
                          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                        >
                          Add
                        </button>
                      </div>
                    ))
                  ))}
              </div>
            </div>
          </form>
          <p className="py-2">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          listOfStaff
            .filter((staff) => staff.user.staff.position !== "Office")
            .map((staff, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-2 flex flex-col justify-between w-48"
              >
                {" "}
                {/* Adjusted width to w-48 */}
                <img
                  src="profile.jpg"
                  alt="Profile"
                  className="w-full h-32 object-cover mb-2" // Adjusted image size to h-32
                />
                <div>
                  <h2 className="text-base font-semibold mb-1">
                    {" "}
                    {staff.user.first_name} {staff.user.last_name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">
                    {" "}
                    {staff.user.staff.position}
                  </p>
                </div>
                <div className="flex justify-end">
                  <button
                    className="btn mr-1 bg-blue-500 text-white border border-blue-500 py-1 px-2 rounded text-sm" // Adjusted button size and font size to text-sm
                    onClick={() => setEditFacultyId(staff.user.id)}
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={() => handleRemove(staff.user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm" // Adjusted button size and font size to text-sm
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
        )}
      </div>

      {editFacultyId && (
        <dialog id="edit_faculty " className="modal" open>
          <div className="modal-box">
            <form method="dialog" className="p-4 flex flex-col">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setEditFacultyId(null)}
              >
                ✕
              </button>
              <select
                id="classCodeDaySched"
                name="classCodeDaySched"
                className="input input-bordered w-full max-w-md"
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
              >
                <option value="">Select Position</option>
                <option value="Department Chair">Department Chair</option>
                <option value="Admin">Admin</option>
                <option value="Part-Time Faculty">Part-Time Faculty</option>
                <option value="Full-Time Faculty">Full-Time Faculty</option>
              </select>
              <br />
              <button
                className="btn mr-1 bg-blue-500 text-white border border-blue-500 py-1 px-2 rounded text-xs"
                onClick={() => handleEdit(editFacultyId)}
              >
                Edit Faculty Member
              </button>
            </form>
            <p className="py-2">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default FacultyList;
