// App.jsx
import React, { useState } from 'react';
import './App.css';
import { useGoogleLogin } from '@react-oauth/google';

function App() {
  // State to hold the user's ID number
  const [idNumber, setIdNumber] = useState('');

  // Event handler to update the ID number as the user types
  const handleIdNumberChange = (e) => {
    setIdNumber(e.target.value);
  };

  // Check if the ID number is valid (not empty or only spaces)
  const isIdNumberValid = idNumber.trim() !== '';

  // Google login using the useGoogleLogin hook
  const Login = useGoogleLogin({
    onSuccess: (response) => {
      // Fetch user information from Google API using the access token
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      }).then((userInfoResponse) => {
        if (userInfoResponse.ok) {
          return userInfoResponse.json();
        } else {
          console.error('Error processing Google login:', userInfoResponse.status); // Handle errors if fetching user information fails
          throw new Error('Failed to fetch user information');
        }
      }).then((userInfoData) => {
          console.log('Data sent to Django API:', { 
            // Log the data before sending the POST request
              idNumber: idNumber,
              sub: userInfoData.sub,
              name: userInfoData.name,
              email: userInfoData.email,
              // Add other fields as needed
          });

          fetch('http://127.0.0.1:8000/api/profile/', {    // Send user data to Django API using a POST request
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },body: JSON.stringify({
                idNumber: idNumber,
                sub: userInfoData.sub,
                name: userInfoData.name,
                email: userInfoData.email,
            }),
          });
        })
        .catch((error) => { // Handle errors if any occur during the Google login process
          console.error('Error processing Google login:', error);
        });
    },
  });

  return (
    <>
      {/* Input field for entering ID number */}
      <input
        type="text"
        id="inputField"
        placeholder="Enter ID number"
        value={idNumber}
        onChange={handleIdNumberChange}
      />

      {/* Button to trigger the Google login */}
      <button onClick={Login} disabled={!isIdNumberValid}>
        Sign Up
      </button>
    </>
  );
}
export default App;
