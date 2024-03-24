import React, { useState } from "react";
import client from "../../api/client";

const AddItem = ({ updateData }) => {
  const [formData, setFormData] = useState({ itemID: "", itemName: "", itemCategory: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (window.confirm("Are you sure you want to add an Item?")) {
      try {
        const payload = { 
          item_id: formData.itemID, 
          item_name: formData.itemName, 
          category: formData.itemCategory,
          condition: "Good",
        };
        await client.post(`item/Itemtag/`, payload);
        console.log("Item added successfully.");
        updateData(); 
      } catch (error) {
        console.error("Error adding an Item", error);
      }
    }
  };

  return (
    <div>
      <button className="btn bg-blue-500 hover:bg-blue-700 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => document.getElementById("AddItem").showModal()}>Add Item</button>
      <dialog id="AddItem" className="modal">
        <div className="modal-box bg-gray-100">
          <form method="dialog" className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Item ID</label>
              <input type="number" name="itemID" value={formData.itemID} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
              <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select name="itemCategory" className="select select-bordered w-full max-w-xs" value={formData.itemCategory} onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="Basketball">Basketball</option>
                <option value="Volleyball">Volleyball</option>
                <option value="Badminton">Badminton</option>
              </select>
            </div>
            <div className="my-4">
              <button type="button" onClick={handleSubmit} className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-500">Add</button>
            </div>
            <button type="button" onClick={() => document.getElementById("AddItem").close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <p className="px-6 py-4 text-sm">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </div>
  );
};

export default AddItem;
