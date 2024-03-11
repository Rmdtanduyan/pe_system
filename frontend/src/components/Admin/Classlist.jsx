import React, { useState, useEffect } from "react";
import client from "../../api/client";
import AddClassList from "./AddClassList";

const Classlist = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [listOfStaff, setListOfStaff] = useState([]);
  const [listOfClassCodes, setListOfClassCodes] = useState([]);
  const [listOfClasslist, setListOfClasslist] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const classCodeResponse = await client.get(
        `/api/Classcodes/?search=${searchQuery}`
      );
      const staffResponse = await client.get("api/Staffs/Faculties/");
      const userResponse = await client.get(`/api/User/`);
      const classListResponse = await client.get(
        `api/Classlist/?search=${searchQuery}`
      );

      setListOfClassCodes(classCodeResponse.data); // Update the state of class codes here

      setListOfStaff(staffResponse.data);
      setListOfUsers(userResponse.data);
      setListOfClasslist(classListResponse.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRemoveClasslist = async (id) => {
    if (window.confirm("Are you sure you want to remove this classlist?")) {
      try {
        await client.delete(`/api/Classlist/${id}/`);
        console.log("Classlist deleted sucessfully.");
        fetchData();
      } catch (error) {
        console.error("Failed to remove the class code:", error);
      }
    }
  };
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

  const updateData = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("show_classlist").showModal()}
      >
        Show Classlist
      </button>
      <dialog id="show_classlist" className="modal">
        <div className="modal-box max-w-6xl" style={{ height: "600px" }}>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
            onClick={() => document.getElementById("show_classlist").close()}
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
            <AddClassList
              listOfStaff={listOfStaff}
              listOfUsers={listOfUsers}
              listOfClassCodes={listOfClassCodes}
              updateData={updateData}
            />
          </div>
          <div className="flex flex-col p-6">
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              listOfClasslist.length > 0 &&
              listOfClasslist
                .slice()
                .reverse()
                .map((classlist, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <div>
                      <h2 className="text-lg font-semibold">
                        {classlist.classcodes.classcode} ({"S.Y"} {classlist.classcodes.sy_start} - {classlist.classcodes.sy_end}) | Prof:{" "}
                        {classlist.professor.user.first_name}{" "}
                        {classlist.professor.user.last_name}
                      </h2>
                      <p>
                        {formatTime(classlist.classcodes.time_start)} -{" "}
                        {formatTime(classlist.classcodes.time_end)} (
                        {classlist.classcodes.day_sched})
                      </p>
                    </div>
                    <div>
                      <button
                        className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleRemoveClasslist(classlist.id)}

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

export default Classlist;
