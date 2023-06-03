import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const AdminCategory = () => {
  const [getData, setData] = useState("");
  const token = localStorage.getItem("Authorization");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`/api/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setData(data.data);
    };
    fetchData();
  }, []);

  console.log(getData);

  const totalItems =
    getData && getData.categories
      ? Object.entries(getData.categories).length
      : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const type = localStorage.getItem("type");
  return (
    <>
      {type == "admin" ? (
        <div>
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
                                      <i class="mdi mdi-plus"></i> Add
                                      Categories
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
                                <tbody>
                                  {getData &&
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
                                          <td>{value}</td>
                                          {/* <td>{data.rfp[0].last_date}</td>
                                      <td>{data.rfp[0].minimum_price}</td>
                                      <td>{data.rfp[0].maximum_price}</td> */}
                                          <td>
                                            <span className="badge badge-pill badge-success">
                                              Open
                                            </span>
                                          </td>
                                          <td>
                                            <a
                                              href="#"
                                              title="View RPF Details"
                                              className="text-success"
                                            >
                                              <i className="mdi mdi-eye"></i>
                                            </a>
                                            <a
                                              href="#"
                                              title="Close RFP"
                                              className="text-danger"
                                            >
                                              <i className="mdi mdi-circle-off-outline"></i>
                                            </a>
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
                                  Showing {(currentPage - 1) * itemsPerPage + 1}{" "}
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

                <footer class="footer">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-sm-6">2022 &copy; Copyright.</div>
                      <div class="col-sm-6">
                        <div class="text-sm-right d-none d-sm-block">
                          Support Email:{" "}
                          <a href="#" target="_blank" class="text-muted">
                            support@velsof.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </body>
        </div>
      ) : (
        <Navigate to="/vendor-dashboard" />
      )}
    </>
  );
};

export default AdminCategory;
