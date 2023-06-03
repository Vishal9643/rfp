import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminQuotes = () => {
  const [getData, setData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const token = localStorage.getItem("Authorization");

  useEffect(() => {
    const fetchData = async () => {
      const i = localStorage.getItem("quote");

      const data = await axios.get(`/api/rfp/quotes/${i}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.data);
      if (data.data.response == "error") {
        if (data.data.error) {
          toast.error(data.data.error);
        }
      }
      setData(data.data);
    };
    fetchData();
  }, []);

  console.log(getData);

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    getData.response == "success" && getData.rfps
      ? getData.quotes.slice(indexOfFirstItem, indexOfLastItem)
      : "";
  // const currentItems =
  //   getData.response != "error" ? (
  //     getData.slice(indexOfFirstItem, indexOfLastItem)
  //   ) : (
  //     <h2>Nothing to show</h2>
  //   );
  //   getData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const type = localStorage.getItem("type");

  const applyData = (apply) => {
    alert(apply);
    localStorage.setItem("quote", apply);
  };
  return (
    <div>
      <ToastContainer />
      {type == "admin" ? (
        <body data-sidebar="dark">
          <div id="layout-wrapper">
            <Navbar />
            <Sidebar />

            {/* {getData.response != "error" ? ( */}
            <div class="main-content">
              <div class="page-content">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-12">
                      <div class="page-title-box d-flex align-items-center justify-content-between">
                        <h4 class="mb-0 font-size-18">RFP Quotes</h4>
                        <div class="page-title-right">
                          <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                              <a href="javascript: void(0);">Quotes</a>
                            </li>
                            <li class="breadcrumb-item active">RFP Quotes</li>
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
                                <h4 class="card-title">RFP</h4>
                              </div>
                              <div class="col-lg-9 text-right">
                                <div class="headerButtons">
                                  <Link
                                    to="/admin-create-rfp"
                                    class="btn btn-sm btn-success "
                                  >
                                    <i class="mdi mdi-plus"></i> Add RFP
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
                                  <th>Vendor ID</th>
                                  <th>Name</th>
                                  <th>Vendor ID</th>
                                  <th>Vendor Price</th>
                                  {/* <th>Quantity</th>
                                  <th>Total Price</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {getData.response == "error"
                                  ? "No Quotes Available"
                                  : ""}
                                {currentItems &&
                                  currentItems.quotes &&
                                  currentItems.quotes.map((data, index) => (
                                    <tr>
                                      <th scope="row">{index + 1}</th>
                                      <td>{data.quotes.vendor_id}</td>
                                      <td>{data.quotes.name}</td>
                                      <td>{data.quotes.item_price}</td>
                                      <td>{data.quotes.total_cost}</td>
                                      {/* <td>
                                        <span className="badge badge-pill badge-success">
                                          Open
                                        </span>
                                      </td>
                                      <td>
                                        <Link
                                          to="/admin-quotes"
                                          title="View RPF Details"
                                          className="text-success"
                                          onClick={() => {
                                            applyData(data.rfp[0].id);
                                          }}
                                        >
                                          <i className="mdi mdi-eye"></i>
                                        </Link>
                                        <a
                                          href="#"
                                          title="Close RFP"
                                          className="text-danger"
                                        >
                                          <i className="mdi mdi-circle-off-outline"></i>
                                        </a>
                                      </td> */}
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
                                Showing {indexOfFirstItem + 1} to{" "}
                                {getData &&
                                  getData.quotes &&
                                  Math.min(
                                    indexOfLastItem,
                                    getData.quotes.length
                                  )}{" "}
                                of{" "}
                                {getData &&
                                  getData.quotes &&
                                  getData.quotes.length}{" "}
                                entries
                              </div>
                            </div>
                            <div class="col-sm-12 col-md-7 dataTables_wrapper ">
                              <div
                                class="dataTables_paginate paging_simple_numbers"
                                id="datatable_paginate"
                              >
                                <ul class="pagination">
                                  <li
                                    class={`paginate_button page-item previous ${
                                      currentPage === 1 ? "disabled" : ""
                                    }`}
                                    id="datatable_previous"
                                  >
                                    <a
                                      href="#"
                                      aria-controls="datatable"
                                      data-dt-idx="0"
                                      tabindex="0"
                                      class="page-link"
                                      onClick={() => paginate(currentPage - 1)}
                                    >
                                      Previous
                                    </a>
                                  </li>
                                  {getData &&
                                    getData.quotes &&
                                    Array.from(
                                      {
                                        length: Math.ceil(
                                          getData.quotes.length / itemsPerPage
                                        ),
                                      },
                                      (_, i) => (
                                        <li
                                          key={i}
                                          class={`paginate_button page-item ${
                                            currentPage === i + 1
                                              ? "active"
                                              : ""
                                          }`}
                                        >
                                          <a
                                            href="#"
                                            aria-controls="datatable"
                                            data-dt-idx={i + 1}
                                            tabindex="0"
                                            class="page-link"
                                            onClick={() => paginate(i + 1)}
                                          >
                                            {i + 1}
                                          </a>
                                        </li>
                                      )
                                    )}
                                  <li
                                    class={`paginate_button page-item next ${
                                      currentPage === getData &&
                                      getData.quotes &&
                                      Math.ceil(
                                        getData.quotes.length / itemsPerPage
                                      )
                                        ? "disabled"
                                        : ""
                                    }`}
                                    id="datatable_next"
                                  >
                                    <a
                                      href="#"
                                      aria-controls="datatable"
                                      data-dt-idx="2"
                                      tabindex="0"
                                      class="page-link"
                                      onClick={() => paginate(currentPage + 1)}
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
            {/* ) : ( */}
            <div class="main-content">
              <div class="page-content">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-12">
                      <div class="page-title-box d-flex align-items-center justify-content-between">
                        <h4 class="mb-0 font-size-18">RFP Quotes</h4>
                        <div class="page-title-right">
                          <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                              <a href="javascript: void(0);">Quotes</a>
                            </li>
                            <li class="breadcrumb-item active">RFP Quotes</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-lg-12">
                      <div class="card">
                        <div class="card-body">Error with backend</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* )} */}
          </div>
        </body>
      ) : (
        <Navigate to="/vendor-dashboard" />
      )}
    </div>
  );
};

export default AdminQuotes;
