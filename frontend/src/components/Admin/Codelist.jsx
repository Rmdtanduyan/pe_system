//Codelist.jsx
import React, { useState, useEffect } from "react";
import client from "../../api/client";
import AddClassCode from "./AddClassCode";
import AddClassList from "./AddClassList";
const Codelist = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [listOfStaff, setListOfStaff] = useState([]);
  const [listOfClassCodes, setlistOfClassCodes] = useState([]);
  const [listOfClasslist, setListofClasslist] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const codeResponse = await client.get(`/api/Classcodes/?search=${searchQuery}`);
      const staffResponse = await client.get("api/Staffs/Faculties/");
      const userResponse = await client.get(`/api/User/`);
      const classListResponse = await client.get(`api/Classlist/`);
  
      setlistOfClassCodes(codeResponse.data); // Update the state of class codes here
  
      setListOfStaff(staffResponse.data);
      setListOfUsers(userResponse.data);
      setListofClasslist(classListResponse.data);
      console.log(codeResponse.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
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

  const updateData = () => {
    // Call fetchData to fetch the updated list of class codes
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  return (
    <div className="container mx-auto py-8">
      <button
        className="btn btn-sm"
        onClick={() => document.getElementById("show_classCodes").showModal()}
      >
        Show Class Codes
      </button>

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
              </div>
            </form>
          </div>
          <div>
            <AddClassCode updateData={updateData} />
          </div>
          <div className="flex flex-col p-6">
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              listOfClassCodes.length > 0 &&
              listOfClassCodes
                .slice()
                .reverse()
                .map((code, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <div>
                      <h2 className="text-lg font-semibold">
                        {code.classcode} ( S.Y. {code.sy_start} - {code.sy_end})
                      </h2>
                      <p>
                        {formatTime(code.time_start)} -{" "}
                        {formatTime(code.time_end)} ({code.day_sched})
                      </p>
                    </div>
                    <div>
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
