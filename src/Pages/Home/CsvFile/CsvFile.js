import React, { useContext, useRef } from "react";
import "./CsvFile.css";
import { useState } from "react";
import Papa from "papaparse";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import SubHeading from "../../Shared/SubHeading/SubHeading";
import DefaultSettingsPopup from "../DefaultSettingsPopup/DefaultSettingsPopup";
import { AppContext } from "../../../App";

const CsvFile = () => {
  // appContext
  const { csvData, setCSVData, file, setFile } = useContext(AppContext);
  // const [csvData, setCSVData] = useState([]);
  // const [file, setFile] = useState(null);
  const [activePopup, setActivePopup] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    // console.log("selectedFileeeeeeeee", selectedFile);

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

  const shopifyCSVData = [
    {
      header: "SKU",
    },
    // {
    //   header: "Item-no",
    // },
    // {
    //   header: "Description",
    // },
    // {
    //   header: "Location",
    // },
    {
      header: "Barcode",
    },
  ];

  const handleUploadCsv = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    setTimeout(() => {
      if (!activePopup) {
        setActivePopup(true);
      }
    }, 1000);
  };

  const handleSubmit = () => {
    console.log("handleSubmit");
    // console.log("handleSubmit form", form);
    if (activePopup) {
      setActivePopup(false);
    }
    // if (fileInputRef.current) {
    //   fileInputRef.current.click();
    // }
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
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <button onClick={handleUploadCsv} type="button">
                Upload csv
              </button>
              {csvData.length > 0 && (
                <p>{csvData.length > 0 ? "File uploaded successfully" : ""}</p>
              )}
            </div>
            {file?.name && <p>{file?.name}</p>}
          </div>

          {csvData.length > 0 && (
            <div className="CsvFile-mapping-data-os">
              <SubHeading title="Mapping" />
              <div className="CsvFile-mapping-select-row-os">
                <div className="CsvFile-mapping-select-col-os-1">
                  <h5>File headers</h5>
                  {csvData.map((values, valueIndex) => (
                    <select key={valueIndex}>
                      {Object.entries(values).map(([key, value], index) => (
                        <React.Fragment key={index}>
                          <option value={key}>{key}</option>
                          <option value={value}>{value}</option>
                        </React.Fragment>
                      ))}
                    </select>
                  ))}

                  {/* {csvData.map((value) => {
                    {Object.entries(value).map(([key, value], index) =>(
                      <select key={index}>
                        <option value={key}>{key}</option>
                      </select>
                    ))}
                  })} */}
                </div>
                <div className="CsvFile-mapping-select-col-os-1">
                  <h5>Shopify invetory headers</h5>
                  <select>
                    {shopifyCSVData.map((values, index) => (
                      <option key={index} value={values.header}>
                        {values.header}
                      </option>
                    ))}
                  </select>
                </div>
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
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </section>
  );
};

export default CsvFile;