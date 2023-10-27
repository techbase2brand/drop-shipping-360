import React, { useState } from "react";
import "./DefaultSettingsForm.css";
import "../../Home/DefaultSettingsPopup/DefaultSettingsPopup.css";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import Button from "../../Shared/Button/Button";
import axios from "axios";
import { useEffect } from "react";
import Input from "../../Shared/Input/Input";
// import TooltipIcon from "../../../Assets/tooltip-icon.svg";

const DefaultSettingsForm = () => {
  const [locationData, setLocationData] = useState([]);
  const [defaultSettingData, setDefaultSettingData] = useState([]);
  const [formConfirmMessage, setFormConfirmMessage] = useState("");

  // default expiryDate
  const getDefaultExpiryDate = () => {
    const currentDate = new Date();
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    const year = nextDay.getFullYear();
    const month = String(nextDay.getMonth() + 1).padStart(2, "0");
    const day = String(nextDay.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to validate the expiry date
  const validateExpiryDate = (selectedDate) => {
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);
    if (selectedDateObj <= currentDate) {
      return "Expiry date must be in the future.";
    }
    return "";
  };

  const [form, setForm] = useState({
    belowZero: "DENY",
    location: "",
    bufferQuantity: "no",
    inputBufferQuantity: "",
    expiryDate: getDefaultExpiryDate(),
  });
  const [formError, setFormError] = useState({
    bufferQuantity: "",
    expiryDate: "",
    inputBufferQuantity: "",
  });

  // fetched store location
  const locationUrl = `http://localhost:4000/api/fetchStoreLocation`;
  const getLocations = async () => {
    try {
      const response = await axios.get(locationUrl);
      setLocationData(response?.data?.response?.data?.shop?.locations?.edges);
      // console.log("response.dataaaaaaa", data);
    } catch (error) {
      console.log("fetchStoreLocation errorrrrrrrr", error);
    }
  };

  // fetched Defaut Settings
  const defaultSettingApiUrl = `http://localhost:4000/api/fetchDefautSetting`;
  const getDefaultSettings = async () => {
    try {
      const response = await axios.get(defaultSettingApiUrl, {
        shop: "https://om-test12.myshopify.com",
      });
      // console.log("getDefaultSettings-response", response?.data?.response);
      setDefaultSettingData(response?.data?.response);
      if (response?.data?.response.id) {
        setForm((preState) => ({
          ...preState,
          belowZero: response?.data?.response?.continueSell,
          bufferQuantity: "yes",
          inputBufferQuantity: response?.data?.response?.bufferQqantity,
          expiryDate: formatDate(response?.data?.response?.expireDate),
          location: response?.data?.response?.locations,
        }));
      }
    } catch (error) {
      console.log("fetchDefautSetting errorrrrrrrr", error);
    }
  };
  // Function to format the date as YYYY-MM-DD
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    getLocations();
    getDefaultSettings();
  }, []);

  // handle input change
  const handleInputChange = (val) => {
    const { name, type, checked, value } = val.target;
    const newValue = type === "checkbox" ? (checked ? "1" : "0") : value;
    setForm((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
    // console.log("handleInputChange", form);

    setFormError((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleSave = async () => {
    const calendarError = validateExpiryDate(form.expiryDate);
    let isValid = true;

    if (form.bufferQuantity === "no") {
      setFormError((prevState) => ({
        ...prevState,
        bufferQuantity: "Choose yes in buffer quantity",
      }));
      isValid = false;
    }

    if (form.bufferQuantity === "yes" && !form.inputBufferQuantity) {
      setFormError((prevState) => ({
        ...prevState,
        inputBufferQuantity: "Enter buffer quantity in the input",
      }));
      isValid = false;
    }

    if (form.expiryDate && calendarError) {
      setFormError((prevState) => ({
        ...prevState,
        expiryDate: calendarError,
      }));
      isValid = false;
    }

    console.log("formErrorrrrrrrrrrr", formError);

    if (isValid) {
      // console.log("handleSubmit defaultSettings form", form);

      const defaultSettingUrl = `http://localhost:4000/api/saveDefautSetting`;
      try {
        const response = await axios.post(defaultSettingUrl, {
          // shop : "https://om-test12.myshopify.com",
          continueSell: form.belowZero,
          locations: form.location,
          bufferQqantity: form.inputBufferQuantity,
          expireDate: form.expiryDate,
        });
        // console.log("form.selectTag", form.singleTag);
        // setNonExistTag(response?.data?.status);
        console.log("saveDefautSetting responseeee", response);
        setFormConfirmMessage("Setting save successfully.");
        setTimeout(() => {
        setFormConfirmMessage("");
        }, 5000);
      } catch (error) {
        console.log("saveDefautSetting errorrrr", error);
        // console.log("object message: ", error?.response?.data?.status);
        // setNonExistTag(error?.response?.data?.status);
        // console.log("nonExistTaggggggg catch", nonExistTag);
      }
    }
  };
  return (
    <section className="DefaultSettings-page-os">
      <div className="container-os">
        <form className="DefaultSettings-row-os">
          <div className="DefaultSettingsPopup-heading-os">
            <MainHeading title="Default Settings" />
          </div>

          <div className="DefaultSettingsPopup-input-row-os">
            <div className="DefaultSettingsPopup-input-col-os-1">
              <span className="key-values-os">Sell below zero :</span>
            </div>
            <div className="DefaultSettingsPopup-input-col-os-2">
              <label className="control-os control--radio-os">
                Yes
                <input
                  type="radio"
                  name="belowZero"
                  value="CONTINUE"
                  checked={form.belowZero === "CONTINUE"}
                  onChange={handleInputChange}
                />
                <div className="control-indicatoros"></div>
              </label>
              <label className="control-os control--radio-os">
                No
                <input
                  type="radio"
                  name="belowZero"
                  value="DENY"
                  checked={form.belowZero === "DENY"}
                  onChange={handleInputChange}
                />
                <div className="control-indicatoros"></div>
              </label>
            </div>
          </div>

          {/* <div className="DefaultSettingsPopup-col-os">
            <span className="key-values-os">
              Choose your warehouse location :
            </span>
            <div className="select">
              <select
                name="location"
                value={form.location}
                onChange={handleInputChange}
              >
                <option value="">select</option>
                {locationData.length > 0 &&
                  locationData.map((loc, index) => {
                    const locationId = (loc?.node?.id).split(
                      "gid://shopify/Location/"
                    );
                    // console.log("idArray", locationId[1]);
                    return (
                      <option key={index} value={locationId[1]}>
                        {loc?.node?.name}
                      </option>
                    );
                  })}
              </select>
              <div className="select__arrow"></div>
            </div>
          </div> */}
          <div className="DefaultSettingsPopup-input-row-os">
            <div className="DefaultSettingsPopup-input-col-os-1">
              <span className="key-values-os">
                Choose your warehouse location :
              </span>
            </div>
            <div className="DefaultSettingsPopup-input-col-os-2">
              <div className="DefaultSettingsPopup-inputs-os">
                <select
                  name="location"
                  value={form.location}
                  onChange={handleInputChange}
                >
                  <option value="">select</option>
                  {locationData.length > 0 &&
                    locationData.map((loc, index) => {
                      const locationId = (loc?.node?.id).split(
                        "gid://shopify/Location/"
                      );
                      // console.log("idArray", locationId[1]);
                      return (
                        <option key={index} value={locationId[1]}>
                          {loc?.node?.name}
                        </option>
                      );
                    })}
                </select>
                <div className="select__arrow"></div>
              </div>
            </div>
          </div>
          
          <div className="DefaultSettingsPopup-input-row-os">
            <div className="DefaultSettingsPopup-input-col-os-1">
              <span className="compulsary-fields-os">*</span>
              <span className="key-values-os">Buffer quantity :</span>
            </div>
            <div className="DefaultSettingsPopup-input-col-os-2">
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
                <div className="DefaultSettingsPopup-inputs-os">
                  <Input
                    type="text"
                    placeholder="Quantity"
                    name="inputBufferQuantity"
                    value={form.bufferQuantity === "yes" ? form.inputBufferQuantity : "0"}
                    onChange={handleInputChange}
                    disabled={form.bufferQuantity !== "yes"}
                  />
                </div>
              </div>
            </div>
          </div>
          {formError.bufferQuantity && (
            <div className="error-message-os pb-3">
              {formError.bufferQuantity}
            </div>
          )}
          {formError.inputBufferQuantity && (
            <div className="error-message-os pb-3">
              {formError.inputBufferQuantity}
            </div>
          )}

          {/* <div className="DefaultSettingsPopup-row-os-1">
            <span className="compulsary-fields-os">*</span>
            <div className="DefaultSettingsPopup-col-os">
              <span className="key-values-os">Expiry date :</span>
              <input
                type="date"
                placeholder="Enter sku"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {formError.expiryDate && (
            <div className="error-message-os">{formError.expiryDate}</div>
          )} */}
          <div className="DefaultSettingsPopup-input-row-os">
            <div className="DefaultSettingsPopup-input-col-os-1">
              <span className="compulsary-fields-os">*</span>
              <span className="key-values-os">Expiry date :</span>
            </div>
            <div className="DefaultSettingsPopup-input-col-os-2">
              <Input
                type="date"
                placeholder="Enter sku"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {formError.expiryDate && (
            <div className="error-message-os">{formError.expiryDate}</div>
          )}
          <div className="DefaultSettingsPopup-submit-os">
            <Button type="button" onClick={handleSave} title="Save" />
            <div className="success-message-os">{formConfirmMessage}</div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DefaultSettingsForm;
