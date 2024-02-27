import React, { useState, useEffect } from "react";
import client from "../../api/client";
import Navbar from "../wholepage/Navbar";

const ClassCodeList = () => {
  const [listOfClassCodes, setListofClassCodes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [classCodeInput, setClassCodeInput] = useState("");
  const [classCodeTimeStart, setClassCodeTimeStart] = useState("");
  const [classCodeTimeEnd, setClassCodeTimeEnd] = useState("");
  const [classCodeDaySched, setClassCodeDaySched] = useState("");
  const [searchQuery, setSearchQuery] = useState("");


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const codeResponse = await client.get(
        `/api/Classcodes/?search=${searchQuery}`
      );
      setListofClassCodes(codeResponse.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching class codes:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClassCode = async () => {
    if (window.confirm("Are you sure you want to add a Class Code?")) {
      try {
        const payload = {
          classcode: classCodeInput,
          time_start: classCodeTimeStart,
          time_end: classCodeTimeEnd,
          day_sched: classCodeDaySched,
        };
        await client.post("/api/Classcodes/", payload);
        console.log("Class code added successfully.");
        fetchData();
      } catch (error) {
        console.error("Error adding a class code:", error);
      }
    }
  };

  const handleRemoveClassCode = async (id) => {
    if (window.confirm("Are you sure you want to remove this class Code?")) {
      try {
        await client.delete(`/api/Classcodes/${id}/`);
        console.log("Class Code deleted successfully.");
        fetchData();
      } catch (error) {
        console.error("Failed to remove the class code:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  return (
    <>
      <Navbar />
      <div className="flex justify-end"></div>
      <dialog id="add_classCode" className="modal">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2 text-gray-600 hover:text-gray-800 transition duration-300"
            onClick={() => document.getElementById("add_classCode").close()}
          >
            ✕
          </button>
          <h3 className="text-lg font-bold mb-4">Add Class Code</h3>
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
                onChange={(e) => setClassCodeDaySched(e.target.value)}
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
                type="button"
                onClick={handleAddClassCode}
                className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Add
              </button>
            </div>
          </form>
          <p className="text-sm text-center text-gray-600">
            Press ESC key or click on ✕ button to close
          </p>
        </div>
      </dialog>

      <br></br>
      <div className="bg-gray-100 p-8">
        <div className="flex justify-end"></div>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for class codes..."
            className="input input-bordered w-full max-w-xs"
          />
          <button
            className="btn bg-blue-500 border border-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            onClick={() => document.getElementById("add_classCode").showModal()}
          >
            Add Class Codes
          </button>
        </div>

        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div>
              {listOfClassCodes
                .slice()
                .reverse()
                .map((code) => (
                  <div
                    key={code.id}
                    className="flex justify-between items-center mb-2 bg-white p-4 rounded shadow-sm"
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-blue-800">
                        {code.classcode}
                      </h2>
                      <p className="text-gray-700">
                        {code.time_start} - {code.time_end} ({code.day_sched})
                      </p>
                    </div>
                    <div className="flex">
                      <button
                        className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() =>
                          document.getElementById("add_classlist").showModal()
                        }
                      >
                        Add
                      </button>
                      <dialog id="add_classlist" className="modal">
                        <div className="modal-box">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                          <h3 className="font-bold text-lg">Hello!</h3>
                          <p className="py-4">
                            Press ESC key or click on ✕ button to close
                          </p>
                        </div>
                      </dialog>
                      <button className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                        onClick={() => handleRemoveClassCode(code.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassCodeList;
