import React from "react";
import logo from "../assets/images/velocity_logo.png";
import { Navigate } from "react-router-dom";

//admin sidebar component

const Navbar = () => {
  //storing name of user from local storage
  const name = localStorage.getItem("Name");

  //logout function
  const handleLogout = () => {
    //clearing local storage
    localStorage.removeItem("Name");
    localStorage.removeItem("type");
    localStorage.removeItem("Authorization");
    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <div>
      <header id="page-topbar">
        <div class="navbar-header">
          <div class="d-flex">
            <div class="navbar-brand-box">
              <a href="index.html" class="logo logo-light">
                <span class="logo-sm">
                  <img src={logo} alt="" height="40" />
                </span>
                <span class="logo-lg">
                  <img src={logo} alt="" height="" />
                </span>
              </a>
            </div>
          </div>

          <div class="d-flex pr-2">
            <div class="dropdown d-inline-block">
              <span class="d-none d-xl-inline-block ml-1" key="t-henry">
                Welcome {name}
              </span>
              &nbsp;&nbsp;
              <a class="" href="#" onClick={handleLogout}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
