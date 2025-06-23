import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Typeahead = forwardRef(
  (
    {
      options,
      label,
      labelKey,
      placeholder,
      onChange,
      selected,
      required,
      createNewLabel,
      handleCreateNew,
      handleOpenModal, // New prop to handle opening modal
      closeError,
      disabled,
      disabledCreateNew,
      onQueryChange, // New prop to handle query changes outside the component
      hideErr,
      custErr,
      onBlur, // Accept onBlur prop
      customHeight,
    },
    ref,
  ) => {
    const [query, setQuery] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef(null);
    const [exactMatch, setExactMatch] = useState(false);
    let blurTimeout;

    useImperativeHandle(ref, () => ({
      clear() {
        clearTimeout(blurTimeout); // Abort handleBlur function
        setQuery('');
        setFilteredOptions([]);
        setIsDropdownVisible(false);
        setError('');
      },
    }));

    useEffect(() => {
      if (labelKey) {
        const queryStr = query?.trim() || '';
        const queryWords = queryStr.toLowerCase().split(/\s+/); // Split query into words

        setFilteredOptions(
          options?.filter((option) => {
            const optionLabel = (option[labelKey] || '').toLowerCase();
            return queryWords.every((word) => optionLabel.includes(word)); // Check if all words are present
          }),
        );

        const foundExactMatch = options?.find(
          (option) =>
            (option[labelKey] || '').toLowerCase() === queryStr.toLowerCase(),
        );
        setExactMatch(!!foundExactMatch);
      }
    }, [query, options, labelKey]);

    useEffect(() => {
      setError('');
    }, [closeError]);

    useEffect(() => {
      if (selected.length > 0) {
        setQuery(selected[0][labelKey] || '');
      }
    }, [selected, labelKey]);

    useEffect(() => {
      if (onQueryChange) {
        onQueryChange(query);
      }
    }, [query, onQueryChange]);

    useEffect(() => {
      return () => {
        clearTimeout(blurTimeout); // Clear timeout on unmount
      };
    }, []);

    const handleInputChange = (e) => {
      if (!disabled) {
        setQuery(e.target.value || '');
        setIsDropdownVisible(true);
        setError('');
      }
    };

    const handleOptionSelect = (option) => {
      if (!disabled) {
        setQuery(option[labelKey] || '');
        onChange([option]);
        setIsDropdownVisible(false);
        clearTimeout(blurTimeout); // Abort handleBlur function
        setError('');
        if (handleOpenModal) {
          console.log(
            'handleOpenModal prop is defined, calling it with option:',
            option,
          );
          setIsDropdownVisible(false);
          handleOpenModal(option);
        }
      }
    };

    const handleBlur = () => {
      if (!disabled) {
        blurTimeout = setTimeout(() => {
          setIsDropdownVisible(false);
          if (onBlur) {
            onBlur();
          }
          if (query && (!selected.length || selected[0][labelKey] !== query)) {
            setError(`Value does not match ${label}`);
          } else {
            setError('');
          }
        }, 400);
      }
      return () => clearTimeout(blurTimeout); // Clear any existing timeout
    };

    const handleCreateNewOption = async () => {
      if (!disabled) {
        const trimmedQuery = query.trim();
        clearTimeout(blurTimeout); // Abort handleBlur function
        const exactMatch = options.find(
          (option) =>
            (option[labelKey] || '').toLowerCase() ===
            trimmedQuery.toLowerCase(),
        );

        const partialMatch = options.find((option) =>
          (option[labelKey] || '')
            .toLowerCase()
            .includes(trimmedQuery.toLowerCase()),
        );

        if (!exactMatch && handleCreateNew) {
          const newOption = await handleCreateNew(trimmedQuery);
          if (newOption) {
            handleOptionSelect(newOption);
            clearTimeout(blurTimeout); // Abort handleBlur function
          }
        } else if (exactMatch) {
          handleOptionSelect(exactMatch);
        } else if (partialMatch) {
          const newOption = await handleCreateNew(trimmedQuery);
          if (newOption) {
            handleOptionSelect(newOption);
            clearTimeout(blurTimeout); // Abort handleBlur function
          }
        }
      }
    };

    const handleFocus = () => {
      if (!disabled) {
        setIsDropdownVisible(true);
      }
    };

    return (
      <div className="p-2 font-400 relative" onBlur={handleBlur}>
        {label && (
          <div className="px-1">
            <label htmlFor={labelKey}>
              {label}
              {required && (
                <span className="text-red-600 text-break px-1 h-4 font-semibold">
                  &nbsp;*
                </span>
              )}
            </label>
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          id="typeahead"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="w-full border p-2 rounded-lg border-gray-300"
          disabled={disabled}
        />
        {isDropdownVisible && !disabled && (
          <motion.ul
            className={`absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 overflow-auto shadow-lg ${
              customHeight ? `max-h-[700px]` : 'max-h-60'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}>
            {filteredOptions?.map((option, index) => (
              <motion.li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleOptionSelect(option)}
                whileHover={{ scale: 1.02 }}
                dangerouslySetInnerHTML={{
                  __html: option[labelKey],
                }}></motion.li>
            ))}
            {!disabledCreateNew && query && !exactMatch && (
              <motion.li
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleCreateNewOption}
                whileHover={{ scale: 1.02 }}>
                {createNewLabel} "{query.trim()}"
              </motion.li>
            )}
          </motion.ul>
        )}
        {error ? (
          <>
            {!hideErr
              ? error && (
                  <div className="text-red-600 text-break px-1 h-4 text-xs font-semibold">
                    {error}
                  </div>
                )
              : ''}
          </>
        ) : (
          <div className="text-red-600 text-break px-1 h-4 text-xs font-semibold">
            {error ? error : custErr}
          </div>
        )}
      </div>
    );
  },
);

Typeahead.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string,
  labelKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(PropTypes.object),
  isInvalid: PropTypes.bool,
  required: PropTypes.bool,
  createNewLabel: PropTypes.string,
  handleCreateNew: PropTypes.func,
  handleOpenModal: PropTypes.func, // Add PropType for new callback
  disabled: PropTypes.bool,
  disabledCreateNew: PropTypes.bool,
  onQueryChange: PropTypes.func, // Add PropType for new callback
  custErr: PropTypes.string,
};

Typeahead.defaultProps = {
  placeholder: 'Search...',
  selected: [],
  isInvalid: false,
  required: false,
  createNewLabel: 'Create new',
  handleCreateNew: null,
  handleOpenModal: null, // Default to null if not provided
  disabled: false,
  disabledCreateNew: false,
  onQueryChange: null, // Default to null if not provided
};

export default Typeahead;
