import React, { useState } from 'react';
import axios from 'axios';

const FacultyList = ({ faculties, isLoading, setFaculties, refetchData }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedPosition, setEditedPosition] = useState('');



  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedPosition('');
  };

  const handleSave = async (index) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/Staffs/Faculties/${faculties[index].id}/`, {
        position: editedPosition
      });
   
      console.log(`Position updated successfully to ${editedPosition}`);
    } catch (error) {
      console.error('Failed to update position:', error);
    }
    refetchData();
    setEditingIndex(null);
  };

  const handleSelectChange = (event) => {
    setEditedPosition(event.target.value);
  };

  const handleRemove = async (index) => {
    if (window.confirm('Are you sure you want to remove this faculty member?')) {
      try {
        // Send DELETE request to remove faculty member from the backend
        await axios.delete(`http://127.0.0.1:8000/api/Staffs/Faculties/${faculties[index].id}/`);
        console.log('Faculty member removed successfully.');
        // Remove the faculty member from the frontend list
        const updatedFaculties = faculties.filter((_, i) => i !== index);
        setFaculties(updatedFaculties);
      } catch (error) {
        console.error('Failed to remove faculty member:', error);
      }
    }
  };

  return (<div className="card w-96 bg-red shadow-xl rounded-lg">
  {isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="bg-gray-200 rounded-lg"> {/* Applying rounded-lg class to make the border rounded */}
      {faculties?.map((facultyItem, index) => (
        <div className="card-body" key={index}>
          <img className="rounded-full" src="profile.jpg" alt="profile" />
          <h2 className="card-title">{facultyItem.first_name} {facultyItem.last_name}</h2>
          {editingIndex === index ? (
            <div>
              <select value={editedPosition} onChange={handleSelectChange}>
                <option value="">Select Position</option>
                <option value="Full-Time Faculty">Full-Time Faculty</option>
                <option value="Part-Time Faculty">Part-Time Faculty</option>
                <option value="Admin Associate">Admin Associate</option>
              </select>
              <button className="btn btn-primary" onClick={() => handleSave(index)}>Save</button>
            </div>
          ) : (
            <>
              {facultyItem.staff && (
                <h2 className="card-title">{facultyItem.staff.position}</h2>
              )}
              <button className="btn btn-primary" onClick={() => handleEdit(index)}>Edit Details</button>
              {/* Include remove button */}
              <button className="btn btn-primary" onClick={() => handleRemove(index)}>Remove</button>
            </>
          )}
        </div>
      ))}
      hello
    </div>
  )}
</div>


  );
};

export default FacultyList;