import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import VendorSidebar from "../components/VendorSidebar";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RfpApply = () => {
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [cost, setCost] = useState("");
  const [costError, setCostError] = useState("");
  const [getData, setData] = useState("");
  const token = localStorage.getItem("Authorization");
  const apply = localStorage.getItem("apply");
  const formData = new FormData();
  formData.append("item_price", Number(price));
  formData.append("total_cost", Number(cost));

  const handleApply = (e) => {
    e.preventDefault();
    if (!price || !cost || !description || !quantity) {
      // Check if any mandatory field is empty
      toast.error("Please fill in all the mandatory fields.");
      return;
    }

    const fetchData = async () => {
      const data = await axios.post(
        `https://rfp-backend.onrender.com/Auth/applyrfp/${apply}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.data.response == "error") {
        toast.error("problem in applying RFP");
      }
      if (data.data.response == "success") {
        toast.success("successfuly applied RFP");
      }
      console.log(data.data);
      setData(data.data);
    };

    fetchData();
  };

  const handlePrice = (e) => {
    const input = e.target.value;
    const regex = /^\d+$/; // Regex to allow only numeric input
    if (regex.test(input)) {
      setPrice(input);
      setPriceError("");
    } else {
      setPriceError("Invalid input");
    }
  };

  const handleDescription = (e) => {
    const input = e.target.value;
    const regex = /^[a-zA-Z0-9]*$/; // Regex to validate password format (at least 8 characters, one uppercase, one lowercase, and one digit)
    if (regex.test(input)) {
      setDescription(input);
      setDescriptionError("");
    } else {
      setDescriptionError("Invalid input");
    }
  };

  const handleQuantity = (e) => {
    const input = e.target.value;
    const regex = /^[a-zA-Z0-9]*$/; // Regex to validate password format (at least 8 characters, one uppercase, one lowercase, and one digit)
    if (regex.test(input)) {
      setQuantity(input);
      setQuantityError("");
    } else {
      setQuantityError("Invalid input");
    }
  };

  const handleCost = (e) => {
    const input = e.target.value;
    const regex = /^\d+$/; // Regex to allow only numeric input
    if (regex.test(input)) {
      setCost(input);
      setCostError("");
    } else {
      setCostError("Invalid input");
    }
  };

  console.log(getData);
  const type = localStorage.getItem("type");

  const cancel = () => {
    window.history.back();
  };

  return (
    <div>
      <ToastContainer />
      {type == "vendor" ? (
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
                                <label for="username">Vendor Price</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="vendor-Price"
                                  placeholder="Vendor Price"
                                  onChange={handlePrice}
                                />
                                {priceError && (
                                  <span className="text-danger">
                                    {priceError}
                                  </span>
                                )}
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
                                {descriptionError && (
                                  <span className="text-danger">
                                    {descriptionError}
                                  </span>
                                )}
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
                                {quantityError && (
                                  <span className="text-danger">
                                    {quantityError}
                                  </span>
                                )}
                              </div>
                              <div className="form-group">
                                <label for="username">Total Cost</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="total-cost"
                                  placeholder="Total Cost"
                                  onChange={handleCost}
                                />
                                {costError && (
                                  <span className="text-danger">
                                    {costError}
                                  </span>
                                )}
                              </div>
                            </form>
                          </div>
                          <button
                            className="btn btn-primary"
                            onClick={handleApply}
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
        <Navigate to="/admin-dashboard" />
      )}
    </div>
  );
};

export default RfpApply;
