import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//admin dashboard component

const AdminCategory = () => {
  //state variable
  const [getData, setData] = useState("");

  //storing token from local storage
  const token = localStorage.getItem("Authorization");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  //storing status
  const [status, setStatus] = useState("");

  //to display loader
  const [isLoading, setIsLoading] = useState(true);

  //Fetching categories from the DB
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        `${process.env.REACT_APP_API}/Auth/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //storing response in state variable
      setData(data.data);
      setIsLoading(false); // Set isLoading to false after data is fetched
    };

    //function calling
    fetchData();
  }, [status]);

  //function to change the status of a category
  const changeStatus = async (status, name) => {
    //storing all the input in form-data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("status", status);

    //inactive message
    if (status == "Inactive") {
      toast.warn(`Deactivting Category`);
    } else {
      //active message
      toast.warn(`Activating Category`);
    }

    //sending data to backend server
    const data = await axios.post(
      `${process.env.REACT_APP_API}/Auth/changecategorystatus`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    //storing status in state variable
    setStatus(data.data);

    //inactive message
    if (data.data?.response == "error") {
      toast.error(`${data.data?.error}`);
    } else if (data.data == "Inactive") {
      toast.success(`Category Deactivted `);
    } else {
      //active message
      toast.success(`Category Activated `);
    }
  };

  //pagination

  const totalItems =
    getData && getData.categories
      ? Object.entries(getData.categories).length
      : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //storing type of user
  const type = localStorage.getItem("type");
  const role = localStorage.getItem("role");

  //displaying loader
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

  //main  component
  return (
    <>
      <ToastContainer />
      {type == "admin" ? (
        role == "manager" ? (
          <Navigate to="/admin-dashboard" />
        ) : (
          <div>
            <div class="main-content">
              <div class="page-content">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-12">
                      <div class="page-title-box d-flex align-items-center justify-content-between">
                        <h4 class="mb-0 font-size-18">Categories</h4>
                        <div class="page-title-right">
                          <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                              <a href="javascript: void(0);">Home</a>
                            </li>
                            <li class="breadcrumb-item active">categories</li>
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
                                <h4 class="card-title">Categories</h4>
                              </div>
                              <div class="col-lg-9 text-right">
                                <div class="headerButtons">
                                  <Link
                                    to="/admin-create-category"
                                    class="btn btn-sm btn-success "
                                  >
                                    <i class="mdi mdi-plus"></i> Add Categories
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="table-responsive">
                            <table
                              class="table mb-0 listingData dt-responsive"
                              id="datatable"
                            >
                              <thead>
                                <tr>
                                  <th>S No.</th>
                                  <th>Category Name</th>
                                  <th>Status</th>
                                  <th>Action</th>
                                </tr>
                              </thead>

                              {/* Fetching data from the database and lisiting data in table */}
                              <tbody>
                                {getData &&
                                  getData.categories &&
                                  getData.categories &&
                                  Object.entries(getData.categories)
                                    .slice(
                                      (currentPage - 1) * itemsPerPage,
                                      currentPage * itemsPerPage
                                    )
                                    .map(([key, value], index) => (
                                      <tr key={key}>
                                        <th scope="row">
                                          {(currentPage - 1) * itemsPerPage +
                                            index +
                                            1}
                                        </th>
                                        <td>{value.name}</td>

                                        <td>
                                          {value.status == "active" ? (
                                            <span className="badge badge-pill badge-success">
                                              {value.status}
                                            </span>
                                          ) : (
                                            <span className="badge badge-pill badge-danger">
                                              {value.status}
                                            </span>
                                          )}
                                        </td>
                                        <td>
                                          {value.status == "active" ? (
                                            <span
                                              style={{
                                                color: "red",
                                                fontStyle: "italic",
                                                cursor: "pointer",
                                              }}
                                              onClick={() =>
                                                changeStatus(
                                                  "Inactive",
                                                  value.name
                                                )
                                              }
                                            >
                                              deactivate
                                            </span>
                                          ) : (
                                            <span
                                              style={{
                                                color: "green",
                                                fontStyle: "italic",
                                                cursor: "pointer",
                                              }}
                                              onClick={() =>
                                                changeStatus(
                                                  "active",
                                                  value.name
                                                )
                                              }
                                            >
                                              activate
                                            </span>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                              </tbody>
                            </table>
                          </div>

                          <div class="row pt-3">
                            <div class="col-sm-12 col-md-5">
                              <div
                                class="dataTables_info"
                                id="datatable_info"
                                role="status"
                                aria-live="polite"
                              >
                                {/* pagination */}
                                Showing {(currentPage - 1) * itemsPerPage +
                                  1}{" "}
                                to{" "}
                                {Math.min(
                                  currentPage * itemsPerPage,
                                  totalItems
                                )}{" "}
                                of {totalItems} entries
                              </div>
                            </div>
                            <div class="col-sm-12 col-md-7 dataTables_wrapper ">
                              <div
                                class="dataTables_paginate paging_simple_numbers"
                                id="datatable_paginate"
                              >
                                <ul class="pagination">
                                  <li
                                    class={`paginate_button page-item ${
                                      currentPage === 1 ? "disabled" : ""
                                    }`}
                                    onClick={() =>
                                      handlePageChange(currentPage - 1)
                                    }
                                  >
                                    <a
                                      href="#"
                                      aria-controls="datatable"
                                      data-dt-idx="0"
                                      tabindex="0"
                                      class="page-link"
                                    >
                                      Previous
                                    </a>
                                  </li>
                                  {Array.from(
                                    { length: totalPages },
                                    (v, k) => k + 1
                                  ).map((pageNumber) => (
                                    <li
                                      key={pageNumber}
                                      class={`paginate_button page-item ${
                                        currentPage === pageNumber
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        handlePageChange(pageNumber)
                                      }
                                    >
                                      <a
                                        href="#"
                                        aria-controls="datatable"
                                        data-dt-idx="1"
                                        tabindex="0"
                                        class="page-link"
                                      >
                                        {pageNumber}
                                      </a>
                                    </li>
                                  ))}
                                  <li
                                    class={`paginate_button page-item ${
                                      currentPage === totalPages
                                        ? "disabled"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      handlePageChange(currentPage + 1)
                                    }
                                  >
                                    <a
                                      href="#"
                                      aria-controls="datatable"
                                      data-dt-idx="2"
                                      tabindex="0"
                                      class="page-link"
                                    >
                                      Next
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <Navigate to="/vendor-dashboard" />
      )}
    </>
  );
};

export default AdminCategory;
