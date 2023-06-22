import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RfpApply = () => {
  //state variable
  const [getData, setData] = useState("");

  //storing authorization token
  const token = localStorage.getItem("Authorization");
  const apply = localStorage.getItem("apply");

  //function to apply in rfp
  const handleApply = (values) => {
    const { price, cost, description, quantity } = values;

    //storing all input in a form data
    const formData = new FormData();
    formData.append("item_price", Number(price));
    formData.append("total_cost", Number(cost));
    formData.append("quantity", quantity);

    //sending data to backend server
    const fetchData = async () => {
      const data = await axios.post(`/Auth/applyrfp/${apply}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // error message
      if (data.data.response === "error") {
        toast.error(`${data.data.error}`);
      }

      //success messgae
      if (data.data.response === "success") {
        toast.success("Successfully applied RFP");
      }
      //storing response in state variable
      setData(data.data);
    };

    fetchData();
  };

  //function for cancel
  const cancel = () => {
    window.history.back();
  };

  const type = localStorage.getItem("type");

  //main JSX component
  return (
    <div>
      <ToastContainer />
      {type === "vendor" ? (
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
                        {/* form validation using formik  */}
                        <Formik
                          initialValues={{
                            price: "",
                            description: "",
                            quantity: "",
                            cost: "",
                          }}
                          validationSchema={Yup.object({
                            price: Yup.number()
                              .required("Vendor Price is required")
                              .positive(
                                "Vendor Price must be a positive number"
                              ),
                            description: Yup.string().required(
                              "Item Description is required"
                            ),
                            quantity: Yup.number()
                              .required("Quantity is required")
                              .positive("Quantity must be a positive number"),
                            cost: Yup.number()
                              .required("Total Cost is required")
                              .positive("Total Cost must be a positive number"),
                          })}
                          onSubmit={handleApply}
                        >
                          {/* form to collect all the input from the vendor  */}
                          <Form
                            className="form-horizontal"
                            action="dashboard.html"
                          >
                            <div className="form-group">
                              <label htmlFor="vendor-Price">Vendor Price</label>
                              <Field
                                type="text"
                                className="form-control"
                                id="vendor-Price"
                                name="price"
                                placeholder="Vendor Price"
                              />
                              <ErrorMessage
                                name="price"
                                component="span"
                                className="text-danger"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="Item-Description">
                                Item Description
                              </label>
                              <Field
                                type="text"
                                className="form-control"
                                id="Item-Description"
                                name="description"
                                placeholder="Item Description"
                              />
                              <ErrorMessage
                                name="description"
                                component="span"
                                className="text-danger"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="Quantity">Quantity</label>
                              <Field
                                type="text"
                                className="form-control"
                                id="Quantity"
                                name="quantity"
                                placeholder="Quantity"
                              />
                              <ErrorMessage
                                name="quantity"
                                component="span"
                                className="text-danger"
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="total-cost">Total Cost</label>
                              <Field
                                type="text"
                                className="form-control"
                                id="total-cost"
                                name="cost"
                                placeholder="Total Cost"
                              />
                              <ErrorMessage
                                name="cost"
                                component="span"
                                className="text-danger"
                              />
                            </div>

                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={cancel}
                              style={{ marginLeft: "10px" }}
                            >
                              Cancel
                            </button>
                          </Form>
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/admin-dashboard" />
      )}
    </div>
  );
};

export default RfpApply;
