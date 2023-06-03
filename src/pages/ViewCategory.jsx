import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const ViewCategory = () => {
  const [getData, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const token = localStorage.getItem("Authorization");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const type = localStorage.getItem("type");

  const handleCategorySelection = (event) => {
    const selectedKey = event.target.value;
    setSelectedCategory(selectedKey);
    localStorage.setItem("selected-category", selectedKey);
  };

  const cancel = () => {
    window.history.back();
  };

  const isSubmitDisabled = selectedCategory === "";

  return (
    <div>
      {type === "admin" ? (
        <div data-sidebar="dark">
          <div id="layout-wrapper">
            <Navbar />
            <Sidebar />
            <div className="main-content">
              <div className="page-content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="page-title-box d-flex align-items-center justify-content-between">
                        <h4 className="mb-0 font-size-18">RFP Create</h4>
                        <div className="page-title-right">
                          <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item">
                              <a href="javascript: void(0);">Home</a>
                            </li>
                            <li className="breadcrumb-item active">RFP</li>
                            <li className="breadcrumb-item active">
                              RFP Select Category
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="TableHeader">
                            <div className="row">
                              <div className="col-lg-3">
                                <h4 className="card-title">Category</h4>
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            <form
                              className="form-horizontal"
                              action="dashboard.html"
                            >
                              <div className="form-group">
                                <label htmlFor="category">Category Name</label>
                                <select
                                  className="form-control"
                                  id="category"
                                  value={selectedCategory}
                                  onChange={handleCategorySelection}
                                >
                                  <option value="">Select Category</option>
                                  {Object.entries(getData).map(([id, name]) => (
                                    <option key={id} value={id}>
                                      {name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </form>
                          </div>
                          <Link to="/admin-create-rfp">
                            <button
                              className="btn btn-primary"
                              disabled={isSubmitDisabled}
                            >
                              Submit
                            </button>
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={cancel}
                            style={{ marginLeft: "10px" }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <footer className="footer">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-6">
                      2022 &copy; Velsof. All rights reserved.
                    </div>
                    <div className="col-sm-6">
                      <div className="text-sm-right d-none d-sm-block">
                        Support Email:
                        <a href="#" target="_blank" className="text-muted">
                          support@velsof.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/vendor-dashboard" />
      )}
    </div>
  );
};

export default ViewCategory;
