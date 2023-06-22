import React, { useState } from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/icons.min.css";
import "../../assets/css/app.min.css";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/preloader.css";

const Login = () => {
  // State variables to store form input values and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [resp, setResp] = useState("");

  // Handler for email input change
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

  // Handler for password input change
  const handlePassword = (e) => {
    const input = e.target.value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*]).{8,}$/;
    if (regex.test(input)) {
      setPassword(input);
      setPasswordError("");
    } else {
      setPasswordError(
        "Invalid password, Password must be of 8 Characters and must contain one special character, one Uppercase and one Lower case letter and one number"
      );
    }
  };

  // Handler for login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      // Check if any mandatory field is empty
      setEmailError("Email is required");

      setPasswordError("Password is required");
      toast.error("Please fill in all the mandatory fields.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    toast.warn("Logging in");

    const fetchData = async () => {
      try {
        const data = await axios.post("/Auth/login", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        localStorage.setItem("Name", data.data.name);
        localStorage.setItem("type", data.data.type);
        localStorage.setItem("Authorization", data.data.token);
        localStorage.setItem("user_id", data.data.user_id);
        setResp(data.data);
        console.log(data.data);
        if (data.data.response === "error") {
          toast.error(data.data.error);
        }
        if (Array.isArray(data.data.error)) {
          toast.error(data.data.error[0]);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    };

    fetchData();
  };

  return (
    <>
      <ToastContainer />

      {resp.response === "success" ? (
        // If login is successful, navigate to the appropriate dashboard based on user type
        <>
          {resp.type === "admin" ? (
            <Navigate to="/admin-dashboard" />
          ) : (
            <Navigate to="/vendor-dashboard" />
          )}
        </>
      ) : (
        // If login is unsuccessful, display the login form
        <div>
          <div className="home-btn d-none d-sm-block"></div>
          <div className="account-pages my-5 pt-sm-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-5">
                  <div className="card overflow-hidden">
                    <div className="bg-soft-primary">
                      <div className="row">
                        <div className="col-12">
                          <div className="text-primary p-4">
                            <h5 className="text-primary">
                              Welcome to RFP System!
                            </h5>
                            <p>Sign in to continue</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body pt-0">
                      <div className="p-2">
                        <form
                          className="form-horizontal"
                          action="dashboard.html"
                        >
                          <div className="form-group">
                            <label htmlFor="username">Email</label>
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              placeholder="Enter Email"
                              onChange={handleEmail}
                            />
                            {emailError && (
                              <span className="text-danger">{emailError}</span>
                            )}
                          </div>

                          <div className="form-group">
                            <label htmlFor="userpassword">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="userpassword"
                              placeholder="Enter password"
                              onChange={handlePassword}
                            />
                            {passwordError && (
                              <span className="text-danger">
                                {passwordError}
                              </span>
                            )}
                          </div>

                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customControlInline"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customControlInline"
                            >
                              Remember me
                            </label>
                          </div>

                          <div className="mt-3">
                            <button
                              className="btn btn-primary btn-block waves-effect waves-light"
                              type="button"
                              onClick={handleLogin}
                            >
                              Log In
                            </button>
                          </div>

                          <div className="mt-4 text-center">
                            <h5 className="font-size-14 mb-3">Sign in with</h5>

                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <a
                                  href="javascript::void()"
                                  className="social-list-item bg-primary text-white border-primary"
                                >
                                  <i className="mdi mdi-facebook"></i>
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a
                                  href="javascript::void()"
                                  className="social-list-item bg-info text-white border-info"
                                >
                                  <i className="mdi mdi-twitter"></i>
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a
                                  href="javascript::void()"
                                  className="social-list-item bg-danger text-white border-danger"
                                >
                                  <i className="mdi mdi-google"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="mt-4 text-center">
                            <Link
                              to="/vendor-registration"
                              className="text-muted"
                            >
                              <i className="mdi mdi-lock mr-1"></i> Register as
                              Vendor
                            </Link>
                          </div>
                          <div className="mt-4 text-center">
                            <Link
                              to="/admin-registration"
                              className="text-muted"
                            >
                              <i className="mdi mdi-lock mr-1"></i> Register as
                              Admin
                            </Link>
                          </div>
                          <div className="mt-4 text-center">
                            <Link to="/forget-password" className="text-muted">
                              <i className="mdi mdi-lock mr-1"></i> Forgot your
                              password?
                            </Link>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <div>
                      <p>
                        &copy; <i className="mdi mdi-heart text-danger"></i> RFP
                        System
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

export default Login;
