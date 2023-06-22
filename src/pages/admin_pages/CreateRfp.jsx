import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { format } from "date-fns";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

//create rfp component
const CreateRfp = () => {
  //state variable
  const [lastDate, setLastDate] = useState(null);
  const [vendor, setVendor] = useState("");
  const [vendorData, setVendorData] = useState([]);

  //category
  const category = localStorage.getItem("selected-category");

  //storing token
  const token = localStorage.getItem("Authorization");

  //function to create rfp
  const handleCreateRfp = () => {
    const {
      lastDate,
      name,
      description,
      quantity,
      minimum,
      maximum,
      vendor,
      RFP,
    } = formik.values;

    //check for mandatory field
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
      //error message
      toast.error("Please Fill all the required Field");
      return;
    }
    //cretae message
    toast.warn("Creating RFP");

    //storing all input data in form data
    const formattedLastDate = format(lastDate, "yyyy/MM/dd");
    const formData = new FormData();
    formData.append("item_name", name);
    formData.append("rfp_no", RFP);
    formData.append("quantity", Number(quantity));
    formData.append("last_date", formattedLastDate);
    formData.append("minimum_price", Number(minimum));
    formData.append("maximum_price", Number(maximum));
    formData.append("categories", category);
    formData.append("vendors", vendor);
    formData.append("item_description", description);

    //sending data to backend
    const createRFPData = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/Auth/createrfp`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //error message
      if (response.data.response == "error") {
        toast.error("There is some problem in creating RFP");
      }

      //success message
      if (response.data.response == "success") {
        toast.success("successfully created RFP");
      }
    };

    //function calling
    createRFPData();
  };

  //form validation using formik
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      quantity: "",
      lastDate: null,
      minimum: "",
      maximum: "",
      vendor: "",
      RFP: "",
    },
    // Validation rules for form fields
    validationSchema: Yup.object({
      name: Yup.string().required("Item Name is required"),
      description: Yup.string().required("Item Description is required"),
      quantity: Yup.number()
        .typeError("Quantity must be a number")
        .required("Quantity is required"),
      lastDate: Yup.date()
        .nullable()
        .required("Last Date is required")
        .min(new Date(), "Last Date cannot be in the past"),
      minimum: Yup.number()
        .typeError("Minimum Price must be a number")
        .required("Minimum Price is required"),
      maximum: Yup.number()
        .typeError("Maximum Price must be a number")
        .required("Maximum Price is required"),
      vendor: Yup.string().required("Vendor is required"),
      RFP: Yup.string().required("RFP No is required"),
    }),
  });

  //function to get vendor list
  useEffect(() => {
    const fetchVendor = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/Auth/vendorlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.vendors);
      const filteredVendors = response.data.vendors.filter(
        (vendor) => vendor.category === category
      );
      setVendorData(filteredVendors);
    };
    fetchVendor();
  }, []);

  const type = localStorage.getItem("type");

  //function for cancel button
  const cancel = () => {
    window.history.back();
  };

  //main JSX component
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
                    <h4 class="mb-0 font-size-18">RFP Create</h4>
                    <div class="page-title-right">
                      <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item">
                          <a href="javascript: void(0);">Home</a>
                        </li>
                        <li class="breadcrumb-item active">RFP </li>
                        <li class="breadcrumb-item active">Quotes Create</li>
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
                        {/* form to take all the required input  */}
                        <form
                          className="form-horizontal"
                          onSubmit={formik.handleSubmit}
                        >
                          <div className="form-group">
                            <label for="username">Item Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="vendor-Price"
                              placeholder="Item Name"
                              {...formik.getFieldProps("name")}
                            />
                            {formik.touched.name && formik.errors.name && (
                              <span className="text-danger">
                                {formik.errors.name}
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
                              {...formik.getFieldProps("description")}
                            />
                            {formik.touched.description &&
                              formik.errors.description && (
                                <span className="text-danger">
                                  {formik.errors.description}
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
                              {...formik.getFieldProps("quantity")}
                            />
                            {formik.touched.quantity &&
                              formik.errors.quantity && (
                                <span className="text-danger">
                                  {formik.errors.quantity}
                                </span>
                              )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="lastDate">Last Date</label>
                            <DatePicker
                              selected={formik.values.lastDate || null}
                              onChange={(date) => {
                                formik.setFieldValue("lastDate", date);
                              }}
                              className="form-control"
                              id="lastDate"
                              placeholderText="Select Last Date"
                              minDate={new Date()} // Set minimum date to today
                            />
                            {formik.touched.lastDate &&
                              formik.errors.lastDate && (
                                <span className="text-danger">
                                  {formik.errors.lastDate}
                                </span>
                              )}
                          </div>
                          <div className="form-group">
                            <label for="minimum">Minimum Price</label>
                            <input
                              type="text"
                              className="form-control"
                              id="minimum"
                              placeholder="Minimum Price"
                              {...formik.getFieldProps("minimum")}
                            />
                            {formik.touched.minimum &&
                              formik.errors.minimum && (
                                <span className="text-danger">
                                  {formik.errors.minimum}
                                </span>
                              )}
                          </div>
                          <div className="form-group">
                            <label for="username">Maximum Price</label>
                            <input
                              type="text"
                              className="form-control"
                              id="Quantity"
                              placeholder="Quantity"
                              {...formik.getFieldProps("maximum")}
                            />
                            {formik.touched.maximum &&
                              formik.errors.maximum && (
                                <span className="text-danger">
                                  {formik.errors.maximum}
                                </span>
                              )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="vendor">Vendor</label>
                            <select
                              className="form-control"
                              id="vendor"
                              value={vendor}
                              {...formik.getFieldProps("vendor")}
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
                            {formik.touched.vendor && formik.errors.vendor && (
                              <span className="text-danger">
                                {formik.errors.vendor}
                              </span>
                            )}
                          </div>

                          <div className="form-group">
                            <label for="username">RFP No</label>
                            <input
                              type="text"
                              className="form-control"
                              id="Vendor"
                              placeholder="RFP No"
                              {...formik.getFieldProps("RFP")}
                            />
                            {formik.touched.RFP && formik.errors.RFP && (
                              <span className="text-danger">
                                {formik.errors.RFP}
                              </span>
                            )}
                          </div>

                          {/* submit button  */}
                          <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={handleCreateRfp}
                          >
                            Submit
                          </button>

                          {/* cancel button  */}
                          <button
                            className="btn btn-danger"
                            onClick={cancel}
                            style={{ marginLeft: "10px" }}
                          >
                            Cancel
                          </button>
                        </form>
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

export default CreateRfp;
