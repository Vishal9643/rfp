import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <div class="vertical-menu">
        <div data-simplebar class="h-100">
          <div id="sidebar-menu">
            <ul class="metismenu list-unstyled" id="side-menu">
              <li>
                <Link to="/admin-dashboard" class="waves-effect">
                  <i class="mdi mdi-file-document-box-outline"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/admin-vendor" class="waves-effect">
                  <i class="mdi mdi-receipt"></i>
                  <span>Vendors</span>
                </Link>
              </li>
              <li>
                <Link to="/admin-rfp" class="waves-effect">
                  <i class="mdi mdi-flip-vertical"></i>
                  <span>RFP Lists</span>
                </Link>
              </li>
              <li>
                <a href="users.html" class="waves-effect">
                  <i class="mdi mdi-apps"></i>
                  <span>User Management</span>
                </a>
              </li>

              <li>
                <Link to="/admin-Category" class="waves-effect">
                  <i class="mdi mdi-weather-night"></i>
                  <span>Categories</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
