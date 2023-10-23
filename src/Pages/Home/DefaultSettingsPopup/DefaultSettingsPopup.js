import React, { useContext, useEffect, useState } from "react";
import "./DefaultSettingsPopup.css";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import TooltipIcon from "../../../Assets/tooltip-icon.svg";
import { AppContext } from "../../../App";
import Button from "../../Shared/Button/Button";
import ButtonWhite from "../../Shared/ButtonWhite/ButtonWhite";
import axios from "axios";
import Select from "react-select";

const DefaultSettingsPopup = ({
  activePopup,
  setActivePopup,
  handleInputChange,
  form,
  setForm,
  handleSave,
  formError,
  handleSelectedRules,
  activeRules,
  // nonExistTag,
  setNonExistTag,
  // setFormError,
}) => {
  const { csvData } = useContext(AppContext);
  const [data, setData] = useState([]);
  // const [nonExistTag, setNonExistTag] = useState([]);

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

  // const HandleSelectTags = async (selectedOptions) => {
  //   const selectedValues = selectedOptions.map((option) => option.value);
  //   setForm((prevState) => ({
  //     ...prevState,
  //     selectTag: selectedValues,
  //   }));

  //    // when tag selected
  //     if (form.selectionRules === "tag") {
  //       // tag checking api
  //       const tagUrl = "http://localhost:4000/api/metchShopTags";
  //       console.log("form.selectTag", form.selectTag);
  //       try {
  //         const response = await axios.post(tagUrl, {
  //           tags: form.selectTag,
  //         });
  //         console.log("tagApiResponseeeee", response);
  //         // if (response) {
  //         //   setActiveRules(val);
  //         // }
  //       } catch (error) {
  //         console.log("tagApiError", error);
  //         // setActiveRules("rules");
  //       }
  //     }
  // };

  // const HandleSelectTags = (selectedOptions) => {
  //   const selectedValues = selectedOptions.map((option) => option.value);
  //   setForm((prevState) => ({
  //     ...prevState,
  //     selectTag: selectedValues,
  //     singleTag: selectedValues,
  //   }));
  // };

  useEffect(() => {
    const fetchData = async () => {
      if (form.selectionRules === "tag" && form.selectTag.length > 0) {
        const tagUrl = "http://localhost:4000/api/metchShopTags";
        try {
          const response = await axios.post(tagUrl, {
            tags: form.singleTag,
          });
          console.log("form.selectTag", form.singleTag);
          setNonExistTag(response?.data?.status);
          // console.log("nonExistTaggggggg try", nonExistTag);
        } catch (error) {
          console.log("metchShopTags errorrrr", error);
          // console.log("object message: ", error?.response?.data?.status);
          setNonExistTag(error?.response?.data?.status);
          // console.log("nonExistTaggggggg catch", nonExistTag);
        }
      }
    };

    fetchData(); // Call the async function here
    // if (nonExistTag) {
    //   setFormError((prevState) => ({
    //     ...prevState,
    //     selectTag: "",
    //   }));
    // }
  }, [form.selectionRules, form.selectTag]);

  const HandleSelectTags = (selectedOptions) => {
    setForm((prevState) => ({
      ...prevState,
      selectTag: selectedOptions.map((option) => option.value),
      singleTag: selectedOptions[selectedOptions.length - 1]?.value, // Set the latest value in singleTag
    }));
  };

  return (
    <section className="DefaultSettingsPopup-os">
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
              <div className="select-tags-os">
                {/* <select
                  name="selectTag"
                  value={form.selectTag}
                  onChange={handleInputChange}
                  disabled={form.selectionRules !== "tag"}
                >
                  <option value="">select</option>
                  {csvData.length > 0 &&
                    csvData.map((tag, index) => (
                      <option key={index} value={tag.Protact_tags}>
                        {tag.Protact_tags}
                      </option>
                      
                    ))}
                </select> */}
                <Select
                  name="selectTag"
                  value={form.selectTag.map((value) => ({
                    value,
                    label: value,
                  }))}
                  // onChange={(selectedOptions) => {
                  //   const selectedValues = selectedOptions.map(
                  //     (option) => option.value
                  //   );

                  //   setForm((prevState) => ({
                  //     ...prevState,
                  //     selectTag: selectedValues,
                  //   }));
                  // }}

                  onChange={HandleSelectTags}
                  isDisabled={form.selectionRules !== "tag"}
                  isMulti={true}
                  options={csvData.map((tag, index) => ({
                    value: tag.Protact_tags,
                    label: tag.Protact_tags,
                  }))}
                />

                <div className="select__arrow"></div>
              </div>
            </div>
            {formError.selectTag && (
              <div className="ereror-message-os pb-3">
                {formError.selectTag}
              </div>
            )}
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
                <input type="radio" name="selectionRules" value="selectSku" />
                <div className="control-indicatoros"></div>
                Specific SKU's in the uploaded sheet
              </label>
              <div className="tooptip-icon-os">
                <img src={TooltipIcon} alt="" />
                <span>Tooltip message</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="button"
                onClick={() => {
                  handleSelectedRules("selectionRules");
                }}
                title="Continue"
              />
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
                        <option key={index} value={locationId[1]}>
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
            <div className="DefaultSettingsPopup-submit-os">
              <ButtonWhite
                type={"button"}
                onClick={() => {
                  handleSelectedRules("rules");
                }}
                title={"Back"}
              />
              <Button type={"button"} onClick={handleSave} title={"Save"} />
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default DefaultSettingsPopup;
