import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

//view category component
const ViewCategory = () => {
  const [getData, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const token = localStorage.getItem("Authorization");
  const [isLoading, setIsLoading] = useState(true);

  //function to fetch the categories from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/Auth/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.categories);
        setIsLoading(false); // Set isLoading to false after data is fetched
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    //function calling
    fetchData();
  }, []);

  const type = localStorage.getItem("type");

  //function to handle category selection
  const handleCategorySelection = (event) => {
    const selectedKey = event.target.value;
    setSelectedCategory(selectedKey);
    localStorage.setItem("selected-category", selectedKey);
  };

  //function for cancel
  const cancel = () => {
    window.history.back();
  };

  const isSubmitDisabled = selectedCategory === "";

  //logic for loader
  if (isLoading) {
    return (
      <div>
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  //main JSX component
  return (
    <div>
      {type === "admin" ? (
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

                            {/* displaying vendor list in table  */}
                            <select
                              className="form-control"
                              id="category"
                              value={selectedCategory}
                              onChange={handleCategorySelection}
                            >
                              <option value="">Select Category</option>
                              {Object.entries(getData).map(
                                ([id, category]) =>
                                  category.status === "active" && (
                                    <option key={id} value={id}>
                                      {category.name}
                                    </option>
                                  )
                              )}
                            </select>
                          </div>
                        </form>
                      </div>

                      {/* creating the */}
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
        </div>
      ) : (
        <Navigate to="/vendor-dashboard" />
      )}
    </div>
  );
};

export default ViewCategory;
