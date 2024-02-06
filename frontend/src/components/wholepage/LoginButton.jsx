//LoginButton.jsx
import React from 'react'

const LoginButton = () => {
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
    onSuccess: async (response) => {
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
      }).then(async (userInfoData) => {
        console.log(userInfoData)

        console.log('Data sent to Django API:', { 
          // Log the data before sending the POST request
          idNumber: idNumber,
          first_name: userInfoData.given_name,
          last_name: userInfoData.family_name,
          email: userInfoData.email,
          // Add other fields as needed
        });
        const response = await client.post('/api/User/', {
          idNumber: idNumber,
          first_name: userInfoData.given_name,
          last_name: userInfoData.family_name,
          email: userInfoData.email,
        });
        
      });
    }
  });

  return (
    <button onClick={Login} disabled={!isIdNumberValid}>Sign Up</button>
  )
}
export default LoginButton
