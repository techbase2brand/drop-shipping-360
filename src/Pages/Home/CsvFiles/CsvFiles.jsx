import React, { useRef } from "react";
import "./CsvFiles.css";
import { useState } from "react";
import Papa from "papaparse";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import SubHeading from "../../Shared/SubHeading/SubHeading";

const CsvFiles = ({ activePopup, setActivePopup }) => {
  const [csvData, setCSVData] = useState([]);
  const [file, setFile] = useState(null);
  // const [csvFile, setCsvFile] = useState();

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    // console.log("selectedFileeeeeeeee", selectedFile);

    if (selectedFile) {
      setFile(selectedFile);
      Papa.parse(selectedFile, {
        complete: (result) => {
          setCSVData(result.data);
          console.log("result.dataaaaaaaaaaa", result.data);
          // console.log("file.nameeeeeeee", file);
        },
        header: true,
      });
    }
  };

  const handlefileButton = () => {
    // if (fileInputRef.current) {
    //   fileInputRef.current.click();
    // }
    if (!activePopup) {
      setActivePopup(true);
    }
  };

  const shopifyCSVData = [
    {
      header: "SKY",
    },
    {
      header: "Item-no",
    },
    {
      header: "Description",
    },
    {
      header: "Location",
    },
    {
      header: "Barcode",
    },
  ];

  return (
    <section className="CsvFiles-section-os">
      <div className="container-os">
        <div className="CsvFiles-csv-upload-data-os">
          <div style={{ paddingBottom: "8px" }} className="CsvFiles-heading-os">
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
              <button onClick={handlefileButton} type="button">
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
                      {Object.entries(values).map(([key, value]) => (
                        <React.Fragment>
                          <option value={key}>{key}</option>
                          <option value={value}>{value}</option>
                        </React.Fragment>
                      ))}
                    </select>
                  ))}
                </div>
                <div className="CsvFile-mapping-select-col-os-1">
                  <h5>Shopify invetory headers</h5>
                  {shopifyCSVData.map((values, index) => (
                    <select key={index}>
                      <option value={values.header}>{values.header}</option>
                    </select>
                  ))}
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
                  {csvData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((values, valuesIndex) => (
                        <td key={valuesIndex}>{values}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CsvFiles;
