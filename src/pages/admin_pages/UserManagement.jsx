import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.css";

//user management component
const UserManagement = () => {
  //state variable
  const [getData, setData] = useState([]);
  const token = localStorage.getItem("Authorization");
  const [approve, setApprove] = useState("");
  const [sortOption, setSortOption] = useState("");

  //pagination variable
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  //loader varaible
  const [isLoading, setIsLoading] = useState(true);

  //function to fetch the vendor list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("/Auth/vendorlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(data.data);

        setIsLoading(false); // Set isLoading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [approve]);

  //function to remove vendor
  const removeVendor = (user_id) => {
    //storing all data in form data
    const formData = new FormData();
    formData.append("user_id", Number(user_id));

    //sending data to backend server
    const remove = async () => {
      toast.warn("Removing");
      const data = await axios.post("/auth/removevendor", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //error message
      if (data.data.response == "error") {
        toast.error("Error in removing Vendor");
      }

      //success message
      if (data.data.response == "success") {
        setApprove("removed");
        toast.success("successfully removed Vendor");
      }
    };
    remove();
  };

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    getData && getData.vendors
      ? getData.vendors.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const type = localStorage.getItem("type");
  const sortVendors = () => {
    // Sort the vendor list based on the sortOption
    if (sortOption === "ascending") {
      setData((prevData) => ({
        ...prevData,
        vendors: prevData.vendors.sort((a, b) =>
          a.name.split(" ")[0].localeCompare(b.name.split(" ")[0])
        ),
      }));
      setSortOption("descending"); // Toggle to descending order after sorting ascendingly
    } else if (sortOption === "descending") {
      setData((prevData) => ({
        ...prevData,
        vendors: prevData.vendors.sort((a, b) =>
          b.name.split(" ")[0].localeCompare(a.name.split(" ")[0])
        ),
      }));
      setSortOption("ascending"); // Toggle to ascending order after sorting descendingly
    } else {
      // If sortOption is empty, set it to ascending
      setSortOption("ascending");
    }
  };

  // Logic to show the loader
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

  // main JSX component
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
                    <h4 class="mb-0 font-size-18">User Management</h4>

                    <div class="page-title-right">
                      <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item">
                          <a href="javascript: void(0);">Home</a>
                        </li>
                        <li class="breadcrumb-item active">Vendors</li>
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
                            <h4 class="card-title">Vendors</h4>
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
                              <th>S. No.</th>

                              {/* sorting function */}
                              <th
                                onClick={() => sortVendors()}
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                First name{" "}
                                {sortOption === "ascending" ? (
                                  <i className="fas fa-sort-up"></i>
                                ) : sortOption === "descending" ? (
                                  <i className="fas fa-sort-down"></i>
                                ) : (
                                  <i className="fas fa-sort"></i>
                                )}
                              </th>

                              <th>Last Name</th>
                              <th>Email</th>
                              <th>Contact No</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          {/* fetching data from the database and listing in table  */}
                          <tbody>
                            {currentItems.map((vendor, index) => (
                              <tr key={vendor.user_id}>
                                <th scope="row">
                                  {indexOfFirstItem + index + 1}
                                </th>
                                <td>{vendor.name.split(" ")[0]}</td>
                                <td>{vendor.name.split(" ")[1]}</td>
                                <td>{vendor.email}</td>
                                <td>{vendor.mobile}</td>
                                <td>
                                  {vendor.status === "Pending" ? (
                                    <span class="badge badge-pill badge-danger">
                                      Pending Approval
                                    </span>
                                  ) : (
                                    <span class="badge badge-pill badge-success">
                                      Active
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <button
                                    href="#"
                                    class="text-danger"
                                    title="Remove Vendor"
                                    style={{
                                      border: "0px",
                                      background: "none",
                                    }}
                                    onClick={() => removeVendor(vendor.user_id)}
                                  >
                                    <i class="mdi mdi-circle-off-outline"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* pagination componeny  */}
                      <div class="row pt-3">
                        <div class="col-sm-12 col-md-5">
                          <div
                            class="dataTables_info"
                            id="datatable_info"
                            role="status"
                            aria-live="polite"
                          >
                            {getData && getData.vendors
                              ? indexOfLastItem > getData.vendors.length
                                ? getData.vendors.length
                                : indexOfLastItem
                              : 0}{" "}
                            of{" "}
                            {getData && getData.vendors
                              ? getData.vendors.length
                              : 0}
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
                                getData.vendors &&
                                Array.from(
                                  {
                                    length: Math.ceil(
                                      getData.vendors.length / itemsPerPage
                                    ),
                                  },
                                  (v, i) => (
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
                                class={`paginate_button page-item ${
                                  currentPage ===
                                  Math.ceil(
                                    getData && getData.vendors
                                      ? getData.vendors.length / itemsPerPage
                                      : 0
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
        </div>
      ) : (
        <Navigate to="/vendor-dashboard" />
      )}
    </div>
  );
};

export default UserManagement;
