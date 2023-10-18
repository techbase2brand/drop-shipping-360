import React, { useState } from "react";
import "./DefaultSettingsForm.css";
import "../../Home/DefaultSettingsPopup/DefaultSettingsPopup.css";
import MainHeading from "../../Shared/MainHeading/MainHeading";
// import TooltipIcon from "../../../Assets/tooltip-icon.svg";

const DefaultSettingsForm = () => {
  const [form, setForm] = useState({
    belowZero: "no",
    location: "select",
    bufferQuantity: "no",
    inputBufferQuantity: "",
    expiryDate: "",
    fileHeader: "sku",
    shopifyHeader: "sku",
  });

  // handle input change
  const handleInputChange = (val) => {
    const { name, type, checked, value } = val.target;
    const newValue = type === "checkbox" ? (checked ? "1" : "0") : value;
    setForm((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
    // console.log("handleInputChange", form);
  };

  const handleSubmit = () => {
    console.log("handleSubmit defaultSettings form", form);
  };
  return (
    <section className="DefaultSettings-page-os">
      <div className="container-os">
        <form className="DefaultSettings-row-os">
          <div className="default-padding-os">
            <MainHeading title="Roles" />
          </div>

          <div className="DefaultSettingsPopup-col-os">
            Sell below zero
            <label className="control-os control--radio-os">
              Yes
              <input
                type="radio"
                name="belowZero"
                value="yes"
                checked={form.belowZero === "yes"}
                onChange={handleInputChange}
              />
              <div className="control-indicatoros"></div>
            </label>
            <label className="control-os control--radio-os">
              No
              <input
                type="radio"
                name="belowZero"
                value="no"
                checked={form.belowZero === "no"}
                onChange={handleInputChange}
              />
              <div className="control-indicatoros"></div>
            </label>
          </div>

          <div className="DefaultSettingsPopup-col-os">
            <span>Choose your warehouse location</span>
            <div className="select">
              <select
                name="location"
                value={form.location}
                onChange={handleInputChange}
              >
                <option value="select">select</option>
                <option value="option1">Location1</option>
                <option value="option2">Location2</option>
              </select>
              <div className="select__arrow"></div>
            </div>
          </div>

          <div className="DefaultSettingsPopup-row-os-1">
            <span className="compulsary-fields-os">*</span>
            <div className="DefaultSettingsPopup-col-os">
              Buffer quantity
              <label className="control-os control--radio-os">
                Yes
                <input
                  type="radio"
                  name="bufferQuantity"
                  checked={form.bufferQuantity === "yes"}
                  value="yes"
                  onChange={handleInputChange}
                />
                <div className="control-indicatoros"></div>
              </label>
              <label className="control-os control--radio-os">
                No
                <input
                  type="radio"
                  name="bufferQuantity"
                  checked={form.bufferQuantity === "no"}
                  value="no"
                  onChange={handleInputChange}
                />
                <div className="control-indicatoros"></div>
              </label>
              <div>
                <input
                  type="text"
                  placeholder="Enter quantity"
                  name="inputBufferQuantity"
                  value={form.inputBufferQuantity}
                  onChange={handleInputChange}
                  disabled={form.bufferQuantity !== "yes"}
                />
              </div>
            </div>
          </div>

          <div className="DefaultSettingsPopup-row-os-1">
            <span className="compulsary-fields-os">*</span>
            <div className="DefaultSettingsPopup-col-os">
              Expiry date
              <input
                type="date"
                placeholder="Enter sku"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="DefaultSettingsPopup-submit-os">
            <button
              className="DefaultSettingsPopup-submit-btn-os"
              type="button"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DefaultSettingsForm;
