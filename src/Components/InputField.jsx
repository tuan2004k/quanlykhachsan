import React from "react";
import clsx from "clsx";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 font-semibold text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500",
          className
        )}
      />
    </div>
  );
};

export default InputField;
