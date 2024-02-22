//LoginButton.jsx
import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import client from "../../api/client";
import Cookies from "js-cookie"; // Importing Cookies library for managing cookies

function LoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Effect to check if user is already logged in when component mounts
    const authToken = Cookies.get("authToken");
    setIsLoggedIn(!!authToken); // Set isLoggedIn state based on authToken existence
  }, []);

  const Login = useGoogleLogin({
    // Google login hook
    onSuccess: async (response) => {
      try {
        // On successful Google login
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo", // Fetch user info from Google API
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`, // Include access token in headers
            },
          }
        );

        if (userInfoResponse.ok) {
          // If user info fetch is successful
          const userInfoData = await userInfoResponse.json(); // Parse user info response
          console.log(userInfoData)
          await submitLogin(userInfoData); // Submit user info for login handling
        } else {
          console.error(
            "Error processing Google login:",
            userInfoResponse.status,
            userInfoResponse.statusText
          );
        }
      } catch (err) {
        console.error("Error processing Google login:", err);
      }
    },
  });

  async function submitLogin(userInfoData) {
    // Function to handle login submission
    const { email } = userInfoData; // Extract email from user info

    try {
      console.log("Checking registration...");
      const res = await client.post("api/User/checkregister/", { email }); // Check if user is registered on server

      if (res.data.detail === "User not registered") {
        console.log("User not registered. Proceeding to registration...");
        await createAccount(userInfoData); // If not registered, create an account
      } else {
        console.log("User already registered. Logging in...");
        await loginUser(userInfoData); // If registered, log in user
      }
    } catch (error) {
      console.error("Error checking registration:", error);
    }
  }

  async function createAccount(userInfoData) {
    // Function to handle user registration
    const { email, given_name, family_name } = userInfoData; // Extract relevant user info

    try {
      console.log("Registering user...");
      const registerResponse = await client.post("api/User/register/", {
        // Register user on server
        email,
        first_name: given_name,
        last_name: family_name,
      });

      if (registerResponse.status === 201) {
        console.log("Registration successful. Logging in...");
        await loginUser(userInfoData); // If registration successful, proceed to login
      } else {
        console.error("Registration failed:", registerResponse.statusText);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  async function loginUser(userInfoData) {
    // Function to handle user login
    const { email } = userInfoData; // Extract user email

    try {
      console.log("Logging in user...");
      const loginResponse = await client.post("api/User/login/", { email }); // Log user in on server

      if (loginResponse.status === 200) {
        const authToken = loginResponse.data.token; // Extract auth token from login response

        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hour in milliseconds

        // Store the token in a cookie
        Cookies.set("authToken", authToken, {
          expires: expirationDate,
          secure: true,
          sameSite: "Strict",
        });

        setIsLoggedIn(true); // Update login status to true

        // Redirect or navigate to the Home page
        navigate("/Home");
        window.location.reload(); // Refresh page to reflect login changes
      } else {
        console.error("Login failed:", loginResponse.statusText);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  async function submitLogout(e) {
    // Function to handle user logout
    console.log("Logging out...");
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const authToken = Cookies.get("authToken"); // Get auth token from cookie
      await client.post(
        "api/User/logout/", // Logout user on server
        {},
        {
          headers: {
            Authorization: `Token ${authToken}`, // Include auth token in headers
          },
        }
      );
      navigate("/"); // Redirect to home page after logout
      // Always remove the authentication token cookie
      Cookies.remove("authToken"); // Remove auth token cookie
      navigate("/"); // Redirect to home page
      window.location.reload(); // Refresh page to reflect logout changes
      console.log("Token Removed");
    } catch (error) {
      // Even if there's an error, remove the authentication token cookie
      Cookies.remove("authToken");
      console.error("Logout error:", error);
    } finally {
      // This will execute regardless of success or failure
      setIsLoggedIn(false); // Update login status to false
    }
  }

  return (
    <div>
      {isLoggedIn ? (
        // Render logout button if user is logged in
        <>
          <button
            onClick={submitLogout}
            className="w-full flex items-center justify-center"
          >
            Logout
          </button>
        </>
      ) : (
        // Render login button if user is not logged in
        <div className="flex items-center justify-center">
          <button
            onClick={Login}
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline-blue active:bg-teal-800"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginButton;
