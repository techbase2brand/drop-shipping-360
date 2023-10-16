import React, { useState } from "react";
import PageTitleBar from "../../Shared/PageTitleBar/PageTitleBar";
import CsvFiles from "../CsvFiles/CsvFiles";
import DefaultSettingsPopup from "../DefaultSettingsPopup/DefaultSettingsPopup";

const Home = () => {
  const [activePopup, setActivePopup] = useState(false)
  return (
    <div className="Home-page-os">
      <PageTitleBar title="Homepage" />
      <CsvFiles activePopup={activePopup} setActivePopup={setActivePopup} />
      {activePopup && <DefaultSettingsPopup activePopup={activePopup} setActivePopup={setActivePopup} />}
    </div>
  );
};

export default Home;
