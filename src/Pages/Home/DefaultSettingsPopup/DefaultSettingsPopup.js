import React, { useContext, useState } from "react";
import "./DefaultSettingsPopup.css";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import TooltipIcon from "../../../Assets/tooltip-icon.svg";
import { AppContext } from "../../../App";

const DefaultSettingsPopup = ({
  activePopup,
  setActivePopup,
  handleSubmit,
}) => {
  const { csvData } = useContext(AppContext);
  const [activeRules, setActiveRules] = useState("rules");
  console.log("csvData in popuppppp", csvData);
  // const [form, setForm] = useState({
  //   allExcels: "1",
  //   sku: "allSku",
  //   inputSku: "",
  //   belowZero: "0",
  //   location: "",
  //   bufferQuantity: "0",
  // });

  // const handleInputChange = (val) => {
  //   const { name, type, checked, value } = val.target;
  //   const newValue = type === "checkbox" ? (checked ? "1" : "0") : value;
  //   console.log("handleInputChange values =", name, ":", newValue);
  //   setForm((prevState) => ({
  //     ...prevState,
  //     [name]: newValue,
  //   }));
  //   console.log("handleInputChange", form);
  // };
  // const handleSubmit = () => {
  //   console.log("handleSubmit form", form);
  //   if (activePopup) {
  //     setActivePopup(false);
  //   }
  // };

  // const handleRules = () => {
  //   setActiveRules("selectionRules");
  //   // alert("Success");
  // };
  const handleSelectedRules = (val) => {
    setActiveRules(val);
  };

  return (
    <section className="DefaultSettingsPopup-os">
      {/* <form onSubmit={handleSubmit} className="DefaultSettingsPopup-row-os">
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
              checked={form.allExcels === "1"}
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
              checked={form.sku === "allSku"}
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
              checked={form.sku === "selectedSku"}
              value="selectedSku"
              onChange={handleInputChange}
            />
            <div className="control-indicatoros"></div>
          </label>
          <div>
            <input
              type="text"
              placeholder="Enter sku"
              name="inputSku"
              disabled={form.sku !== "selectedSku"}
              value={form.inputSku}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="DefaultSettingsPopup-col-os">
          <label className="control-os control-checkbox-os">
            Do you want to marks these products continue to sell below zero
            <input
              type="checkbox"
              name="belowZero"
              value={form.belowZero === "1"}
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
              value={form.location}
              onChange={handleInputChange}
            >
              <option value="select">Select</option>
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
              checked={form.bufferQuantity === "1"}
              onChange={handleInputChange}
            />
            <div className="control-indicatoros"></div>
          </label>
        </div>

        <div className="DefaultSettingsPopup-submit-os">
          <button type="button" onClick={handleSubmit}>
            Apply
          </button>
        </div>
      </form> */}

      <div className="DefaultSettingsPopup-row-os">
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
        {activeRules === "rules" && (
          <form className="DefaultSettingsPopup-form-os">
            <div className="default-padding-os">
              <MainHeading title="Selection for rules" />
            </div>

            <div className="DefaultSettingsPopup-col-os">
              <label className="control-os control--radio-os">
                <input type="radio" name="selectionRules" value="allSku" />
                <div className="control-indicatoros"></div>
                Apply your default settings at all products in the excels
              </label>
            </div>
            <div className="DefaultSettingsPopup-col-os">
              <label className="control-os control--radio-os">
                <input type="radio" name="selectionRules" value="allSku" />
                <div className="control-indicatoros"></div>
                Apply this rule at all products in the excels
              </label>
            </div>

            <div className="DefaultSettingsPopup-col-os">
              <label className="control-os control--radio-os">
                <input
                  type="radio"
                  name="selectionRules"
                  // checked={form.sku === "allSku"}
                  // value="allSku"
                  // onChange={handleInputChange}
                />
                <div className="control-indicatoros"></div>
                Apply this to specific product's tag
              </label>
              <div className="select">
                <select
                  name="tags"
                  // value={form.location}
                  // onChange={handleInputChange}
                >
                  <option value="select">Select</option>
                  {csvData.length > 0 &&
                    csvData.map((tag, index) => (
                      <option key={index} value={tag.Protact_tags}>
                        {tag.Protact_tags}
                      </option>
                    ))}
                  {/* <option value="option1">tag1</option>
                  <option value="option2">tag2</option> */}
                </select>
                <div className="select__arrow"></div>
              </div>
            </div>

            <div className="DefaultSettingsPopup-col-os">
              <label className="control-os control--radio-os">
                <input type="radio" name="selectionRules" value="allSku" />
                <div className="control-indicatoros"></div>
                Specific SKU's in the uploaded sheet
              </label>
              <div className="tooptip-icon-os">
                <img src={TooltipIcon} alt="" />
                <span>Tooltip message</span>
              </div>
            </div>

            <div className="DefaultSettingsPopup-submit-os">
              <button
                type="button"
                onClick={() => {
                  handleSelectedRules("selectionRules");
                }}
              >
                Continue
              </button>
            </div>
          </form>
        )}

        {activeRules === "selectionRules" && (
          <form className="DefaultSettingsPopup-form-os">
            <div className="tabs-os">
              <button
                className={activeRules === "rules" ? "tabs-os-active" : ""}
                onClick={() => {
                  handleSelectedRules("rules");
                }}
              >
                Back
              </button>
              {/* <button
                className={
                  activeRules === "selectionRules" ? "tabs-os-active" : ""
                }
                onClick={() => {
                  handleSelectedRules("selectionRules");
                }}
              >
                Selection Rules
              </button> */}
            </div>
            <div className="default-padding-os">
              <MainHeading title="Roles" />
            </div>

            <div className="DefaultSettingsPopup-col-os">
              Sell below zero
              <label className="control-os control--radio-os">
                Yes
                <input type="radio" name="bufferQuantity" value="allSku" />
                <div className="control-indicatoros"></div>
              </label>
              <label className="control-os control--radio-os">
                No
                <input type="radio" name="bufferQuantity" value="selectedSku" />
                <div className="control-indicatoros"></div>
              </label>
            </div>

            <div className="DefaultSettingsPopup-col-os">
              <span>Choose your warehouse location</span>
              <div className="select">
                <select
                  name="location"
                  // value={form.location}
                  // onChange={handleInputChange}
                >
                  <option value="select">Select</option>
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
                    name="sku"
                    // checked={form.sku === "allSku"}
                    // value="allSku"
                    // onChange={handleInputChange}
                  />
                  <div className="control-indicatoros"></div>
                </label>
                <label className="control-os control--radio-os">
                  No
                  <input
                    type="radio"
                    name="sku"
                    // checked={form.sku === "selectedSku"}
                    // value="selectedSku"
                    // onChange={handleInputChange}
                  />
                  <div className="control-indicatoros"></div>
                </label>
                <div>
                  <input
                    type="text"
                    placeholder="Enter quantity"
                    name="inputSku"
                    // value={form.inputSku}
                    // onChange={handleInputChange}
                    // disabled={form.sku !== "selectedSku"}
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
                  name="date"
                  // value={form.inputSku}
                  // onChange={handleInputChange}
                  // disabled={form.sku !== "selectedSku"}
                />
              </div>
            </div>
            <div className="DefaultSettingsPopup-submit-os">
              <button type="button" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default DefaultSettingsPopup;
