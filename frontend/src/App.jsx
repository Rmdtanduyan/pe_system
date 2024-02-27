// Import necessary modules from React and react-router-dom
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components and hooks
import LoginPage from './components/wholepage/LoginPage';
import Home from './components/wholepage/Home';
import { useAuth } from './context/AuthContext';
import Facultypage from './pages/Admin/facultypage';
import ClassCodeList from './components/Admin/ClassCodeList';
import Codelist from './components/Admin/Codelist';
function App() {
  // Extract isLoggedIn and userData from useAuth hook
  const { isLoggedIn, userData } = useAuth();

  return (
    // Wrap the entire application with BrowserRouter
    <Router>
      {/* Define routes using Routes component */}
      <Routes>
        {/* Default route, if user is logged in, render Home component, else navigate to login page */}
        <Route 
          path="*" 
          element={isLoggedIn ? (<Home />) : (<Navigate to="/login" replace />)}
        />
        {/* Route for login page */}
        <Route path="/login" element={<LoginPage />} />
        {/* Protected route for home page, render Home component if logged in, else navigate to login page */}
        <Route 
          path="/home"
          element={isLoggedIn ? (
              <Home />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* Protected route for faculty page, only accessible to users with admin associate position */}
        {isLoggedIn && userData?.user?.staff?.position === "Office" && (
          <>
          <Route path="/faculty" element={<Facultypage />} />
          <Route path="/ClassCodeList" element={<ClassCodeList />} />
          <Route path="/CodeList" element={<Codelist />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
