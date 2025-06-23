import PropTypes from "prop-types";

export const Dropdown = ({
  value,
  label,
  name,
  selectedOption,
  options = [],
  onChange,
  required = false,
  error,
  disabled = false,
  className = "",
  style = {},
  onBlur,
}) => {
  const selectProps = {
    name,
    onChange,
    disabled,
    className: ` ${className} ${disabled ? "bg-gray-200" : ""}`,
    style,
  };

  return (
    <div className={` p-2 font-400 ${className}`} style={{ ...style }}>
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
      <div className="">
        <select
          {...selectProps}
          onBlur={onBlur}
          value={value}
          // required={required}
          className={`min-w-full border p-2 rounded-lg ${
            disabled ? "bg-gray-200" : ""
          }`}
        >
          <option value="" disabled selected>
            {selectedOption || "Select an option"}
          </option>

          {options?.map((option) => (
            <option
              className="min-w-full"
              key={option.value + option.label}
              value={option.value}
            >
              {option?.label}
            </option>
          ))}
        </select>

        <>
          {error && (
            <small
              style={{
                fontSize: "12px",
                height: "20px",
                display: error ? "block" : "none",
              }}
              className="text-red-600 font-semibold text-break px-1 h-4"
            >
              {error}
            </small>
          )}
        </>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};
