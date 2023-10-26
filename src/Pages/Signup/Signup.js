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
  console.log(formData, "formData");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
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

          // setFormData({
          //   fullName: "",
          //   email: "",
          //   password: "",
          //   phoneNumber: "",
          //   confirmPassword: "",
          // });

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
    const newErrors = {};

    // Email validation (simple format validation)
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone number validation (simple format validation)
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
    }

    // Password validation (customize the regex pattern to match your criteria)
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
      newErrors.password = "Password must match your criteria"; // Update the error message
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
            {errors.email && <p className="error-message-os">{errors.email}</p>}
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
              type="text"
              name="phoneNumber"
              // required="required"
              onChange={handleInputChange}
              placeholder="Enter Your Phone Number"
            />
            {errors.phoneNumber && (
              <p className="error-message-os">{errors.phoneNumber}</p>
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
            {errors.password && (
              <p className="error-message-os">{errors.password}</p>
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
            {errors.confirmPassword && (
              <p className="error-message-os">{errors.confirmPassword}</p>
            )}
          </div>

          {/* <h2>
            Already have an account? <span onClick={handleSignIn}>Sign in</span>
          </h2> */}

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
