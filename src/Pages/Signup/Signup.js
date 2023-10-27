import React, { useState } from "react";
import "./Signup.css";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";

// Image
import logo from "../../Assets/brand-logo.svg";
import Input from "../Shared/Input/Input";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  });
  // console.log(formData, "formData");

  const [formError, setFormError] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  });

  // const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setFormError((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // The form is valid, proceed with registration
      try {
        const response = await fetch(
          "http://localhost:4000/user/api/userSignup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          const data = await response.json();

          navigate("/login");
          // Handle success, e.g., redirect to a success page
        } else {
          // Handle error, e.g., display an error message
          alert("User already exists");
          console.error("Sign-up failed");
        }
      } catch (error) {
        console.error(error);
        alert("Sign-up failed");
      }
    }
  };

  const validateForm = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    let isValid = true;

    // Enter Email validation
    if (!formData.email) {
      setFormError((prevState) => ({
        ...prevState,
        email: "Please enter a valid email address.",
      }));
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      setFormError((prevState) => ({
        ...prevState,
        email: "Invalid email format.",
      }));
      isValid = false;
    }

    // Enter Phone number validation
    if (!formData.phoneNumber) {
      setFormError((prevState) => ({
        ...prevState,
        phoneNumber: "Please enter a phone number.",
      }));
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      setFormError((prevState) => ({
        ...prevState,
        phoneNumber: "Please enter a 10-digit phone number.",
      }));
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      setFormError((prevState) => ({
        ...prevState,
        password: "Password must contain at least 8 characters.",
      }));
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      setFormError((prevState) => ({
        ...prevState,
        password:
          "Password must contain at least one uppercase letter, lowercase letter, and numeric digit.",
      }));
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      setFormError((prevState) => ({
        ...prevState,
        confirmPassword: "Please confirm your password.",
      }));
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      setFormError((prevState) => ({
        ...prevState,
        confirmPassword: "Password and Confirm Password must match.",
      }));
      isValid = false;
    }

    return isValid;
  };

  return (
    <div className="Signup-page-os">
      <div className="container-os">
        <form
          className="login-form-os"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h1>
            <span>
              <img src={logo} alt="" />
            </span>
            Create account
          </h1>

          {/* <div className="signup__field">
            <input
              className="signup__input"
              type="text"
              name="fullName"
              id="fullName"
              required
              onChange={handleInputChange}
              placeholder="Enter Your Username"
            />
          </div> */}
          <div className="input-col-os">
            <Input
              type="text"
              name="fullName"
              // required="required"
              onChange={handleInputChange}
              placeholder="Enter Your Username"
            />
          </div>

          {/* <div className="signup__field">
            <input
              className="signup__input"
              type="text"
              name="email"
              id="email"
              required
              onChange={handleInputChange}
              placeholder=" Enter Your Email"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div> */}

          <div className="input-col-os">
            <Input
              type="text"
              name="email"
              // required="required"
              onChange={handleInputChange}
              placeholder="Enter Your Email"
            />
            {formError.email && (
              <p className="error-message-os pt-1">{formError.email}</p>
            )}
          </div>

          {/* <div className="signup__field">
            <input
              className="signup__input"
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              required
              onChange={handleInputChange}
              placeholder=" Enter Your Phone Number"
            />
            {errors.phoneNumber && (
              <p className="error-message">{errors.phoneNumber}</p>
            )}
          </div> */}
          <div className="input-col-os">
            <Input
              type="number"
              name="phoneNumber"
              // required="required"
              onChange={handleInputChange}
              placeholder="Enter Your Phone Number"
            />
            {formError.phoneNumber && (
              <p className="error-message-os pt-1">{formError.phoneNumber}</p>
            )}
          </div>

          {/* <div className="signup__field">
            <input
              className="signup__input"
              type="password"
              name="password"
              id="password"
              required
              onChange={handleInputChange}
              placeholder="Enter Your Password"
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div> */}
          <div className="input-col-os">
            <Input
              type="password"
              name="password"
              // required="required"
              onChange={handleInputChange}
              placeholder="Enter Your Password"
            />
            {formError.password && (
              <p className="error-message-os pt-1">{formError.password}</p>
            )}
          </div>

          {/* <div className="signup__field">
            <input
              className="signup__input"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              onChange={handleInputChange}
              placeholder="Confirm Your Password"
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div> */}
          <div className="input-col-os">
            <Input
              type="password"
              name="confirmPassword"
              // required="required"
              onChange={handleInputChange}
              placeholder="Confirm Your Password"
            />
            {formError.confirmPassword && (
              <p className="error-message-os pt-1">
                {formError.confirmPassword}
              </p>
            )}
          </div>

          {/* <h2>
            Already have an account? <span onClick={handleSignIn}>Sign in</span>
          </h2> */}
          <div className="note-message-os pb-4"><span>Note : </span>
            Password must contain at least one uppercase letter, lowercase
            letter, and numeric digit.
          </div>

          <button type="submit">Sign up</button>

          <div className="signup-link-os">
            <p>
              Already have an account?
              <Link to="/login">Login in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
