import React from "react";
import PageTitleBar from "../../Shared/PageTitleBar/PageTitleBar";
import CsvFile from "../CsvFile/CsvFile";

const Home = () => {
  return (
    <div className="Home-page-os">
      <PageTitleBar title="Data Porting" />
      <CsvFile />
    </div>
  );
};

export default Home;
