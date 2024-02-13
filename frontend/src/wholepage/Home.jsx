import React, { useState, useEffect } from "react";
import AdminDashboard from "../pages/AdminDashboard";
import Visitor from "../pages/Visitor";
import { useAuth } from "../context/AuthContext";

import LoginButton from "../components/wholepage/LoginButton";
function Home() {
  const { userData } = useAuth();
  console.log(userData);
  console.log(userData.user.staff?.position);
  return (
    <div>
      {isAdmin ? <AdminDashboard /> : <Visitor />}

      <h1>Visitor Page</h1>
      <LoginButton />
    </div>
  );
}

export default Home;
