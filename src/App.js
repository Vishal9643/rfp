//importing all the required files and library
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/common_component/Login";
import RegisterVendor from "./pages/vendor_pages/RegisterVendor";
import AdminDashboard from "./pages/admin_pages/AdminDashboard";
import "./assets/images/favicon.ico";
import "./assets/css/style.css";
import "./assets/css/app.min.css";
import "./assets/css/icons.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/libs/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css";
import AdminCategory from "./pages/admin_pages/AdminCategory";
import AdminVendorList from "./pages/admin_pages/AdminVendorList";
import AdminRfp from "./pages/admin_pages/AdminRfp";
import VendorDashboard from "./pages/vendor_pages/VendorDashboard";
import VendorRfp from "./pages/vendor_pages/VendorRfp";
import RfpApply from "./pages/vendor_pages/RfpApply";
import CreateCategory from "./pages/admin_pages/CreateCategory";
import CreateRfp from "./pages/admin_pages/CreateRfp";
import AdminQuotes from "./pages/admin_pages/AdminQuotes";
import ViewCategory from "./pages/admin_pages/ViewCategory";
import RegisterAdmin from "./pages/admin_pages/RegisterAdmin";
import ForgetPassword from "./pages/common_component/ForgetPassword";
import UserManagement from "./pages/admin_pages/UserManagement";
import ResetPassword from "./pages/common_component/ResetPassword";
import Navbar from "./components/Navbar";
import VendorSidebar from "./components/VendorSidebar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Commonly used routes file */}

          <Route index element={<Login />} />
          <Route path="reset-password" element={<ForgetPassword />} />
          <Route path="forget-password">
            <Route path=":id" element={<ResetPassword />} />
          </Route>

          {/* Vendor Registration route */}

          <Route path="">
            <Route path="vendor-registration" element={<RegisterVendor />} />

            {/* Routes Regarding Vendors */}

            <Route
              path="vendor-dashboard"
              element={
                <body data-sidebar="dark">
                  <div id="layout-wrapper">
                    <Navbar />
                    <VendorSidebar />
                    <VendorDashboard />
                    <Footer />
                  </div>
                </body>
              }
            />
            <Route
              path="vendor-rfp"
              element={
                <body data-sidebar="dark">
                  <div id="layout-wrapper">
                    <Navbar />
                    <VendorSidebar />
                    <VendorRfp />
                    <Footer />
                  </div>
                </body>
              }
            />
            <Route
              path="vendor-rfp-apply"
              element={
                <body data-sidebar="dark">
                  <div id="layout-wrapper">
                    <Navbar />
                    <VendorSidebar />
                    <RfpApply />
                    <Footer />
                  </div>
                </body>
              }
            />
          </Route>

          {/* Route for Admin Registration */}

          <Route path="">
            <Route path="admin-registration" element={<RegisterAdmin />} />

            {/* Routes Regarding Admin */}

            <Route
              path="user-management"
              element={
                <body data-sidebar="dark">
                  <div id="layout-wrapper">
                    <Navbar />
                    <Sidebar />
                    <UserManagement />
                    <Footer />
                  </div>
                </body>
              }
            />
            <Route
              path="admin-Dashboard"
              element={
                <body data-sidebar="dark">
                  <div id="layout-wrapper">
                    <Navbar />
                    <Sidebar />
                    <AdminDashboard />
                    <Footer />
                  </div>
                </body>
              }
            />
            <Route
              path="admin-Category"
              element={
                <body data-sidebar="dark">
                  <div id="layout-wrapper">
                    <Navbar />
                    <Sidebar />
                    <AdminCategory />
                    <Footer />
                  </div>
                </body>
              }
            />
            <Route
              path="admin-view-category"
              element={
                <body data-sidebar="dark">
                  <div id="layout-wrapper">
                    <Navbar />
                    <Sidebar />
                    <ViewCategory />
                    <Footer />
                  </div>
                </body>
              }
            />
            <Route
              path="admin-vendor"
              element={
                <body data-sidebar="dark">
                  <div id="layout-wrapper">
                    <Navbar />
                    <Sidebar />
                    <AdminVendorList />
                    <Footer />
                  </div>
                </body>
              }
            />
            <Route
              path="admin-rfp"
              element={
                <body data-sidebar="dark">
                  <div id="layout-wrapper">
                    <Navbar />
                    <Sidebar />
                    <AdminRfp />
                    <Footer />
                  </div>
                </body>
              }
            />
            <Route
              path="admin-quotes"
              element={
                <body data-sidebar="dark">
                  <div id="layout-wrapper">
                    <Navbar />
                    <Sidebar />
                    <AdminQuotes />
                    <Footer />
                  </div>
                </body>
              }
            />
            <Route
              path="admin-create-category"
              element={
                <body data-sidebar="dark">
                  <div id="layout-wrapper">
                    <Navbar />
                    <Sidebar />
                    <CreateCategory />
                    <Footer />
                  </div>
                </body>
              }
            />
            <Route
              path="admin-create-rfp"
              element={
                <body data-sidebar="dark">
                  <div id="layout-wrapper">
                    <Navbar />
                    <Sidebar />
                    <CreateRfp />
                    <Footer />
                  </div>
                </body>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
