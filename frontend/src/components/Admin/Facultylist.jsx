import React, { useState, useEffect } from "react";
import client from "../../api/client";

const FacultyList = () => {
  const [listOfStaff, setListOfStaff] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [editFacultyId, setEditFacultyId] = useState(null); // State to track which faculty member is being edited

  const [listofClassCodes, setListofClassCodes] = useState("");
  const [classCodeInput, setClassCodeInput] = useState("");
  const [classCodeTimeStart, setClassCodeTimeStart] = useState("");
  const [classCodeTimeEnd, setClassCodeTimeEnd] = useState("");
  const [classCodeDaySched, setclassCodeDaySched] = useState("");
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const staffResponse = await client.get("api/Staffs/Faculties/");
      const userResponse = await client.get(`/api/User/?search=${searchQuery}`);
      const codeResponse = await client.get(
        `/api/Classcodes/?search=${searchQuery}`
      );

      setListOfStaff(staffResponse.data);
      setListOfUsers(userResponse.data);
      setListofClassCodes(codeResponse.data);

      console.log("Staff: ", staffResponse.data);
      console.log("User: ", userResponse.data);
      console.log("Class Codes: ", codeResponse.data);
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

  const handleRemoveClassCode = async (id) => {
    if (window.confirm("Are you sure you want to remove this class Code?")) {
      try {
        await client.delete(`/api/Classcodes/${id}/`);
        console.log("Class Code deleted sucessfully.");
        fetchData();
      } catch (error) {
        console.error("Failed to remove the class code:", error);
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

  //added by gpt
  const formatTime = (time) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);

    let formattedTime = `${hours % 12 || 12}:${minutes
      .toString()
      .padStart(2, "0")}`;

    if (seconds !== undefined) {
      formattedTime += `:${seconds.toString().padStart(2, "0")}`;
    }

    if (hours < 12) {
      formattedTime += " AM";
    } else {
      formattedTime += " PM";
    }

    return formattedTime;
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

  const handleAddClassCode = async () => {
    if (window.confirm(" Are you sure you want to add a Class Code?")) {
      try {
        const payload = {
          classcode: classCodeInput,
          time_start: classCodeTimeStart,
          time_end: classCodeTimeEnd,
          day_sched: classCodeDaySched,
        };

        await client.post("api/Classcodes/", payload);
        console.log("Class code added successfully.");
        fetchData();
      } catch (error) {
        console.error("Error adding a class code", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  return (
    <div className="container mx-auto py-8">
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

      <button
        className="btn"
        onClick={() => document.getElementById("add_classCode").showModal()}
      >
        Add Class Codes
      </button>
      <dialog id="add_classCode" className="modal">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => document.getElementById("add_classCode").close()}
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">Add Class Code</h3>
          <form className="flex flex-col items-center justify-center">
            <div className="my-4 w-full">
              <label
                htmlFor="classCodeInput"
                className="block text-sm font-medium text-gray-700"
              >
                Class Code
              </label>
              <input
                type="text"
                id="classCodeInput"
                placeholder="Class Code"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setClassCodeInput(e.target.value)}
              />
            </div>
            <div className="my-4 w-full">
              <label
                htmlFor="classCodeDaySched"
                className="block text-sm font-medium text-gray-700"
              >
                Day Schedule
              </label>
              <select
                id="classCodeDaySched"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setclassCodeDaySched(e.target.value)}
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
            <div className="my-4 w-full">
              <label
                htmlFor="classCodeTimeStart"
                className="block text-sm font-medium text-gray-700"
              >
                Time Start
              </label>
              <input
                type="time"
                id="classCodeTimeStart"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setClassCodeTimeStart(e.target.value)}
              />
            </div>
            <div className="my-4 w-full">
              <label
                htmlFor="classCodeTimeEnd"
                className="block text-sm font-medium text-gray-700"
              >
                Time End
              </label>
              <input
                type="time"
                id="classCodeTimeEnd"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setClassCodeTimeEnd(e.target.value)}
              />
            </div>
            <div className="my-4">
              <button
                type="button" // Use type="button" to prevent form submission on click
                onClick={handleAddClassCode}
                className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add
              </button>
            </div>
          </form>
          <p className="text-sm text-center">
            Press ESC key or click on ✕ button to close
          </p>
        </div>
      </dialog>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("Show_Class_Codes").showModal()}
      >
        Show Class Codes
      </button>
      <dialog id="Show_Class_Codes" className="modal">
        <div className="modal-box max-w-6xl" style={{ height: "600px" }}>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
            onClick={() => document.getElementById("Show_Class_Codes").close()}
          >
            ✕
          </button>

          <form method="dialog" className="p-6 flex flex-col">
            <h3 className="font-bold text-lg mb-4">Search</h3>
            <div className="w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for class codes..."
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </form>

          <div className="flex flex-col p-6">
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              listofClassCodes.length > 0 &&
              //* Reversing the array to display the latest code first
              listofClassCodes
                .slice()
                .reverse()
                .map((code, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <div>
                      <h2 className="text-lg font-semibold">
                        {code.classcode}
                      </h2>
                      <p>
                        {formatTime(code.time_start)} -{" "}
                        {formatTime(code.time_end)} ({code.day_sched})
                      </p>
                    </div>
                    <div>
                      <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add
                      </button>
                      <button className="ml-4 bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded border border-gray-300">
                        Edit
                      </button>
                      <button
                        className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleRemoveClassCode(code.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
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
        <dialog id="my_modal_3" className="modal" open>
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
