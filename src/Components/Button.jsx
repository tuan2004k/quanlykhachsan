import React from "react";

const Button = ({ type = "button", onClick, className, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w fullpy-3 px-6   ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
