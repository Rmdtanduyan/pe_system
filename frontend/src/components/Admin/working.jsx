import React, { useState, useEffect } from "react";
import client from "../../api/client";

const Working = () => {
  const [listOfStaff, setListOfStaff] = useState([]);
  const [listOfClassCode, setListOfClassCode] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);

  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedClassCode, setSelectedClassCode] = useState("");
  const [inputEmails, setInputEmails] = useState(""); // Store the input emails
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const staffResponse = await client.get("api/Staffs/Faculties/");
      const classListResponse = await client.get("api/Classlist/");
      const classCodesResponse = await client.get("api/Classcodes/");
      const userListResponse = await client.get("api/User/");
      setListOfStaff(staffResponse.data);
      setListOfClassCode(classCodesResponse.data);
      setListOfUsers(userListResponse.data);
      console.log(classListResponse.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStaffChange = (e) => {
    setSelectedStaff(e.target.value);
  };

  const handleClassCodeChange = (e) => {
    setSelectedClassCode(e.target.value);
  };

  const handleEmailChange = (e) => {
    setInputEmails(e.target.value);
  };

  const handleSubmit = async () => {
    const emails = inputEmails
      .split("\n")
      .map((email) => email.trim())
      .filter((email) => email !== ""); // Split the input emails by newline and clean up whitespace

    const selectedUsers = [];

    const invalidEmails = [];
    const validEmails = [];

    const emailRegex = /@addu\.edu\.ph$/; // Regex pattern to match emails ending with @addu.edu.ph

    for (let email of emails) {
      if (!emailRegex.test(email)) {
        invalidEmails.push(email);
        continue; // Skip invalid email addresses
      }

      // Find the user ID associated with the input email
      const selectedUser = listOfUsers.find((user) => user.email === email);

      if (selectedUser) {
        selectedUsers.push(selectedUser.id);
        validEmails.push(email);
      } else {
        invalidEmails.push(email);
      }
    }

    try {
      const payload = {
        professor: selectedStaff,
        classcodes: selectedClassCode,
        students: selectedUsers,
      };

      await client.post(`api/Classlist/`, payload);
      console.log(`Classlist added successfully.`);
      fetchData();

      if (invalidEmails.length > 0) {
        alert(
          `The following emails are invalid or not found: ${invalidEmails.join(
            ", "
          )}`
        );
      }
    } catch (error) {
      console.error(`Error adding a classlist`, error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <select
        className="input input-bordered w-full max-w-xs"
        value={selectedStaff}
        onChange={handleStaffChange}
      >
        <option value="">Select a faculty member</option>
        {listOfStaff.map((staff, index) => (
          <option key={index} value={staff.user.id}>
            {staff.user.first_name} {staff.user.last_name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <select
        className="input input-bordered w-full max-w-xs"
        value={selectedClassCode}
        onChange={handleClassCodeChange}
      >
        <option value="">Select a class code</option>
        {listOfClassCode.map((code, index) => (
          <option key={index} value={code.id}>
            {code.classcode}
          </option>
        ))}
      </select>

      <br />
      <br />

      <textarea
        className="input input-bordered w-full max-w-xs"
        value={inputEmails}
        onChange={handleEmailChange}
        placeholder="Type student emails (separated by newline)"
      ></textarea>

      <br />
      <br />

      <button
        type="button"
        className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Add
      </button>

      <br />
      <br />
    </div>
  );
};

export default Working;
