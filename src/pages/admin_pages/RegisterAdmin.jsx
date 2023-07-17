import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterAdmin = () => {
  // State variables for input
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [org, setOrg] = useState("");
  const [role, setRole] = useState("");

  // State variables for the error in input
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [resp, setResp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [orgError, setOrgError] = useState("");
  const [roleError, setRoleError] = useState("");

  // const [showCreateOrgForm, setShowCreateOrgForm] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");

  const [getData, setData] = useState("");

  // Function to fetch the categories on initialization of the app
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/Auth/tenants`
        );
        setData(response.data.tenant);
      } catch (error) {
        toast.error("Error fetching categories");
      }
    };

    fetchData();
  }, []);

  // Function to check the firstname input
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

  // Function to check the lastname input
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

  // Function to check the email input
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

  // Function to check the password input
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

  // Function to check the mobile number
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

  // Function to check the category input
  const handleOrganization = (e) => {
    e.preventDefault();
    const input = e.target.value;
    // if(input=="other")
    setOrg(input);
    setOrgError("");
  };

  // Function to check the role input
  const handleRole = (e) => {
    e.preventDefault();
    const input = e.target.value;
    // if(input=="other")
    setRole(input);
    setRoleError("");
  };

  // Function to handle the change in the input box for new organization name
  const handleNewOrgNameChange = (e) => {
    e.preventDefault();
    const input = e.target.value;
    setNewOrgName(input);
  };

  // Function to create a new organization
  const handleCreateOrganization = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/Auth/tenants`,
        { org_name: newOrgName }
      );
      if (response.data.response === "success") {
        toast.success("Organization created successfully.");
        // Fetch updated list of organizations after creating a new one
        const updatedDataResponse = await axios.get(
          `${process.env.REACT_APP_API}/Auth/tenants`
        );
        setData(updatedDataResponse.data.tenant);
        // Set the newly created organization as the selected option
        setOrg(response.data.org_id);
        // Hide the "Create New Organization" form after successful creation
        // setShowCreateOrgForm(false);
        // Clear the newOrgName input after successful creation
        setNewOrgName("");
      } else {
        toast.error("Failed to create organization.");
      }
    } catch (error) {
      toast.error("Error creating organization.");
    }
  };

  // Function to register the admin
  const handleRegister = (e) => {
    // Preventing page from reloading
    e.preventDefault();

    // Checking for password and same password are same
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    // Check if any mandatory field is empty
    if (!firstname || !email || !password || !mobile || !org || !role) {
      setFirstnameError(!firstname ? "First name is required" : "");
      setLastnameError(!lastname ? "Last name is required" : "");
      setEmailError(!email ? "Email is required" : "");
      setPasswordError(!password ? "Password is required" : "");
      setMobileError(!mobile ? "Mobile number is required" : "");
      setOrgError(!org ? "Organization is required" : "");
      setRoleError(!role ? "Role is required" : "");
      toast.error("Please fill in all the mandatory fields.");

      return;
    }

    // Storing all the input in form-data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("mobile", mobile);
    formData.append("type", "admin");
    formData.append("role", role);
    formData.append("org_id", org); // Pass the selected organization ID

    // Registering the admin
    const registerAdmin = async () => {
      toast.warn("Registering...");

      // Sending data to the backend to register admin
      const data = await axios.post(
        `${process.env.REACT_APP_API}/Auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Error message
      if (data.data.response === "error") {
        toast.error(data.data.error[0]);
      }

      // Success message
      if (data.data.response === "success") {
        toast.success("Registration Successful");
      }

      // Storing response in state variable
      setResp(data.data);
    };

    registerAdmin();
  };

  // Main JSX component
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
                                <label htmlFor="firstname">First name*</label>
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
                                <label htmlFor="lastname">
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
                                <label htmlFor="email">Email*</label>
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
                                <label htmlFor="password">Password*</label>
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
                                <label htmlFor="password">
                                  Confirm Password*
                                </label>
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
                                <label htmlFor="revenue">Phone No*</label>
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
                            <div className="col-md-12 col-lg-6 col-xl-6">
                              <div className="form-group">
                                <label htmlFor="Org_name">
                                  Organisation Name*
                                </label>
                                <select
                                  className="form-control"
                                  multiple
                                  id="Organisation"
                                  name="Organisation"
                                  onChange={handleOrganization}
                                >
                                  <option value="">All Organisation</option>
                                  {/* Mapping through the organizations */}
                                  {Object.entries(getData).map(
                                    ([id, organisation]) =>
                                      organisation.status === "active" && (
                                        <option
                                          key={id}
                                          value={organisation.id}
                                        >
                                          {organisation.org_name}
                                        </option>
                                      )
                                  )}
                                  {/* Adding "Other" option to create a new organization */}
                                  <option value="other">Other</option>
                                </select>
                                {orgError && (
                                  <span className="text-danger">
                                    {orgError}
                                  </span>
                                )}
                                {/* If "Other" option is selected, show the input box to create a new organization */}
                                {org === "other" && (
                                  <div className="mt-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Organization Name"
                                      value={newOrgName}
                                      onChange={handleNewOrgNameChange}
                                    />
                                    <button
                                      className="btn btn-primary mt-3"
                                      onClick={handleCreateOrganization}
                                    >
                                      Create Organization
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-md-12 col-lg-6 col-xl-6">
                              <div className="form-group">
                                <label htmlFor="Org_name">
                                  Organisation Name*
                                </label>
                                <select
                                  className="form-control"
                                  multiple
                                  id="role"
                                  name="role"
                                  onChange={handleRole}
                                >
                                  <option value="manager">manager</option>
                                  <option value="member">member</option>
                                </select>
                                {roleError && (
                                  <span className="text-danger">
                                    {roleError}
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
                        &copy; {new Date().getFullYear()}{" "}
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
