import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { format } from "date-fns";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateRfp = () => {
  const [lastDate, setLastDate] = useState(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [minimum, setMinimum] = useState("");
  const [minimumError, setMinimumError] = useState("");
  const [maximum, setMaximum] = useState("");
  const [maximumError, setMaximumError] = useState("");
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("");
  const [RFP, setRFP] = useState("");

  //   const handleCategory = (e) => {
  //     setCategory(e.target.value);
  //   };
  const tempCategory = localStorage.getItem("selected-category");

  const handleRFP = (e) => {
    setRFP(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
    setCategory(tempCategory);
    // alert(typeof tempCategory);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };
  const handleMinimum = (e) => {
    setMinimum(e.target.value);
  };
  const handleMaximum = (e) => {
    setMaximum(e.target.value);
  };
  const handleVendor = (e) => {
    // toast.warn(`You have selected Vendor with user_id ${e.target.value}`);
    setVendor(e.target.value);
  };
  const token = localStorage.getItem("Authorization");
  const [vendorData, setVendorData] = useState([]);

  const handleCreateRfp = () => {
    if (
      !lastDate ||
      !name ||
      !description ||
      !quantity ||
      !minimum ||
      !maximum ||
      !vendor ||
      !category ||
      !RFP
    ) {
      toast.error("Please Fill all the required Field");
      return;
    }
    toast.warn("Creating RFP");

    const formattedLastDate = format(lastDate, "yyyy/MM/dd");
    const formData = new FormData();
    formData.append("item_name", name);
    formData.append("rfp_no", RFP);
    formData.append("quantity", Number(quantity));
    formData.append("last_date", formattedLastDate);
    formData.append("minimum_price", Number(minimum));
    formData.append("maximum_price", Number(maximum));
    formData.append("categories", tempCategory);
    formData.append("vendors", vendor);
    formData.append("item_description", description);

    const fetchData = async () => {
      const response = await axios.post(
        "http://localhost:4000/Auth/createrfp",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.response == "error") {
        toast.error("There is some problem in creating RFP");
      }
      if (response.data.response == "success") {
        toast.success("successfully created RFP");
      }
    };
    fetchData();
  };

  useEffect(() => {
    const fetchVendor = async () => {
      const response = await axios.get(
        "http://localhost:4000/Auth/vendorlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.vendors);
      const filteredVendors = response.data.vendors.filter(
        (vendor) => vendor.category === tempCategory
      );
      setVendorData(filteredVendors);
    };
    fetchVendor();
  }, []);

  const type = localStorage.getItem("type");
  const cancel = () => {
    window.history.back();
  };

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
                            <li class="breadcrumb-item active">RFP </li>
                            <li class="breadcrumb-item active">
                              Quotes Create
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
                                <h4 class="card-title">RFP</h4>
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            <form
                              className="form-horizontal"
                              action="dashboard.html"
                            >
                              <div className="form-group">
                                <label for="username">Item Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="vendor-Price"
                                  placeholder="Item Name"
                                  onChange={handleName}
                                />
                                {/* {nameError && (
                                <span className="text-danger">{nameError}</span>
                              )} */}
                              </div>
                              <div className="form-group">
                                <label for="username">Item Description</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Item-Description"
                                  placeholder="Item Description"
                                  onChange={handleDescription}
                                />
                                {/* {descriptionError && (
                                <span className="text-danger">
                                  {descriptionError}
                                </span>
                              )} */}
                              </div>
                              <div className="form-group">
                                <label for="username">Quantity</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Quantity"
                                  placeholder="Quantity"
                                  onChange={handleQuantity}
                                />
                                {/* {quantityError && (
                                <span className="text-danger">
                                  {quantityError}
                                </span>
                              )} */}
                              </div>
                              <div className="form-group">
                                <label htmlFor="lastDate">Last Date</label>
                                <DatePicker
                                  selected={lastDate}
                                  onChange={(date) => setLastDate(date)}
                                  className="form-control"
                                  id="lastDate"
                                  placeholderText="Select Last Date"
                                />
                                {/* {costError && (
                                <span className="text-danger">{costError}</span>
                              )} */}
                              </div>
                              <div className="form-group">
                                <label for="minimum">Minimum Price</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="minimum"
                                  placeholder="Minimum Price"
                                  onChange={handleMinimum}
                                />
                                {/* {minimumError && (
                                <span className="text-danger">
                                  {minimumError}
                                </span>
                              )} */}
                              </div>
                              <div className="form-group">
                                <label for="username">Maximum Price</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Quantity"
                                  placeholder="Quantity"
                                  onChange={handleMaximum}
                                />
                                {/* {maximumError && (
                                <span className="text-danger">
                                  {maximumError}
                                </span>
                              )} */}
                              </div>
                              <div className="form-group">
                                <label htmlFor="vendor">Vendor</label>
                                <select
                                  className="form-control"
                                  id="vendor"
                                  value={vendor}
                                  onChange={handleVendor}
                                >
                                  <option value="">Select Vendor</option>
                                  {vendorData &&
                                    vendorData.map((vendor) => (
                                      <option
                                        key={vendor.user_id}
                                        value={vendor.user_id}
                                      >
                                        {vendor.name}
                                      </option>
                                    ))}
                                </select>
                              </div>

                              {/* <div className="form-group">
                              <label for="username">Vendor</label>
                              <input
                                type="text"
                                className="form-control"
                                id="Vendor"
                                placeholder="Vendor"
                                onChange={handleVendor}
                              />
                            </div> */}
                              {/* <div className="form-group">
                                <label for="username">category</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Vendor"
                                  placeholder="Category"
                                  onChange={handleCategory}
                                />
                                {maximumError && (
                                <span className="text-danger">
                                  {maximumError}
                                </span>
                              )}
                              </div> */}
                              <div className="form-group">
                                <label for="username">RFP No</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Vendor"
                                  placeholder="RFP No"
                                  onChange={handleRFP}
                                />
                                {/* {maximumError && (
                                <span className="text-danger">
                                  {maximumError}
                                </span>
                              )} */}
                              </div>
                            </form>
                          </div>
                          <button
                            className="btn btn-primary"
                            onClick={handleCreateRfp}
                          >
                            Submit
                          </button>
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

export default CreateRfp;
