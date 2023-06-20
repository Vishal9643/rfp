import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [resp, setResp] = useState("");
  const [getData, setData] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmail = (e) => {
    const input = e.target.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to validate email format
    if (regex.test(input)) {
      setEmail(input);
      setEmailError("");
    } else {
      setEmailError("Invalid email");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email) {
      // Check if any mandatory field is empty

      setEmailError(!email ? "Email is required" : "");
      toast.error("Please fill in all the mandatory fields.");
      //   alert("Please fill in all the mandatory fields.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    const fetchData = async () => {
      toast.warn("Sending Link to registered Mail...");
      const data = await axios.post(
        "https://rfp-backend.onrender.com/Auth/reset",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.data);
      if (data.data.response === "error") {
        toast.error(data.data.error);
      }
      if (data.data.response === "success") {
        toast.success("Link send on registered mail");
      }
      setResp(data.data);
    };

    fetchData();
  };

  return (
    <>
      <ToastContainer />
      {resp.response === "success" ? (
        <Navigate to="/" />
      ) : (
        <div>
          <div class="home-btn d-none d-sm-block">
            <a href="index.html" class="text-dark">
              <i class="fas fa-home h2"></i>
            </a>
          </div>
          <div class="account-pages my-5 pt-sm-5">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-8">
                  <div class="card overflow-hidden">
                    <div class="bg-soft-primary">
                      <div class="row">
                        <div class="col-12">
                          <div class="text-primary p-4">
                            <h5 class="text-primary">Welcome to RFP System!</h5>
                            <p>Forget Password</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-body pt-0">
                      <div class="p-4">
                        <form class="form-horizontal" action="">
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="email">Email*</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="email"
                                  placeholder="Enter Email"
                                  onChange={handleEmail}
                                />
                                {emailError && (
                                  <span className="text-danger">
                                    {emailError}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div class="col-12">
                              <button
                                class="btn btn-primary btn-block waves-effect waves-light"
                                type="button"
                                onClick={handleRegister}
                                style={{ width: "100%" }}
                              >
                                Forget Password
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="mt-5 text-center">
                    <div>
                      <p>
                        &copy; Copyright{" "}
                        <i class="mdi mdi-heart text-danger"></i> RFP System
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetPassword;
