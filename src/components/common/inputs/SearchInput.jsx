import React from "react";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search",
  onSearchClick,
  className = "",
  style = {},
}) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearchClick();
    }
  };

  return (
    <div
      className={`flex items-center border border-gray-300 rounded-3xl px-2 ${className}`}
      style={style}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-grow p-2 rounded-full focus:outline-none"
        onKeyPress={handleKeyPress}
      />
      <button
        type="button"
        onClick={onSearchClick}
        className="flex items-center justify-center p-2 text-black focus:outline-none bg-gray-200 rounded-full"
      >
        <FaSearch />
      </button>
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  onSearchClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default SearchInput;
