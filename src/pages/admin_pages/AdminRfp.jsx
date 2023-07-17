import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//admin rfp component

const AdminRfp = () => {
  //state variable
  const [getData, setData] = useState("");
  const [closedRfp, setClosedRfp] = useState("");

  //pagination variable
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //state variable for loader
  const [isLoading, setIsLoading] = useState(true);

  //storing token
  const token = localStorage.getItem("Authorization");
  let arr = [];
  const user_id = localStorage.getItem("user_id");

  //function to view rfp
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        `${process.env.REACT_APP_API}/Auth/viewrfp`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data.data);
      setIsLoading(false); // Set isLoading to false after data is fetched
    };

    fetchData();
  }, [closedRfp]);

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
  const type = localStorage.getItem("type");
  const role = localStorage.getItem("role");

  const applyData = (apply) => {
    localStorage.setItem("quote", apply);
  };

  //function to close rfp
  const closeRFP = (apply) => {
    const id = apply;

    //closing message
    toast.warn(`Closing RFP ${id}`);

    const close = async () => {
      const request = await axios.get(
        `${process.env.REACT_APP_API}/Auth/rfp/closerfp/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClosedRfp(request.data);

      if (request.data.response == "error") {
        //error message
        toast.error(request.data.errors);
      }
      if (request.data.response == "success") {
        //success message
        toast.success(`Successfully closed RFP ${id}`);
      }
    };
    close();
  };

  //logic to display loader
  if (isLoading) {
    return (
      <div>
        <ToastContainer />
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

  //main component
  return (
    <div>
      <ToastContainer />
      {type == "admin" ? (
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
                          {role == "manager" ? (
                           ""
                          ) : (
                            <div class="col-lg-9 text-right">
                              <div class="headerButtons">
                                <Link
                                  to="/admin-view-category"
                                  class="btn btn-sm btn-success "
                                >
                                  <i class="mdi mdi-plus"></i> Add RFP
                                </Link>
                              </div>
                            </div>
                          )}
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
                            {/* fetching data form the database and lisiting in table */}
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
                                    {data.status === "closed" ? (
                                      <span class="badge badge-pill badge-danger">
                                        Closed
                                      </span>
                                    ) : (
                                      <span class="badge badge-pill badge-success">
                                        Open
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    <Link
                                      to="/admin-quotes"
                                      title="View RPF Details"
                                      className="text-success"
                                      onClick={() => {
                                        applyData(data.id);
                                      }}
                                    >
                                      <i className="mdi mdi-eye"></i>
                                    </Link>
                                    {data.status === "closed" ? (
                                      ""
                                    ) : (
                                      <button
                                        title="Close RFP"
                                        className="text-danger"
                                        onClick={() => {
                                          closeRFP(data.id);
                                        }}
                                        style={{
                                          border: "none",
                                          background: "none",
                                        }}
                                      >
                                        <i className="mdi mdi-circle-off-outline"></i>
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>

                      {/* pagination component */}
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
                            of {getData && getData.rfps && getData.rfps.length}{" "}
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
                                        currentPage === i + 1 ? "active" : ""
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
                                  Math.ceil(getData.rfps.length / itemsPerPage)
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
        </div>
      ) : (
        <Navigate to="/vendor-dashboard" />
      )}
    </div>
  );
};

export default AdminRfp;
