import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // working with browser cookies
import client from '../api/client'; 

// Context for managing authentication-related data
const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => { // Provides authentication-related data
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Represents whether the user is currently logged in or not. Initially, it's set to false.
  const [userData, setUserData] = useState(null) // Stores information about the logged-in user;
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Whether user data has been fetched from the server or not

  // Function to fetch user data from the server
  const fetchData = async () => {  
    const authToken = Cookies.get('authToken');

    try {
      if (authToken) {
        const res = await client.get('api/User/get_logged_in_user_details', { 
          headers: {
            Authorization: `Token ${authToken}`,
          },
        });
        // Upon receiving a response from the server (res), it sets the isLoggedIn state to true,
        // indicating that the user is logged in
        setIsLoggedIn(true);
        setUserData(res.data); // Contains information about the logged-in user
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsDataLoaded(true); // Regardless of success or failure, it ensures that setIsDataLoaded(true) is called to indicate that the data fetching process is complete
    }
  };

  useEffect(() => { // Trigger the data fetching process when the component mounts
    fetchData();
  }, []);

  const contextValue = { isLoggedIn, userData, fetchData }; // It will be passed as the value prop to the AuthContext.Provider

  // Render children only when data is loaded
  return isDataLoaded ? (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  ) : null;
};

export const useAuth = () => { // Hook to access authentication-related data within React components 
  return useContext(AuthContext);
};
