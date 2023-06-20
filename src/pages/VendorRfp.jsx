import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import VendorSidebar from "../components/VendorSidebar";
import { Link, Navigate } from "react-router-dom";

const VendorRfp = () => {
  const [getData, setData] = useState("");
  const token = localStorage.getItem("Authorization");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  let arr = [];
  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        `https://rfp-backend.onrender.com/Auth/rfp/getrfp/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.data);
      // const requests = [];
      // for (let i = 1; i < 10; i++) {
      //   requests.push(
      //     axios.get(`/api/rfp/${i}`, {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     })
      //   );
      // }
      // const responses = await Promise.all(requests);
      // const data = responses.map((response) => response.data);
      setData(data.data);
    };

    fetchData();
  }, []);

  const applyData = (apply) => {
    // alert(apply);
    localStorage.setItem("apply", apply);
  };
  const type = localStorage.getItem("type");

  console.log(getData);
  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    getData.response == "success" && getData.rfps
      ? getData.rfps.slice(indexOfFirstItem, indexOfLastItem)
      : "";

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      {type == "vendor" ? (
        <div>
          <body data-sidebar="dark">
            <div id="layout-wrapper">
              <Navbar />
              <VendorSidebar />
              <div class="main-content">
                <div class="page-content">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-12">
                        <div class="page-title-box d-flex align-items-center justify-content-between">
                          <h4 class="mb-0 font-size-18">RFP List</h4>
                          <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                              <li class="breadcrumb-item">
                                <a href="javascript: void(0);">Home</a>
                              </li>
                              <li class="breadcrumb-item active">RFP List</li>
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
                              </div>
                            </div>
                            <div class="table-responsive">
                              <table
                                class="table mb-0 listingData dt-responsive"
                                id="datatable"
                              >
                                <thead>
                                  <tr>
                                    <th>RFP No.</th>
                                    <th>RFP Title</th>
                                    <th>RFP Last Date</th>
                                    <th>Min Amount</th>
                                    <th>Max Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {getData.response == "error" ? (
                                    <h3>No Data to Display</h3>
                                  ) : (
                                    ""
                                  )}
                                  {currentItems &&
                                    currentItems.map((data) => (
                                      <tr key={data.rfp_no}>
                                        <th scope="row">{data.rfp_no}</th>
                                        <td>{data.item_name}</td>
                                        <td>{data.last_date}</td>
                                        <td>{data.minimum_price}</td>
                                        <td>{data.maximum_price}</td>
                                        <td>
                                          <span className="badge badge-pill badge-success">
                                            Open
                                          </span>
                                        </td>
                                        <td>
                                          <Link
                                            to="/vendor-rfp-apply"
                                            title="Close RFP"
                                            className="text-danger"
                                            onClick={() => {
                                              applyData(data.id);
                                            }}
                                          >
                                            Apply
                                          </Link>
                                        </td>
                                      </tr>
                                    ))}

                                  {/* <tr>
                                <th scope="row">232/44234/4234</th>
                                <td>Keyboard XYZ</td>
                                <td>13-Oct-2023</td>
                                <td>10,000</td>
                                <td>10,0000</td>
                                <td>
                                  <span class="badge badge-pill badge-success">
                                    Open
                                  </span>
                                </td>
                                <td>
                                  <a
                                    href="#"
                                    title="View RPF Details"
                                    class="text-success"
                                  >
                                    <i class="mdi mdi-eye"></i>
                                  </a>
                                  <a
                                    href="#"
                                    title="Close RFP"
                                    class="text-danger"
                                  >
                                    <i class="mdi mdi-circle-off-outline"></i>
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">232/44234/4234</th>
                                <td>Keyboard XYZ</td>
                                <td>13-Oct-2023</td>
                                <td>10,000</td>
                                <td>10,0000</td>
                                <td>
                                  <span class="badge badge-pill badge-success">
                                    Open
                                  </span>
                                </td>
                                <td>
                                  <a
                                    href="#"
                                    title="View RPF Details"
                                    class="text-success"
                                  >
                                    <i class="mdi mdi-eye"></i>
                                  </a>
                                  <a
                                    href="#"
                                    title="Close RFP"
                                    class="text-danger"
                                  >
                                    <i class="mdi mdi-circle-off-outline"></i>
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">232/44234/4234</th>
                                <td>Keyboard XYZ</td>
                                <td>13-Oct-2023</td>
                                <td>10,000</td>
                                <td>10,0000</td>
                                <td>
                                  <span class="badge badge-pill badge-danger">
                                    Close
                                  </span>
                                </td>
                                <td>
                                  <a
                                    href="#"
                                    title="View RPF Details"
                                    class="text-success"
                                  >
                                    <i class="mdi mdi-eye"></i>
                                  </a>
                                  <a
                                    href="#"
                                    title="View Quotes"
                                    class="text-info"
                                  >
                                    <i class="mdi mdi-eye"></i>
                                  </a>
                                </td>
                              </tr> */}
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
                                    getData.rfps &&
                                    Math.min(
                                      indexOfLastItem,
                                      getData.rfps.length
                                    )}{" "}
                                  of{" "}
                                  {getData &&
                                    getData.rfps &&
                                    getData.rfps.length}{" "}
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
                                        onClick={() =>
                                          paginate(currentPage - 1)
                                        }
                                      >
                                        Previous
                                      </a>
                                    </li>
                                    {getData &&
                                      getData.rfps &&
                                      Array.from(
                                        {
                                          length: Math.ceil(
                                            getData.rfps.length / itemsPerPage
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
                                        getData.rfps &&
                                        Math.ceil(
                                          getData.rfps.length / itemsPerPage
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
                                        onClick={() =>
                                          paginate(currentPage + 1)
                                        }
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
            </div>
          </body>
        </div>
      ) : (
        <Navigate to="/admin-dashboard" />
      )}
    </>
  );
};

export default VendorRfp;
