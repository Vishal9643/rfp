import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [resp, setResp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const location = useLocation();

  useEffect(() => {
    // alert("vishal");
    const currentPath = location.pathname; // Access the pathname property of location
    const token = currentPath.split("/")[2];
    setToken(token);
    // console.log(currentPath);
    console.log(token);
  }, []);

  const [getData, setData] = useState("");

  const handlePassword = (e) => {
    const input = e.target.value;
    const regex = /^[a-zA-Z0-9]*$/; // Regex to validate password format (at least 8 characters, one uppercase, one lowercase, and one digit)
    if (regex.test(input)) {
      setPassword(input);
      setPasswordError("");
    } else {
      setPasswordError("Invalid password");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    if (!password) {
      // Check if any mandatory field is empty
      setPasswordError(!password ? "Password is required" : "");
      toast.error("Please fill in all the mandatory fields.");
      //   alert("Please fill in all the mandatory fields.");
      return;
    }

    const formData = new FormData();
    formData.append("password", password);

    const fetchData = async () => {
      toast.warn("Changing Password...");
      const data = await axios.post(
        "https://rfp-backend.onrender.com/Auth/forget",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.data);
      if (data.data.response === "error") {
        toast.error(data.data.error);
      }
      if (data.data.response === "success") {
        toast.success("Password Changed Successfully");
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
                            <p>Change Password</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-body pt-0">
                      <div class="p-4">
                        <form class="form-horizontal" action="">
                          <div class="row">
                            <div class="col-12">
                              <div class="form-group">
                                <label for="password">Password*</label>
                                <input
                                  type="password"
                                  class="form-control"
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
                            <div class="col-12">
                              <div class="form-group">
                                <label for="password">Confirm Password*</label>
                                <input
                                  type="password"
                                  class="form-control"
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

                            <div class="col-12">
                              <button
                                class="btn btn-primary btn-block waves-effect waves-light"
                                type="button"
                                onClick={handleRegister}
                                style={{ width: "100%" }}
                              >
                                Change Password
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

export default ResetPassword;
