import React, { useState, useEffect } from "react";
import client from "../../api/client";

const Codelist = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [listofClassCodes, setListofClassCodes] = useState([]);
  const [classCodeInput, setClassCodeInput] = useState("");
  const [classCodeTimeStart, setClassCodeTimeStart] = useState("");
  const [classCodeTimeEnd, setClassCodeTimeEnd] = useState("");
  const [classCodeDaySched, setclassCodeDaySched] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const codeResponse = await client.get(
        `/api/Classcodes/?search=${searchQuery}`
      );
      setListofClassCodes(codeResponse.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
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
  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  return (
    <div className="container mx-auto py-8">
      <button
        className="btn mr-2"
        onClick={() => document.getElementById("show_classCodes").showModal()}
      >
        Show Class Codes
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

      <dialog id="show_classCodes" className="modal">
        <div className="modal-box max-w-6xl" style={{ height: "600px" }}>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
            onClick={() => document.getElementById("show_classCodes").close()}
          >
            ✕
          </button>

          <div className="flex items-center mb-4">
            <form method="dialog" className="flex flex-col mr-2">
              <h3 className="font-bold text-lg mb-2">Search</h3>
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for class codes..."
                  className="input input-bordered w-full max-w-xs mr-2"
                />
                <button
                  className="btn"
                  onClick={() =>
                    document.getElementById("add_classCode").showModal()
                  }
                >
                  Add Class Codes
                </button>
              </div>
            </form>
          </div>

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
                      <button
                        onClick={() =>
                          document.getElementById("add_class_list").showModal()
                        }
                        className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Add
                      </button>
                      <dialog id="add_class_list" className="modal">
                        <div className="modal-box">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                          <h3 className="font-bold text-lg">
                            Add a Class List
                          </h3>

                          <p className="py-4">
                            Press ESC key or click on ✕ button to close
                          </p>
                        </div>
                      </dialog>
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
    </div>
  );
};

export default Codelist;
