import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './wholepage/LoginPage';
import Home from './wholepage/Home';
import { useAuth } from './context/AuthContext';
function App() {
  const{isLoggedIn} = useAuth()
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>  
          <Route path="*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          
          </>
        ) : (
          <Route path="*" element={<LoginPage/>} />
          )}
      </Routes>
    </Router>
  );
}

export default App;
