import React, { useState } from "react";
import "./DefaultSettingsForm.css";
import "../../Home/DefaultSettingsPopup/DefaultSettingsPopup.css";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import Button from "../../Shared/Button/Button";
import axios from "axios";
import { useEffect } from "react";
// import TooltipIcon from "../../../Assets/tooltip-icon.svg";

const DefaultSettingsForm = () => {
  const [data, setData] = useState([]);
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

  const locationUrl = `http://localhost:4000/api/fetchStoreLocation`;
  const getLocations = async () => {
    try {
      const response = await axios.get(locationUrl);
      setData(response?.data?.response?.data?.shop?.locations?.edges);
      // console.log("response.dataaaaaaa", data);
    } catch (error) {
      console.log("fetchStoreLocation errorrrrrrrr", error);
    }
  };

  useEffect(() => {
    getLocations();
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
          continueSell: form.belowZero,
          locations: form.location,
          bufferQqantity: form.inputBufferQuantity,
          expireDate: form.expiryDate,
        });
        // console.log("form.selectTag", form.singleTag);
        // setNonExistTag(response?.data?.status);
        console.log("saveDefautSetting responseeee", response);
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

          <div className="DefaultSettingsPopup-col-os">
            <span>Choose your warehouse location</span>
            <div className="select">
              <select
                name="location"
                value={form.location}
                onChange={handleInputChange}
              >
                <option value="">select</option>
                {data.length > 0 &&
                  data.map((loc, index) => {
                    const locationId = (loc?.node?.id).split(
                      "gid://shopify/Location/"
                    );
                    // console.log("idArray", locationId[1]);
                    return (
                      <option key={index} value={locationId}>
                        {loc?.node?.name}
                      </option>
                    );
                  })}
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
          {formError.bufferQuantity && (
            <div className="ereror-message-os pb-3">
              {formError.bufferQuantity}
            </div>
          )}
          {formError.inputBufferQuantity && (
            <div className="ereror-message-os pb-3">
              {formError.inputBufferQuantity}
            </div>
          )}

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
          {formError.expiryDate && (
            <div className="ereror-message-os">{formError.expiryDate}</div>
          )}
          <Button type="button" onClick={handleSave} title="Save" />
        </form>
      </div>
    </section>
  );
};

export default DefaultSettingsForm;
