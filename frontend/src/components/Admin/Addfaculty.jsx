// AddFaculty.jsx
import Select from 'react-select';
import React, { useState } from 'react';
import axios from 'axios';

const AddFaculty = ({ onAddFaculty }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showInput, setShowInput] = useState(false); // State to control displaying input field

  const handleAddClick = () => {
    setShowInput(true); // Show input field when "Add" button is clicked
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/api/User/?search=${searchQuery}`);
      // Filter the response data based on the search query
      const filteredResults = response.data.filter(user =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Failed to search for users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFaculty = async (user) => {
    try {
      // Pass the selected user to the parent component
      onAddFaculty(user);
      // Clear search results and query
      setSearchResults([]);
      setSearchQuery('');
      setShowInput(false); // Hide input field after adding
  
      // Add the user to the /api/Staffs/ endpoint
      await axios.post(`http://127.0.0.1:8000/api/Staffs/Faculties/`, { user: user.id }); // Send only the user id
      console.log('User added to Staffs endpoint successfully.');
    } catch (error) {
      console.error('Failed to add user to Staffs endpoint:', error);
    }
  };

  return (
    <div>
      {!showInput ? (
        <button  className="btn" onClick={handleAddClick}>Add Faculty</button>
      ) : (
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for users..."
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn" onClick={handleSearch} disabled={!searchQuery || isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      )}
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((user) => (
            <li key={user.id}>
              {user.first_name} {user.last_name}
              <button  className="btn" onClick={() => handleAddFaculty(user)}>Add</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddFaculty;
