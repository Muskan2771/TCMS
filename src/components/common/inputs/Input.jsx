import PropTypes from "prop-types";
import { useState, useEffect, forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React from "react";

export const Input = forwardRef(
  (
    {
      value,
      label,
      name,
      placeholder,
      type = "text", // Default type to text
      onChange,
      required = false,
      step,
      error,
      minLength,
      errType,
      disabled = false,
      onBlur,
      onFocus,
      min,
      max,
      defaultValue,
      className = "",
      style = {},
      rows = 3, // Default rows for textarea
      checked = false, // Added for checkbox
      accept, // Added for file input accept attribute
    },
    ref
  ) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [localError, setLocalError] = useState(error);

    useEffect(() => {
      setLocalError(error);
    }, [error]);

    const inputProps = {
      name,
      placeholder,
      onChange,
      onBlur,
      onFocus,
      disabled,
      className: `form-control ${className}`,
      style,
      ref, // Add ref here
    };

    const renderInputField = () => {
      if (type === "textarea") {
        return (
          <div className="relative">
            <textarea
              {...inputProps}
              rows={rows}
              value={value}
              id={name}
              className="w-full border p-2 rounded-lg text-black"
            />
          </div>
        );
      } else if (type === "checkbox") {
        return (
          <div className="relative flex items-center">
            <input
              {...inputProps}
              type="checkbox"
              id={name}
              checked={checked} // For checkbox, use `checked` prop
              className="form-checkbox"
            />
            {label && (
              <label htmlFor={name} className="ml-2">
                {label}
              </label>
            )}
          </div>
        );
      } else if (type === "date") {
        return (
          <div className="relative">
            <input
              {...inputProps}
              className="w-full border p-1 rounded-lg text-black"
              type="date"
              defaultValue={defaultValue}
              value={value ? value.split("-").reverse().join("-") : ""}
              minLength={minLength}
              id={name}
              onWheel={(e) => e.target.blur()} // Prevent value change on scroll
              max={max}
              maxLength={max}
              min={min}
              step={type === "number" ? step : undefined}
              accept={type === "file" ? accept : undefined}
            />
          </div>
        );
      } else {
        return (
          <div className="relative">
            <input
              {...inputProps}
              className="w-full border p-1 rounded-lg text-black"
              type={passwordVisible && type === "password" ? "text" : type}
              defaultValue={defaultValue}
              value={type === "file" ? undefined : value} // Ensure file input does not use value prop
              minLength={minLength}
              id={name}
              max={max}
              maxLength={max}
              onWheel={(e) => e.target.blur()} // Prevent value change on scroll
              min={min}
              step={type === "number" ? step : undefined}
              accept={type === "file" ? accept : undefined} // Accept attribute for file input
              checked={checked}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                style={{ cursor: "pointer" }}
              >
                {passwordVisible ? (
                  <FaEyeSlash className="text-black" />
                ) : (
                  <FaEye className="text-black" />
                )}
              </button>
            )}
          </div>
        );
      }
    };

    return (
      <div className={`p-2 font-400 ${className}`} style={{ ...style }}>
        {type !== "checkbox" && label && (
          <div className="px-1">
            <label htmlFor={name}>
              {label}
              {required && (
                <span className="text-red-600 font-semibold">&nbsp;*</span>
              )}
            </label>
          </div>
        )}
        <div>
          {renderInputField()}
          {type !== "checkbox" && (
            <>
              {type === "email" || name === "prontoAccountCode" ? (
                <>
                  {error && (
                    <small
                      style={{
                        fontSize: "13px",
                        height: "20px",
                        display: error ? "block" : "none",
                      }}
                      className={
                        errType === "valid"
                          ? "text-green-700 text-break px-1 h-4"
                          : "text-red-600 text-break px-1 h-4 font-semibold"
                      }
                    >
                      {error}
                    </small>
                  )}
                </>
              ) : (
                <>
                  {errType !== "valid" && localError && (
                    <>
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
                    </>
                  )}
                  {errType === "valid" && (
                    <>
                      {error && (
                        <small
                          style={{
                            fontSize: "12px",
                            height: "20px",
                            display: error ? "block" : "none",
                          }}
                          className="text-red-600 text-break px-1 h-4 font-semibold"
                        >
                          {error}
                        </small>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  step: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
  rows: PropTypes.number,
  minLength: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  checked: PropTypes.bool, // Added for checkbox
  accept: PropTypes.string, // Added for file input accept attribute
};

// Enforce the disabled and accept attributes
Input.defaultProps = {
  disabled: false,
  accept: "image/*", // Default accept attribute for file input
};
