import React, { useState, useEffect } from "react";
import FacultyList from "../../components/Admin/Facultylist";
import AddFaculty from "../../components/faculty/Addfaculty";
import axios from "axios";
import Navbar from "../../components/wholepage/Navbar";
import { Link } from "react-router-dom";

const FacultyPage = () => {
  const [faculties, setFaculties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const addFaculty = (user) => {
    setFaculties((prevFaculties) => [...prevFaculties, user]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response_user = await axios.get("http://127.0.0.1:8000/api/User/");
      const response_staff = await axios.get("http://127.0.0.1:8000/api/Staffs/Faculties/");

      console.log("Users:", response_user.data);
      console.log("Staff:", response_staff.data);

      const staffIds = response_staff.data.map((staff) => staff.user);
      const filteredUsers = response_user.data.filter((user) =>
        staffIds.includes(user.id)
      );

      setFaculties(filteredUsers);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white flex flex-col h-screen">
      <Navbar />

      <div className="flex-grow flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-center">
          <button className="btn">Back</button>
        </Link>
        <div className="ml-auto">
          <AddFaculty onAddFaculty={addFaculty} />
        </div>
      </div>

      <div className="bg-gray-200 flex-grow p-6">
        <FacultyList
          faculties={faculties}
          isLoading={isLoading}
          setFaculties={setFaculties}
          refetchData={fetchData}
        />
      </div>
    </div>
  );
};

export default FacultyPage;
