import React, { useState } from "react";
import client from "../../api/client";

const AddClassList = ({
  listOfStaff,
  listOfUsers,
  listOfClassCodes,
  updateData,
}) => {
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedClassCode, setSelectedClassCode] = useState("");
  const [inputEmails, setInputEmails] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      updateData(); // Assuming you have this function defined somewhere

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

  const handleStaffChange = (e) => {
    setSelectedStaff(e.target.value);
  };

  const handleClassCodeChange = (e) => {
    setSelectedClassCode(e.target.value);
  };

  const handleEmailChange = (e) => {
    setInputEmails(e.target.value);
  };

  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("add_classlist").showModal()}
      >
        Add Classlist
      </button>
      <dialog id="add_classlist" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add Classlist</h3>
          <br />
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
            {listOfClassCodes.map((code, index) => (
              <option key={index} value={code.id}>
                {code.classcode}
              </option>
            ))}
          </select>

          <br />
          <br />
          <textarea
            className="input input-bordered w-full max-w-md h-48 resize-y"
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
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </div>
  );
};

export default AddClassList;
