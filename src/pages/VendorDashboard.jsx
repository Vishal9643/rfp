import React from "react";
import Navbar from "../components/Navbar";
import VendorSidebar from "../components/VendorSidebar";
import VendorDes from "../components/VendorDes";
import { Navigate } from "react-router-dom";

const VendorDashboard = () => {
  const type = localStorage.getItem("type");
  return (
    <div>
      {type == "vendor" ? (
        <body data-sidebar="dark">
          <div id="layout-wrapper">
            <Navbar />
            <VendorSidebar />
            <VendorDes />
          </div>
        </body>
      ) : (
        <Navigate to="/admin-dashboard" />
      )}
    </div>
  );
};

export default VendorDashboard;
