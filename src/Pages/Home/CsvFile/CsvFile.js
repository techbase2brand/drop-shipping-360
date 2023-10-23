import React, { useContext, useEffect, useRef } from "react";
import "./CsvFile.css";
import { useState } from "react";
import Papa from "papaparse";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import SubHeading from "../../Shared/SubHeading/SubHeading";
import DefaultSettingsPopup from "../DefaultSettingsPopup/DefaultSettingsPopup";
import { AppContext } from "../../../App";
import Button from "../../Shared/Button/Button";
import axios from "axios";

const CsvFile = () => {
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

  // appContext and states
  const { csvData, setCSVData, file, setFile } = useContext(AppContext);
  // const [defaultSettingData, setDefaultSettingData] = useState([]);
  const [activeRules, setActiveRules] = useState("rules");
  const [activePopup, setActivePopup] = useState(false);
  const [formConfirmMessage, setFormConfirmMessage] = useState("");
  const [nonExistTag, setNonExistTag] = useState("");
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    selectionRules: "defaultSettings",
    selectTag: [],
    selectSku: "",
    belowZero: "DENY",
    location: "",
    bufferQuantity: "no",
    inputBufferQuantity: "",
    expiryDate: getDefaultExpiryDate(),
    fileHeader: "",
    shopifyHeader: "sku",
    singleTag: "",
  });
  const [formError, setFormError] = useState({
    bufferQuantity: "",
    expiryDate: "",
    fileHeader: "",
    inputBufferQuantity: "",
    selectTag: "",
  });

  const shopifyCSVData = [
    {
      header: "SKU",
    },
    {
      header: "Barcode",
    },
  ];

  // fetched Defaut Settings
  const defaultSettingApiUrl = `http://localhost:4000/api/fetchDefautSetting`;
  const getDefaultSettings = async () => {
    try {
      const response = await axios.get(defaultSettingApiUrl, {
        shop: "https://om-test12.myshopify.com",
      });
      // console.log("getDefaultSettings-response", response?.data?.response);
      if (response?.data?.response?.id) {
        setForm((prevState) => ({
          ...prevState,
          belowZero: response?.data?.response?.continueSell,
          bufferQuantity: "yes",
          inputBufferQuantity: response?.data?.response?.bufferQqantity,
          expiryDate: formatDate(response?.data?.response?.expireDate),
          location: response?.data?.response?.locations,
        }));
      }
    } catch (error) {
      console.log("fetchStoreLocation errorrrrrrrr", error);
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
    getDefaultSettings();
  }, []);

  // handle change for csv upload
  const handleCsvInputChanges = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      Papa.parse(selectedFile, {
        complete: (result) => {
          setCSVData(result.data);
          // console.log("result.dataaaaaaaaaaa", result.data);
          // console.log("file.nameeeeeeee", file);
        },
        header: true,
      });
    }
  };

  // Handle csv upload button
  const handleUploadCsvBtn = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    setTimeout(() => {
      if (!activePopup) {
        setActivePopup(true);
      }
    }, 1000);
  };

  // // handle input change
  // const handleInputChange = (val) => {
  //   const { name, type, checked, value } = val.target;
  //   const newValue = type === "checkbox" ? (checked ? "1" : "0") : value;
  //   setForm((prevState) => ({
  //     ...prevState,
  //     [name]: newValue,
  //   }));
  //   // console.log("handleInputChange", form);
  //   setFormError((prevState) => ({
  //     ...prevState,
  //     [name]: "",
  //   }));
  // };
  const handleInputChange = async (val) => {
    if (val && val.target) {
      const { name, type, checked, value } = val.target;
      const newValue = type === "checkbox" ? (checked ? "1" : "0") : value;
      setForm((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
      setFormError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  // handle selection continue button
  const handleSelectedRules = async (val) => {
    let isValid = true;

    if (form.selectionRules === "tag" && !form.singleTag) {
      setFormError((prevState) => ({
        ...prevState,
        selectTag: "Select tag",
      }));
      isValid = false;
    } else if (form.selectionRules === "tag" && !nonExistTag) {
      setFormError((prevState) => ({
        ...prevState,
        selectTag: "Tag not exist",
      }));
      isValid = false;
    } else {
      setFormError((prevState) => ({
        ...prevState,
        selectTag: "",
      }));
      setActiveRules(val);
    }
    return isValid;
  };

  // Handle save button
  const handleSave = () => {
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

    // console.log("formErrorrrrrrrrrrr", formError);

    if (isValid) {
      if (activePopup) {
        setActivePopup(false);
      }
    }
  };

  // Handle final submit
  const handleSubmit = async () => {
    let isValid = true;
    if (!form.fileHeader) {
      setFormError((prevState) => ({
        ...prevState,
        fileHeader: "Select header",
      }));
      return (isValid = false);
    }
    if (isValid) {
      // console.log("handleSubmit form", form);
      // setFormConfirmMessage("Form submitted successfully");
      // setTimeout(() => {
      //   setFormConfirmMessage("");
      // }, 5000);
      const csvApiUrl = "http://localhost:4000/api/addCsvFile";
      try {
        const response = await axios.post(csvApiUrl, {
          csvFileData: csvData,
          productTags: form.selectTag,
          allExcels: "",
          defaultSetting: "",
          continueSell: form.belowZero,
          locations: form.location,
          bufferQqantity: form.inputBufferQuantity,
          expireDate: form.expiryDate,
          fileHeaders: form.fileHeader,
          shopifyInventoryHeaders: form.shopifyHeader,
        });
        console.log("response of addCsvFile api", response);
        // console.log("handleSubmit form", form);
        setFormConfirmMessage("Form submitted successfully");
        setTimeout(() => {
          setFormConfirmMessage("");
        }, 5000);
      } catch (error) {
        console.log("csv data api error", error);
      }
    }
  };

  return (
    <section className="CsvFiles-section-os">
      <div className="container-os">
        <div className="CsvFiles-csv-upload-data-os">
          <div className="default-padding-os">
            <MainHeading title="Home" />
          </div>
          <div className="CsvFile-upload-content-os">
            <div className="CsvFile-upload-input">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleCsvInputChanges}
                style={{ display: "none" }}
              />
              <button onClick={handleUploadCsvBtn} type="button">
                Upload csv
              </button>
              {csvData.length > 0 && (
                <p className="success-message-os">
                  File uploaded successfully.
                </p>
              )}
            </div>
            {file?.name && <p>{file?.name}</p>}
          </div>

          {csvData.length > 0 && (
            <div className="CsvFile-mapping-data-os">
              <SubHeading title="Mapping" />
              <div className="CsvFile-mapping-select-row-os">
                <div className="CsvFile-mapping-select-col-os-1">
                  <h5>File headers :</h5>
                  {/* {csvData.map((values, valueIndex) => (
                    <select key={valueIndex}>
                      {Object.entries(values).map(([key, value], index) => (
                        <React.Fragment key={index}>
                          <option value={key}>{key}</option>
                          <option value={value}>{value}</option>
                        </React.Fragment>
                      ))}
                    </select>
                  ))} */}

                  <select
                    onChange={handleInputChange}
                    name="fileHeader"
                    value={form.fileHeader}
                  >
                    <option value="">select</option>
                    {Object.keys(csvData[0])
                      .splice(1)
                      .map((header, index) => (
                        <option key={index} value={header.toLowerCase()}>
                          {header}
                        </option>
                      ))}
                  </select>
                  {formError.fileHeader && (
                    <div className="ereror-message-os">
                      {formError.fileHeader}
                    </div>
                  )}
                </div>
                <div className="CsvFile-mapping-select-col-os-1">
                  <h5>Shopify invetory headers :</h5>
                  <select
                    onChange={handleInputChange}
                    value={form.shopifyHeader}
                    name="shopifyHeader"
                  >
                    {shopifyCSVData.map((values, index) => (
                      <option key={index} value={values.header}>
                        {values.header}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="CsvFile-submit-btn-os pt-3">
                <Button
                  type="button"
                  onClick={handleSubmit}
                  title="Final Submit"
                />
                <div className="success-message-os">{formConfirmMessage}</div>
              </div>
            </div>
          )}

          {csvData.length > 0 && (
            <div className="CsvFile-data-table-os">
              <table>
                <thead>
                  <tr>
                    {Object.keys(csvData[0]).map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* {csvData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((values, valuesIndex) => {
                        if (row.Buffer_quantity) {
                          return (
                            <td key={valuesIndex}>
                              <input type="text" value={values} />
                            </td>
                          );
                        } else {
                          return <td key={valuesIndex}>{values}</td>;
                        }
                        return <td key={valuesIndex}>{values}</td>;
                      })}
                    </tr>
                  ))} */}
                  {csvData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.entries(row).map(([key, value], valuesIndex) => {
                        // if (key === "Buffer_quantity") {
                        //   return (
                        //     <td key={valuesIndex}>
                        //       <input type="text" value={value} />
                        //     </td>
                        //   );
                        // } else {
                        //   return <td key={valuesIndex}>{value}</td>;
                        // }
                        return <td key={valuesIndex}>{value}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {activePopup && (
          <DefaultSettingsPopup
            activePopup={activePopup}
            setActivePopup={setActivePopup}
            handleInputChange={handleInputChange}
            form={form}
            setForm={setForm}
            handleSave={handleSave}
            formError={formError}
            handleSelectedRules={handleSelectedRules}
            activeRules={activeRules}
            setActiveRules={setActiveRules}
            nonExistTag={nonExistTag}
            setNonExistTag={setNonExistTag}
            setFormError={setFormError}
          />
        )}
      </div>
    </section>
  );
};

export default CsvFile;
