import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, format, isValid } from "date-fns";

const CustomDateInput = ({
  value,
  label,
  name,
  placeholder = "dd-MM-yyyy",
  onChange,
  required = false,
  error,
  className = "",
  style = {},
  minDate,
  maxDate,
}) => {
  const [localError, setLocalError] = useState(error);

  const parseDate = (dateString) => {
    if (!dateString) return null;
    const parsedDate = parse(dateString, "dd-MM-yyyy", new Date());
    return isValid(parsedDate) ? parsedDate : null;
  };

  const handleInputChange = (date) => {
    if (!date) {
      setLocalError("Invalid date selected");
      return;
    }
    setLocalError("");
    const formattedDate = format(date, "dd-MM-yyyy");
    onChange(formattedDate); // Send formatted value to parent
  };

  return (
    <div className={`p-2 font-400 ${className}`} style={{ ...style }}>
      {label && (
        <div className="px-1">
          <label htmlFor={name}>
            {label}
            {required && (
              <span className="text-red-600 font-semibold">&nbsp;*</span>
            )}
          </label>
        </div>
      )}
      <div className=" "></div>
      <DatePicker
        // withPortal
        showIcon
        selected={parseDate(value) || null}
        onChange={handleInputChange}
        dateFormat="dd-MM-yyyy"
        placeholderText={placeholder}
        className="w-full border p-2 rounded-lg text-black"
        minDate={minDate}
        maxDate={maxDate}
      />
      {error && (
        <small
          style={{
            fontSize: "13px",
            height: "20px",
            display: error ? "block" : "none",
          }}
          className="text-red-600 text-break px-1 h-4 font-semibold"
        >
          {error}
        </small>
      )}
    </div>
  );
};

CustomDateInput.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
};

export default CustomDateInput;
