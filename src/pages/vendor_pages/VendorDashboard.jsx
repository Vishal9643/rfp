import React from "react";
import VendorDes from "../../components/VendorDes";
import { Navigate } from "react-router-dom";

//vendor dashboard componet
const VendorDashboard = () => {
  const type = localStorage.getItem("type");

  //main jSX component
  return (
    <div>
      {type == "vendor" ? <VendorDes /> : <Navigate to="/admin-dashboard" />}
    </div>
  );
};

export default VendorDashboard;
