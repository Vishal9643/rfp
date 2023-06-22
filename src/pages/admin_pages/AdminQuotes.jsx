import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//admin quotes components
const AdminQuotes = () => {
  //state variable
  const [getData, setData] = useState("");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //loader state variable
  const [isLoading, setIsLoading] = useState(true);

  //storing token
  const token = localStorage.getItem("Authorization");

  //function to fetch the quotes
  useEffect(() => {
    const fetchData = async () => {
      const i = localStorage.getItem("quote");

      try {
        const response = await axios.get(`/Auth/rfp/getquotes/${i}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        //error message
        if (data.response === "error") {
          if (data.error) {
            toast.error(data.error);
          }
        }

        //storing respose in state variable
        setData(data);
        setIsLoading(false); // Set isLoading to false after data is fetched
      } catch (error) {
        //error message
        toast.error("Error retrieving quotes. Please try again later.");
      }
    };

    //function calling
    fetchData();
  }, []);

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    getData.response === "success" && getData.quotes
      ? getData.quotes.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const type = localStorage.getItem("type");

  const applyData = (apply) => {
    localStorage.setItem("quote", apply);
  };

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

  return (
    <div>
      <ToastContainer />
      {type === "admin" ? (
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0 font-size-18">RFP Quotes</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Quotes</a>
                        </li>
                        <li className="breadcrumb-item active">RFP Quotes</li>
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
                            <h4 className="card-title">RFP</h4>
                          </div>
                          <div className="col-lg-9 text-right">
                            <div className="headerButtons">
                              <Link
                                to="/admin-create-rfp"
                                className="btn btn-sm btn-success"
                              >
                                <i className="mdi mdi-plus"></i> Add RFP
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table
                          className="table mb-0 listingData dt-responsive"
                          id="datatable"
                        >
                          <thead>
                            <tr>
                              <th>S No.</th>
                              <th>RFP ID</th>
                              <th>Vendor ID</th>
                              <th>Name</th>
                              <th>Item Price</th>
                              <th>Quantity</th>
                              <th>Vendor Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getData.response === "error" ? (
                              <tr>
                                <td colSpan="5">No Quotes Available</td>
                              </tr>
                            ) : (
                              currentItems.map((data, index) => (
                                <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{data.id}</td>
                                  <td>{data.vendor_id}</td>
                                  <td>{data.name}</td>
                                  <td>{data.item_price}</td>
                                  <td>{data.quantity}</td>
                                  <td>{data.total_cost}</td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>

                      <div className="row pt-3">
                        <div className="col-sm-12 col-md-5">
                          <div
                            className="dataTables_info"
                            id="datatable_info"
                            role="status"
                            aria-live="polite"
                          >
                            Showing {indexOfFirstItem + 1} to{" "}
                            {Math.min(indexOfLastItem, getData.quotes?.length)}{" "}
                            of {getData.quotes?.length || 0} entries
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-7 dataTables_wrapper">
                          <div
                            className="dataTables_paginate paging_simple_numbers"
                            id="datatable_paginate"
                          >
                            <ul className="pagination">
                              <li
                                className={`paginate_button page-item previous ${
                                  currentPage === 1 ? "disabled" : ""
                                }`}
                                id="datatable_previous"
                              >
                                <a
                                  href="#"
                                  aria-controls="datatable"
                                  data-dt-idx="0"
                                  tabIndex="0"
                                  className="page-link"
                                  onClick={() => paginate(currentPage - 1)}
                                >
                                  Previous
                                </a>
                              </li>
                              {getData.quotes &&
                                Array.from(
                                  {
                                    length: Math.ceil(
                                      getData.quotes.length / itemsPerPage
                                    ),
                                  },
                                  (_, i) => (
                                    <li
                                      key={i}
                                      className={`paginate_button page-item ${
                                        currentPage === i + 1 ? "active" : ""
                                      }`}
                                    >
                                      <a
                                        href="#"
                                        aria-controls="datatable"
                                        data-dt-idx={i + 1}
                                        tabIndex="0"
                                        className="page-link"
                                        onClick={() => paginate(i + 1)}
                                      >
                                        {i + 1}
                                      </a>
                                    </li>
                                  )
                                )}
                              <li
                                className={`paginate_button page-item next ${
                                  currentPage ===
                                  Math.ceil(
                                    getData.quotes?.length / itemsPerPage
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
                                  tabIndex="0"
                                  className="page-link"
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
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0 font-size-18">RFP Quotes</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Quotes</a>
                        </li>
                        <li className="breadcrumb-item active">RFP Quotes</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">Error with backend</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuotes;
