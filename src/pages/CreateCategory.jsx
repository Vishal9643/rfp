import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCategory = () => {
  const [category, setcategory] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const handleCategory = (e) => {
    const input = e.target.value;
    const regex = /[\s\S]*/; // Regex to validate password format (at least 8 characters, one uppercase, one lowercase, and one digit)
    if (regex.test(input)) {
      setcategory(input);
      setCategoryError("");
    } else {
      setCategoryError("Invalid input");
    }
  };
  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!category) {
      alert("Please fill the category name");
    }
    const formData = new FormData();
    formData.append("name", category);
    const token = localStorage.getItem("Authorization");

    const fetchData = async () => {
      const data = await axios.post(
        "https://rfp-backend.onrender.com//Auth/addcategory",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.data);
      if (data.data.response == "error") {
        toast.error("error in adding category");
      }
      if (data.data.response == "success") {
        toast.success("Category added successfully");
      }
    };
    fetchData();
  };
  const type = localStorage.getItem("type");

  return (
    <div>
      <ToastContainer />
      {type == "admin" ? (
        <body data-sidebar="dark">
          <div id="layout-wrapper">
            <Navbar />
            <Sidebar />
            <div class="main-content">
              <div class="page-content">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-12">
                      <div class="page-title-box d-flex align-items-center justify-content-between">
                        <h4 class="mb-0 font-size-18">RFP Create</h4>
                        <div class="page-title-right">
                          <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                              <a href="javascript: void(0);">Home</a>
                            </li>
                            <li class="breadcrumb-item active">Categories </li>
                            <li class="breadcrumb-item active">
                              Create Category
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-lg-12">
                      <div class="card">
                        <div class="card-body">
                          <div class="TableHeader">
                            <div class="row">
                              <div class="col-lg-3">
                                <h4 class="card-title">Category</h4>
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            <form
                              className="form-horizontal"
                              action="dashboard.html"
                            >
                              <div className="form-group">
                                <label for="username">Category Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="vendor-Price"
                                  placeholder="New Category Name"
                                  onChange={handleCategory}
                                />
                                {categoryError && (
                                  <span className="text-danger">
                                    {categoryError}
                                  </span>
                                )}
                              </div>
                            </form>
                          </div>
                          <button
                            className="btn btn-primary"
                            onClick={handleCreateCategory}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <footer class="footer">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-sm-6">2022 &copy; Copyright.</div>
                    <div class="col-sm-6">
                      <div class="text-sm-right d-none d-sm-block">
                        Support Email:
                        <a href="#" target="_blank" class="text-muted">
                          {" "}
                          support@velsof.com{" "}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </body>
      ) : (
        <Navigate to="/vendor-dashboard" />
      )}
    </div>
  );
};

export default CreateCategory;
