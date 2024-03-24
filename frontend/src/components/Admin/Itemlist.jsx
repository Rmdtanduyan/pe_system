import React, { useState, useEffect } from "react";
import client from "../../api/client";

const ItemList = ({ updateData, listofItems }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handdleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handledeleteSelectedItems = async () => {
    if (window.confirm("Are you sure you want to remove selected items?")) {
      try {
        await Promise.all(
          selectedItems.map((id) => client.delete(`/item/Itemtag/${id}/`))
        );
        console.log("Selected items deleted successfully.");
        setSelectedItems([]);
        updateData();
      } catch (error) {
        console.error("Failed to remove selected items:", error);
      }
    }
  };
  useEffect(() => {
    updateData();
  }, [searchQuery]);
  return (
    <div className="overflow-x-auto">
      <div className="max-h-72 bg-white rounded-lg shadow-lg overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <table className="w-full min-w-max table-auto text-xs">
          <thead className="bg-blue-500 text-white sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 text-left text-gray-800">Select</th>
              <th className="px-3 py-2 text-left text-gray-800">Item ID</th>
              <th className="px-3 py-2 text-left text-gray-800">Item Name</th>
              <th className="px-3 py-2 text-left text-gray-800">
                Item Category
              </th>
              <th className="px-3 py-2 text-left text-gray-800">Status</th>
              <th className="px-3 py-2 text-left text-gray-800">Condition</th>
              <th className="px-3 py-2 text-left text-gray-800">
                Item Tagging Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-3 py-2 whitespace-nowrap text-center text-gray-800"
                >
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-3 py-2 whitespace-nowrap text-center text-red-600"
                >
                  Error: {error}
                </td>
              </tr>
            ) : (
              listofItems.length > 0 &&
              listofItems
                .slice()
                .reverse()
                .map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-3 py-2 whitespace-nowrap text-gray-500">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handdleSelect(item.id)}
                      />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800">
                      {item.item_id}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800">
                      {item.item_name}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800">
                      {item.category}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800">
                      WALA PA
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800">
                      {item.condition}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {new Date(item.tag_date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
      <div>
        <button
          onClick={handledeleteSelectedItems}
          className={`mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 mr-2 ${
            selectedItems.length === 0 ? "disabled:opacity-50" : ""
          }`}
          disabled={selectedItems.length === 0}
        >
          Delete Selected
        </button>
        <button
          className={`mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 ${
            selectedItems.length === 0 ? "disabled:opacity-50" : ""
          }`}
          onClick={() => document.getElementById("Edit_details").showModal()}
          disabled={selectedItems.length === 0}
        >
          Edit Item Details
        </button>
        <dialog id="Edit_details" className="modal">
          <div className="modal-box">
          <form method="dialog" className="p-4 flex flex-col">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <select
                id="classCodeDaySched"
                name="classCodeDaySched"
                className="input input-bordered w-full max-w-md"
                // value={selectedPosition}
                // onChange={(e) => setSelectedPosition(e.target.value)}
              >
                <option value="">Select Condition</option>
                <option value="Good">Good</option>
                <option value="Damaged">Damaged</option>
              </select>
              <br/>
              <button
                className="btn mr-1 bg-blue-500 text-white border border-blue-500 py-1 px-2 rounded text-xs"
                // onClick={() => handleEdit(editFacultyId)}
              >
                Edit Item Details
              </button>
            </form>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ItemList;
