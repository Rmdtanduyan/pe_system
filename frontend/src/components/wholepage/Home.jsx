//Home.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "./Navbar";
import AdminDashboard from "../../pages/Admin/AdminDashboard";
import Visitor from "../../pages/Visitor/Visitor";

function Home() {
  const { userData } = useAuth();
  // console.log(userData);
   console.log(userData.user.staff?.position);
  // console.log(userData.user.first_name);
  // console.log(userData.user.last_name);
  const isAdmin = userData?.user?.staff?.position === "Office";
  
  return (
    
    <>
      <Navbar />
      <div>{isAdmin ? <AdminDashboard /> : <Visitor />}</div>
    </>
  );
}

export default Home;
