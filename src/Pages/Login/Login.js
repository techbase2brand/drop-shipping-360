import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Shared/Input/Input";

// Image
import logo from "../../Assets/brand-logo.svg";

const Login = () => {
  // const [loginSms, setLoginSms] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // const handleSignupClick = () => {
  //   navigate("/signup"); // Navigate to the signup page path
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/user/api/userLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // `formData` contains email and password
      });

      if (response.ok) {
        const data = await response.json();

        if ((data.message = "Login successfuly")) {
          localStorage.setItem("token", data.token);
          navigate("/");
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
            Login
          </h1>

          <div className="input-col-os">
            <Input
              type="text"
              name="email"
              required="required"
              onChange={handleInputChange}
              placeholder="Enter Your Username"
              label="Email"
              Asterisk="*"
            />
          </div>

          <div className="input-col-os">
            <Input
              type="password"
              name="password"
              required="required"
              onChange={handleInputChange}
              placeholder="******************"
              label="Password"
              Asterisk="*"
            />
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
