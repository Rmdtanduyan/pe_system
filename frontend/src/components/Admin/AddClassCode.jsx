//AddClassCode.jsx
import React, { useState, useEffect } from "react";
import client from "../../api/client";

const AddClassCode = ({ updateData }) => {
  const [formData, setFormData] = useState({
    classCodeInput: "",
    classCodeTimeStart: "",
    classCodeTimeEnd: "",
    classCodeDaySched: "",
    classCodeSyStart: "",
    classCodeSyEnd: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (window.confirm("Are you sure you want to add a Class Code?")) {
      try {
        const payload = {
          classcode: formData.classCodeInput,
          time_start: formData.classCodeTimeStart,
          time_end: formData.classCodeTimeEnd,
          day_sched: formData.classCodeDaySched,
          sy_start: formData.classCodeSyStart,
          sy_end: formData.classCodeSyEnd,
        };

        await client.post(`api/Classcodes/`, payload);
        console.log("Class code added successfully.");
        updateData(); // MURA SIYAG FETCH
      } catch (error) {
        console.error("Error adding a class code", error);
      }
    }
  };

  return (
    <div>
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
                name="classCodeInput"
                placeholder="Class Code"
                className="input input-bordered w-full max-w-xs"
                value={formData.classCodeInput}
                onChange={handleChange}
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
                name="classCodeDaySched"
                className="input input-bordered w-full max-w-xs"
                value={formData.classCodeDaySched}
                onChange={handleChange}
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
                name="classCodeTimeStart"
                className="input input-bordered w-full max-w-xs"
                value={formData.classCodeTimeStart}
                onChange={handleChange}
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
                name="classCodeTimeEnd"
                className="input input-bordered w-full max-w-xs"
                value={formData.classCodeTimeEnd}
                onChange={handleChange}
              />
            </div>
            <div className="my-4 w-full flex justify-between">
  <input
    type="number"
    id="classCodeSyStart"
    name="classCodeSyStart"
    className="input input-bordered max-w-xs"
    value={formData.classCodeSyStart}
    onChange={handleChange}
    placeholder="Start Year"
  />
  <input
    type="number"
    id="classCodeSyEnd"
    name="classCodeSyEnd"
    className="input input-bordered max-w-xs"
    value={formData.classCodeSyEnd}
    onChange={handleChange}
    placeholder="End Year"
  />
</div>

            <div className="my-4">
              <button
                type="button"
                onClick={handleSubmit}
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
    </div>
  );
};

export default AddClassCode;
