import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const type = localStorage.getItem("type");

  return (
    <div>
      {type == "admin" ? (
        <body data-sidebar="dark">
          <div id="layout-wrapper">
            <Navbar />
            <Sidebar />
            <Dashboard />
          </div>
        </body>
      ) : (
        <Navigate to="/vendor-dashboard" />
      )}
    </div>
  );
};

export default AdminDashboard;
