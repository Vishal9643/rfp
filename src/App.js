import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegisterVendor from "./pages/RegisterVendor";
import AdminDashboard from "./pages/AdminDashboard";
import "./assets/images/favicon.ico";
import "./assets/css/style.css";
import "./assets/css/app.min.css";
import "./assets/css/icons.min.css";
import "./assets/css/bootstrap.min.css";
// import "./assets/libs/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css";
import "./assets/libs/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css";
import AdminCategory from "./pages/AdminCategory";
import AdminVendorList from "./pages/AdminVendorList";
import AdminRfp from "./pages/AdminRfp";
import VendorDashboard from "./pages/VendorDashboard";
import VendorRfp from "./pages/VendorRfp";
import RfpApply from "./pages/RfpApply";
import CreateCategory from "./pages/CreateCategory";
import CreateRfp from "./pages/CreateRfp";
import AdminQuotes from "./pages/AdminQuotes";
import ViewCategory from "./pages/ViewCategory";
import RegisterAdmin from "./pages/RegisterAdmin";
import ForgetPassword from "./pages/ForgetPassword";
import UserManagement from "./pages/UserManagement";

// import "./assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="vendor-registration" element={<RegisterVendor />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="admin-registration" element={<RegisterAdmin />} />
          <Route path="admin-Dashboard" element={<AdminDashboard />} />
          <Route path="admin-Category" element={<AdminCategory />} />
          <Route path="admin-view-category" element={<ViewCategory />} />
          <Route path="admin-vendor" element={<AdminVendorList />} />
          <Route path="admin-rfp" element={<AdminRfp />} />
          <Route path="admin-quotes" element={<AdminQuotes />} />
          <Route path="vendor-dashboard" element={<VendorDashboard />} />
          <Route path="vendor-rfp" element={<VendorRfp />} />
          <Route path="vendor-rfp-apply" element={<RfpApply />} />
          <Route path="admin-create-category" element={<CreateCategory />} />
          <Route path="admin-create-rfp" element={<CreateRfp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
