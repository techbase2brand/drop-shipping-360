import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Shared/Input/Input";

// Image
import logo from "../../Assets/brand-logo.svg";

const Login = () => {
  // const {setUserName} = useContext(AppContext)
  const navigate = useNavigate();
  // const [loginSms, setLoginSms] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setFormError((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;

    // Enter Email validation
    if (!formData.email) {
      setFormError((prevState) => ({
        ...prevState,
        email: "Please enter a valid email address.",
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
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await fetch(
          "http://localhost:4000/user/api/userLogin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // `formData` contains email and password
          }
        );

        if (response.ok) {
          const data = await response.json();

          if ((data.message = "Login successfuly")) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.message);
            navigate("/");
            window.location.reload(true);
            // setLoginSms(data.message)
            // console.log("loginSmsssssssss",loginSms)
          }
        } else {
          // Handle login error, e.g., display an error message
          alert("Login failed. Check your email and password.");
          console.error("Login failed");
        }
      } catch (error) {
        console.error(error);
        alert("Login failed. Please try again.");
      }
    }
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
            Login
          </h1>

          <div className="input-col-os">
            <Input
              type="text"
              name="email"
              onChange={handleInputChange}
              placeholder="Enter Your Username"
              label="Email"
              Asterisk="*"
            />
            {formError.email && (
              <p className="error-message-os pt-1">{formError.email}</p>
            )}
          </div>

          <div className="input-col-os">
            <Input
              type="password"
              name="password"
              onChange={handleInputChange}
              placeholder="******************"
              label="Password"
              Asterisk="*"
            />
            {formError.password && (
              <p className="error-message-os pt-1">{formError.password}</p>
            )}
          </div>

          <button type="submit">Login</button>

          <div className="signup-link-os">
            <p>
              Don't have an account?
              <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
