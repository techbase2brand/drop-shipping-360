import React from "react";
import "./PageTitleBar.css";

const PageTitleBar = ({ title }) => {
  return (
    <section className="PageTitleBar-section-os default-padding-os">
      <div className="PageTitleBar-row-os">
        <div className="container-os">{title}</div>
      </div>
    </section>
  );
};

export default PageTitleBar;
