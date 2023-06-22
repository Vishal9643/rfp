import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterAdmin = () => {
  //state variable for input
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  //state variable for the error in input
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [resp, setResp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [getData, setData] = useState("");

  //function to check the firstname input
  const handleFirstName = (e) => {
    const input = e.target.value;
    const regex = /^[A-Za-z]+$/; // Regex to allow only alphabetic characters
    if (regex.test(input)) {
      setFirstname(input);
      setFirstnameError("");
    } else {
      setFirstnameError("Invalid input");
    }
  };

  //function to check the lastname input
  const handleLastName = (e) => {
    const input = e.target.value;
    const regex = /^[A-Za-z]+$/; // Regex to allow only alphabetic characters
    if (regex.test(input)) {
      setLastname(input);
      setLastnameError("");
    } else {
      setLastnameError("Invalid input");
    }
  };

  //function to check the email input
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

  //function to check the password input
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

  //function to check the mobile number
  const handleMobile = (e) => {
    const input = e.target.value;
    const regex = /^(\+?91|0)?[6789]\d{9}$/; // Regex to validate Indian mobile number format
    if (regex.test(input)) {
      setMobile(input);
      setMobileError("");
    } else {
      setMobileError("Invalid input");
    }
  };

  //function to register the admin
  const handleRegister = (e) => {
    //preventing page from reloading
    e.preventDefault();

    //checking for password and same password are same
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    // Check if any mandatory field is empty
    if (!firstname || !email || !password || !mobile) {
      setFirstnameError(!firstname ? "First name is required" : "");
      setLastnameError(!lastname ? "Last name is required" : "");
      setEmailError(!email ? "Email is required" : "");
      setPasswordError(!password ? "Password is required" : "");
      setMobileError(!mobile ? "Mobile number is required" : "");
      toast.error("Please fill in all the mandatory fields.");
      return;
    }

    //Storing all the input in form-data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("mobile", mobile);
    formData.append("type", "admin");

    //registering the admin
    const registerAdmin = async () => {
      toast.warn("Registering...");

      //sending data to the backend to register admin
      const data = await axios.post("/Auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //error message
      if (data.data.response === "error") {
        toast.error(data.data.error);
      }

      //success message
      if (data.data.response === "success") {
        toast.success("Registration Successful");
      }

      //storing response in state variable
      setResp(data.data);
    };

    registerAdmin();
  };

  //main JSX component
  return (
    <>
      <ToastContainer />
      {resp.response === "success" ? (
        <Navigate to="/" />
      ) : (
        <div>
          <div className="home-btn d-none d-sm-block"></div>
          <div className="account-pages my-5 pt-sm-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-8">
                  <div className="card overflow-hidden">
                    <div className="bg-soft-primary">
                      <div className="row">
                        <div className="col-12">
                          <div className="text-primary p-4">
                            <h5 className="text-primary">
                              Welcome to RFP System!
                            </h5>
                            <p>Regsiter as Admin</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body pt-0">
                      <div className="p-4">
                        <form className="form-horizontal" action="">
                          <div className="row">
                            <div className="col-12">
                              <div className="form-group">
                                <label for="firstname">First name*</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="firstname"
                                  placeholder="Enter Firstname"
                                  onChange={handleFirstName}
                                />
                                {firstnameError && (
                                  <span className="text-danger">
                                    {firstnameError}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label for="lastname">
                                  Last Name<em>*</em>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="lastname"
                                  placeholder="Enter Lastname"
                                  onChange={handleLastName}
                                />
                                {lastnameError && (
                                  <span className="text-danger">
                                    {lastnameError}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label for="email">Email*</label>
                                <input
                                  type="text"
                                  className="form-control"
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

                            <div className="col-12">
                              <div className="form-group">
                                <label for="password">Password*</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="password"
                                  placeholder="Enter Password"
                                  onChange={handlePassword}
                                />
                                {passwordError && (
                                  <span className="text-danger">
                                    {passwordError}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label for="password">Confirm Password*</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="confirmpassword"
                                  placeholder="Enter Confirm Password"
                                  value={confirmPassword}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                />
                                {confirmPasswordError && (
                                  <span className="text-danger">
                                    {confirmPasswordError}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="form-group">
                                <label for="revenue">Phone No*</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="revenue"
                                  placeholder="Enter Phone No"
                                  onChange={handleMobile}
                                />
                                {mobileError && (
                                  <span className="text-danger">
                                    {mobileError}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="col-12">
                              <button
                                className="btn btn-primary btn-block waves-effect waves-light"
                                type="button"
                                onClick={handleRegister}
                                style={{ width: "100%" }}
                              >
                                Register
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <div>
                      <p>
                        &copy; Copyright{" "}
                        <i className="mdi mdi-heart text-danger"></i> RFP System
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

export default RegisterAdmin;
