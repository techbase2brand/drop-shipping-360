import React from "react";
import './Button.css'

const Button = ({ type, onClick, title }) => {
  return (
    <div className="Button-os">
      <button type={type} onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

export default Button;
