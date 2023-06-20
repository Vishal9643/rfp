import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterVendor = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [revenue, setRevenue] = useState("");
  const [no_of_employees, setNo_of_employees] = useState("");
  const [category, setCategory] = useState("");
  const [pancard_no, setPancard_no] = useState("");
  const [gst_no, setGst_no] = useState("");
  const [mobile, setMobile] = useState("");

  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [pancard_noError, setPancard_noError] = useState("");
  const [gst_noError, setGst_noError] = useState("");
  const [mobileError, setMobileError] = useState("");

  const [no_of_employeesError, setNo_of_employeesError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [revenueError, setRevenueError] = useState("");
  const [resp, setResp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [getData, setData] = useState("");

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

  const handleRevenue = (e) => {
    const input = e.target.value;
    const regex = /^[\w\s]+(,[\w\s]+)*$/; // Regex to validate password format (at least 8 characters, one uppercase, one lowercase, and one digit)
    if (regex.test(input)) {
      setRevenue(input);
      setRevenueError("");
    } else {
      setRevenueError("Invalid input");
    }
  };

  const handleEmployee = (e) => {
    const input = e.target.value;
    const regex = /^\d+$/; // Regex to allow only numeric input
    if (regex.test(input)) {
      setNo_of_employees(input);
      setNo_of_employeesError("");
    } else {
      setNo_of_employeesError("Invalid input");
    }
  };

  const handleCategory = (e) => {
    const input = e.target.value;
    const regex = /^[a-zA-Z0-9]*$/; // Regex to validate password format (at least 8 characters, one uppercase, one lowercase, and one digit)
    if (regex.test(input)) {
      setCategory(input);
      setCategoryError("");
    } else {
      setCategoryError("Invalid input");
    }
  };

  const handlePancard = (e) => {
    const input = e.target.value;
    const regex = /^[a-zA-Z0-9]*$/; // Regex to validate password format (at least 8 characters, one uppercase, one lowercase, and one digit)
    if (regex.test(input)) {
      setPancard_no(input);
      setPancard_noError("");
    } else {
      setPancard_noError("Invalid input");
    }
  };

  const handleGst = (e) => {
    const input = e.target.value;
    const regex = /^[a-zA-Z0-9]*$/; // Regex to validate password format (at least 8 characters, one uppercase, one lowercase, and one digit)
    if (regex.test(input)) {
      setGst_no(input);
      setGst_noError("");
    } else {
      setGst_noError("Invalid input");
    }
  };

  const handleMobile = (e) => {
    const input = e.target.value;
    const regex = /^[a-zA-Z0-9]*$/; // Regex to validate password format (at least 8 characters, one uppercase, one lowercase, and one digit)
    if (regex.test(input)) {
      setMobile(input);
      setMobileError("");
    } else {
      setMobileError("Invalid input");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    if (
      !firstname ||
      !email ||
      !password ||
      !revenue ||
      !no_of_employees ||
      !category ||
      !pancard_no ||
      !gst_no ||
      !mobile
    ) {
      // Check if any mandatory field is empty
      setFirstnameError(!firstname ? "First name is required" : "");
      setLastnameError(!lastname ? "Last name is required" : "");
      setEmailError(!email ? "Email is required" : "");
      setPasswordError(!password ? "Password is required" : "");
      setRevenueError(!revenue ? "Revenue is required" : "");
      setNo_of_employeesError(
        !no_of_employees ? "Number of employees is required" : ""
      );
      setCategoryError(!category ? "Category is required" : "");
      setPancard_noError(!pancard_no ? "PAN card number is required" : "");
      setGst_noError(!gst_no ? "GST number is required" : "");
      setMobileError(!mobile ? "Mobile number is required" : "");
      toast.error("Please fill in all the mandatory fields.");
      //   alert("Please fill in all the mandatory fields.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("revenue", revenue);
    formData.append("no_of_employees", Number(no_of_employees));
    formData.append("category", category);
    formData.append("pancard_no", pancard_no);
    formData.append("gst_no", gst_no);
    formData.append("mobile", mobile);
    formData.append("type", "vendor");

    const fetchData = async () => {
      toast.warn("Registering...");
      const data = await axios.post(
        "http://localhost:4000/Auth/register",
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
        toast.success("Registration Successful");
      }
      setResp(data.data);
    };

    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Auth/category`);
        setData(response.data.categories);
        console.log(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

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
                            <p>Regsiter as Vendor</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-body pt-0">
                      <div class="p-4">
                        <form class="form-horizontal" action="">
                          <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6">
                              <div class="form-group">
                                <label for="firstname">First name*</label>
                                <input
                                  type="text"
                                  class="form-control"
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
                            <div class="col-md-12 col-lg-6 col-xl-6">
                              <div class="form-group">
                                <label for="lastname">
                                  Last Name<em>*</em>
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
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

                            <div class="col-md-12 col-lg-6 col-xl-6">
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
                            <div class="col-md-12 col-lg-6 col-xl-6">
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

                            <div class="col-md-12 col-lg-6 col-xl-6">
                              <div class="form-group">
                                <label for="revenue">
                                  Revenue (Last 3 Years in Lacks)*
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="revenue"
                                  placeholder="Enter Revenue"
                                  onChange={handleRevenue}
                                />{" "}
                                {revenueError && (
                                  <span className="text-danger">
                                    {revenueError}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6">
                              <div class="form-group">
                                <label for="noofemployees">
                                  No of Employees*
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="noofemployees"
                                  placeholder="No of Employees"
                                  onChange={handleEmployee}
                                />
                                {no_of_employeesError && (
                                  <span className="text-danger">
                                    {no_of_employeesError}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div class="col-md-12 col-lg-6 col-xl-6">
                              <div class="form-group">
                                <label for="gstno">GST No*</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="gstno"
                                  placeholder="Enter GST No"
                                  onChange={handleGst}
                                />
                                {gst_noError && (
                                  <span className="text-danger">
                                    {gst_noError}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6">
                              <div class="form-group">
                                <label for="panno">PAN No*</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="panno"
                                  placeholder="Enter PAN No"
                                  onChange={handlePancard}
                                />
                                {pancard_noError && (
                                  <span className="text-danger">
                                    {pancard_noError}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div class="col-md-12 col-lg-6 col-xl-6">
                              <div class="form-group">
                                <label for="revenue">Phone No*</label>
                                <input
                                  type="text"
                                  class="form-control"
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
                            <div class="col-md-12 col-lg-6 col-xl-6">
                              <div class="form-group">
                                <label for="Categories">Categories*</label>
                                <select
                                  class="form-control"
                                  multiple
                                  id="Categories"
                                  name="Categories"
                                  onChange={handleCategory}
                                >
                                  <option value="">All Categories</option>
                                  {Object.entries(getData).map(
                                    ([id, category]) =>
                                      category.status === "active" && (
                                        <option key={id} value={id}>
                                          {category.name}
                                        </option>
                                      )
                                  )}
                                </select>
                                {categoryError && (
                                  <span className="text-danger">
                                    {categoryError}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div class="p-2 mt-3">
                              <button
                                class="btn btn-primary btn-block waves-effect waves-light"
                                type="button"
                                onClick={handleRegister}
                              >
                                Register
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

export default RegisterVendor;
