import React from "react";
import PageTitleBar from "../../Shared/PageTitleBar/PageTitleBar";
import DefaultSettingsForm from "../DefaultSettingsForm/DefaultSettingsForm";

const DefaultSettings = () => {
  return (
    <div className="DefaultSettings-page-os">
      <PageTitleBar title="Default Settings Page" />
      <DefaultSettingsForm />
    </div>
  );
};

export default DefaultSettings;
