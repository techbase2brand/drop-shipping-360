import React from "react";
import "./Input.css";

const Input = ({ type, name, required, onChange, placeholder, label, Asterisk }) => {
  return (
    <div className="Input-os">
      {label && (
        <label>
          {label}
          {Asterisk && <span>{Asterisk}</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
