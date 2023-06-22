import React from "react";
import { Link } from "react-router-dom";

//vendor dashboard
const VendorSidebar = () => {
  return (
    <div>
      <div class="vertical-menu">
        <div data-simplebar class="h-100">
          <div id="sidebar-menu">
            <ul class="metismenu list-unstyled" id="side-menu">
              <li>
                <Link to="/vendor-dashboard" class="waves-effect">
                  <i class="mdi mdi-file-document-box-outline"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/vendor-rfp" class="waves-effect">
                  <i class="mdi mdi-receipt"></i>
                  <span>RFP for Quotes</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSidebar;
