import React, { useState } from "react";
import "./DefaultSettingsPopup.css";

const DefaultSettingsPopup = ({ activePopup, setActivePopup }) => {
  const [form, setForm] = useState({
    allExcels: "0",
    sku: "",
    inputSku: "",
    belowZero: "0",
    location: "",
    bufferQuantity: "0",
  });

  const handleInputChange = (val) => {
    // const { name, type, checked, value } = val.target;
    // const newValue = type === "checkbox" ? (checked ? "1" : "0") : value;
    // console.log("handleInputChange values", newValue);
    // console.log("handleInputChange name", name);
    // setForm((prevState) => ({
    //   ...prevState,
    //   [name]: newValue,
    // }));
    console.log("handleInputChange");
  };
  const handleSubmit = () => {
    console.log("handleSubmit");
    // console.log("handleSubmit form", form);
    if (activePopup) {
      setActivePopup(false);
    }
  };

  return (
    <section className="DefaultSettingsPopup-os">
      <form onSubmit={handleSubmit} className="DefaultSettingsPopup-row-os">
        <div className="DefaultSettingsPopup-cross-btn-os">
          <button
            onClick={() => {
              if (activePopup) {
                setActivePopup(false);
              }
            }}
          >
            X
          </button>
        </div>
        <div className="DefaultSettingsPopup-col-os">
          <label className="control-os control-checkbox-os">
            Apply below rules to all excels
            <input
              type="checkbox"
              name="allExcels"
              //   checked={form.allExcels === "1"}
              onChange={handleInputChange}
            />
            <div className="control-indicatoros"></div>
          </label>
        </div>

        <div className="DefaultSettingsPopup-col-os">
          <label className="control-os control--radio-os">
            All SKU's
            <input
              type="radio"
              name="sku"
              //   checked={form.sku === "allSku"}
              value="allSku"
              onChange={handleInputChange}
            />
            <div className="control-indicatoros"></div>
          </label>

          <label className="control-os control--radio-os">
            Select SKU's
            <input
              type="radio"
              name="sku"
              //   checked={form.sku === "selectedSku"}
              value="selectedSku"
              onChange={handleInputChange}
            />
            <div className="control-indicatoros"></div>
          </label>
          {/* {form.sku === "selectedSku" && ( */}
          <div>
            <input
              type="text"
              placeholder="Enter sku"
              name="inputSku"
              // value={form.inputSku}
              onChange={handleInputChange}
            />
          </div>
          {/* )} */}
        </div>

        <div className="DefaultSettingsPopup-col-os">
          <label className="control-os control-checkbox-os">
            Do you want to marks these products continue to sell below zero
            <input
              type="checkbox"
              name="belowZero"
              //   value={form.belowZero === "1"}
              onChange={handleInputChange}
            />
            <div className="control-indicatoros"></div>
          </label>
        </div>

        <div className="DefaultSettingsPopup-col-os">
          <span>Do you want to update quantity to specific location</span>
          <div className="select">
            <select
              name="location"
              //   value={form.location}
              onChange={handleInputChange}
            >
              <option value="first select">First select</option>
              <option value="option1">Option1</option>
              <option value="option2">Option2</option>
            </select>
            <div className="select__arrow"></div>
          </div>
        </div>

        <div className="DefaultSettingsPopup-col-os">
          <label className="control-os control-checkbox-os">
            Do you want to apply buffer quantity
            <input
              type="checkbox"
              name="bufferQuantity"
              //   value={form.bufferQuantity === "0"}
              onChange={handleInputChange}
            />
            <div className="control-indicatoros"></div>
          </label>
        </div>

        <div className="DefaultSettingsPopup-submit-btn-os">
          <button type="button" onClick={handleSubmit}>
            Done
          </button>
        </div>

        {/* custom code */}
        {/* <label className="control-os control-checkbox-os">
          Second checkbox
          <input type="checkbox" />
          <div className="control-indicatoros"></div>
        </label>

        <label className="control-os control--radio-os">
          First radio
          <input type="radio" name="radio" checked="checked" />
          <div className="control-indicatoros"></div>
        </label>

        <label className="control-os control--radio-os">
          2nd radio
          <input type="radio" name="radio" checked="checked" />
          <div className="control-indicatoros"></div>
        </label>

        <div className="select">
          <select>
            <option>First select</option>
            <option>Option</option>
            <option>Option</option>
          </select>
          <div className="select__arrow"></div>
        </div> */}
      </form>
    </section>
  );
};

export default DefaultSettingsPopup;
