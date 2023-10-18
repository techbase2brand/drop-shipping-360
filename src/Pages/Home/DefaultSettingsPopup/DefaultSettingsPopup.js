import React, { useContext, useState } from "react";
import "./DefaultSettingsPopup.css";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import TooltipIcon from "../../../Assets/tooltip-icon.svg";
import { AppContext } from "../../../App";
// import axios from "axios";

const DefaultSettingsPopup = ({
  activePopup,
  setActivePopup,
  handleInputChange,
  form
}) => {
  const { csvData } = useContext(AppContext);
  const [activeRules, setActiveRules] = useState("rules");
  // console.log("csvData in popuppppp", csvData);

  // const locationUrl = `https://2771-122-176-49-230.ngrok-free.app/api/fetchStoreLocation`;
  // const getLocations = async () => {
  //   try {
  //     const response = await axios.get(locationUrl);
  //     console.log("response.dataaaaaaa", response);
  //   } catch (error) {
  //     console.log("errorrrrrrrr", error);
  //   }
  // };

  // useEffect(() => {
  //   getLocations();
  // }, []);

  // const [form, setForm] = useState({
  //   selectionRules: "defaultSettings",
  //   selectTag: "select",
  //   selectSku: "select",
  //   belowZero: "",
  //   location: "",
  //   bufferQuantity: "",
  //   inputBufferQuantity: "",
  //   expiryDate: "",
  // });

  // const handleInputChange = (val) => {
  //   const { name, type, checked, value } = val.target;
  //   const newValue = type === "checkbox" ? (checked ? "1" : "0") : value;
  //   // console.log("handleInputChange values =", name, ":", newValue);
  //   setForm((prevState) => ({
  //     ...prevState,
  //     [name]: newValue,
  //   }));
  //   // console.log("handleInputChange", form);
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

  const handleSave = () => {
    if (activePopup) {
      setActivePopup(false);
    }
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
                <input
                  type="radio"
                  name="selectionRules"
                  value="defaultSettings"
                  checked={form.selectionRules === "defaultSettings"}
                  onChange={handleInputChange}
                />
                <div className="control-indicatoros"></div>
                Apply your default settings at all products in the excels
              </label>
            </div>
            
            <div className="DefaultSettingsPopup-col-os">
              <label className="control-os control--radio-os">
                <input
                  type="radio"
                  name="selectionRules"
                  value="allExcels"
                  checked={form.selectionRules === "allExcels"}
                  onChange={handleInputChange}
                />
                <div className="control-indicatoros"></div>
                Apply this rule at all products in the excels
              </label>
            </div>

            <div className="DefaultSettingsPopup-col-os">
              <label className="control-os control--radio-os">
                <input
                  type="radio"
                  name="selectionRules"
                  value="tag"
                  checked={form.selectionRules === "tag"}
                  onChange={handleInputChange}
                />
                <div className="control-indicatoros"></div>
                Apply this to specific product's tag
              </label>
              <div className="select">
                <select
                  name="selectTag"
                  value={form.selectTag}
                  onChange={handleInputChange}
                  disabled={form.selectionRules !== "tag"}
                >
                  <option value="select">select</option>
                  {csvData.length > 0 &&
                    csvData.map((tag, index) => (
                      <option key={index} value={tag.Protact_tags}>
                        {tag.Protact_tags}
                      </option>
                    ))}
                </select>
                <div className="select__arrow"></div>
              </div>
            </div>
            {/* <div className="DefaultSettingsPopup-col-os">
              <label className="control-os control--radio-os">
                <input
                  type="radio"
                  name="selectionRules"
                  value="sku"
                  checked={form.selectionRules === "sku"}
                  onChange={handleInputChange}
                />
                <div className="control-indicatoros"></div>
                Apply this to specific product's sku
              </label>
              <div className="select">
                <select
                  name="selectSku"
                  value={form.selectSku}
                  onChange={handleInputChange}
                  disabled={form.selectionRules !== "sku"}
                >
                  <option value="select">select</option>
                  {csvData.length > 0 &&
                    csvData.map((sku, index) => (
                      <option key={index} value={sku.SKU}>
                        {sku.SKU}
                      </option>
                    ))}
                </select>
                <div className="select__arrow"></div>
              </div>
            </div> */}

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
                className="DefaultSettingsPopup-submit-btn-os"
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
                className="DefaultSettingsPopup-back-btn-os"
                onClick={() => {
                  handleSelectedRules("rules");
                }}
              >
                Back
              </button>
              <button
                className="DefaultSettingsPopup-submit-btn-os"
                type="button"
                onClick={handleSave}
              >
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
