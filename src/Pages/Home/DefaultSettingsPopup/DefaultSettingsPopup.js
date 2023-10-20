import React, { useContext } from "react";
import "./DefaultSettingsPopup.css";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import TooltipIcon from "../../../Assets/tooltip-icon.svg";
import { AppContext } from "../../../App";
import Button from "../../Shared/Button/Button";
import ButtonWhite from "../../Shared/ButtonWhite/ButtonWhite";

const DefaultSettingsPopup = ({
  activePopup,
  setActivePopup,
  handleInputChange,
  form,
  handleSave,
  formError,
  handleSelectedRules,
  activeRules,
  setActiveRules,
}) => {
  const { csvData } = useContext(AppContext);

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
              <div className="select">
                <select
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
                </select>
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
                <input type="radio" name="selectionRules" value="allSku" />
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
                  <option value="">select</option>
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
