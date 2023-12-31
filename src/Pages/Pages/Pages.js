import React from "react";
import "./Pages.css";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home/Home";
import Navbar from "../Shared/Navbar/Navbar";
import Header from "../Shared/Header/Header";
import DefaultSettings from "../DefaultSettings/DefaultSettings/DefaultSettings";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";

const Pages = () => {
  return (
    <div className="Pages-os">
      <div className="Pages-row-os">
        <div className="Pages-col-os-1">
          <Navbar />
        </div>
        <div className="Pages-col-os-2">
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/defaultsettings" element={<DefaultSettings />} />
          </Routes>
          <Routes>
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Pages;
