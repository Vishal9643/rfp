import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  //state value of input
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //state value for error
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  //state value to store the respone
  const [resp, setResp] = useState("");

  //state variable to store token
  const [token, setToken] = useState("");

  //state variable to get the access token from url
  const location = useLocation();
  const [getData, setData] = useState("");

  //function to get the access token from url
  useEffect(() => {
    const currentPath = location.pathname; // Access the pathname property of location
    const token = currentPath.split("/")[2];
    setToken(token);
  }, []);

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

  //function to change the password
  const changePassword = (e) => {
    //prevent from reloading page
    e.preventDefault();

    //matching password and confirm password
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    //checking if mandatory field is empty
    if (!password) {
      setPasswordError(!password ? "Password is required" : "");
      toast.error("Please fill in all the mandatory fields.");

      return;
    }

    //storing all input data in form-data
    const formData = new FormData();
    formData.append("password", password);

    //sending data to backend
    const sendData = async () => {
      toast.warn("Changing Password...");
      const data = await axios.post("/Auth/forget", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //error message
      if (data.data.response === "error") {
        toast.error(data.data.error);
      }

      //success message
      if (data.data.response === "success") {
        toast.success("Password Changed Successfully");
      }

      //storing the response in state variable
      setResp(data.data);
    };

    //function calling
    sendData();
  };

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
                            <p>Change Password</p>
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
                              <button
                                className="btn btn-primary btn-block waves-effect waves-light"
                                type="button"
                                onClick={changePassword}
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

export default ResetPassword;
