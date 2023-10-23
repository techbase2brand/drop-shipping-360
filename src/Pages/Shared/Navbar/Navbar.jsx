import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("link-1");
  const handleLink = (val) => {
    setActiveLink(val);
  };
  return (
    <section className="Navbar-section-os">
      <div className="Navbar-row-os">
        <div className="Navbar-col-os-1">
          <Link to="/">
            <img src="https://saasintegrator.online/img/logo.png" alt="" />
            <span>360 Main</span>
          </Link>
        </div>
        <div className="Navbar-col-os-2">
          <div className="profile-image-os">
            <img src="" alt="" />
          </div>
          <div className="profile-name-os">Hello, Kavin Gada</div>
        </div>
        <div className="Navbar-col-os-3">
          <div className="Navbar-menu-heading-os">Menu</div>
          <Link
            to="/"
            className={activeLink === "link-1" ? "active" : ""}
            onClick={() => handleLink("link-1")}
          >
            <span></span>
            Data Porting
          </Link>
          <Link
            to="/defaultsettings"
            className={activeLink === "link-2" ? "active" : ""}
            onClick={() => handleLink("link-2")}
          >
            <span></span>
            Default Settings
          </Link>
          {/* <Link
            to="/signup"
            className={activeLink === "link-3" ? "active" : ""}
            onClick={() => handleLink("link-3")}
          >
            <span></span>
            Login
          </Link> */}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
