import React from "react";
import Dashboard from "../../components/Dashboard";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const type = localStorage.getItem("type");

  return (
    <div>
      {type == "admin" ? <Dashboard /> : <Navigate to="/vendor-dashboard" />}
    </div>
  );
};

export default AdminDashboard;
