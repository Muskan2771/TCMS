/**
 * Validates form data against provided error messages and sets validation errors, including email validation.
 * @param {Object} formData - The form data to validate.
 * @param {Function} errorSetter - Function to set the validation errors.
 * @param {Object} errorMessages - Object mapping form fields to their error messages.
 * @returns {boolean} - True if the form is valid, false otherwise.
 */
const validateForm = (formData, errorSetter, errorMessages) => {
  if (
    typeof formData !== "object" ||
    typeof errorSetter !== "function" ||
    typeof errorMessages !== "object"
  ) {
    throw new Error("Invalid parameters provided to validateForm");
  }
  const validationErrors = {};

  for (const fieldName in errorMessages) {
    const errorMessage = errorMessages[fieldName];
    const fieldValue = formData[fieldName] ? String(formData[fieldName]) : "";

    // Check for leading or trailing spaces
    if (fieldValue !== fieldValue.trim()) {
      validationErrors[fieldName] = "Field contains leading or trailing spaces";
    } else if (!fieldValue) {
      // Check if the field is not empty or contains only spaces
      validationErrors[fieldName] = errorMessage;
    } else if (fieldName === "email" && !isValidEmail(fieldValue)) {
      // If the field is an email, validate the email format
      validationErrors[fieldName] = "Invalid email format";
    }
    // Additional validation checks can be added here
  }

  if (Object.keys(validationErrors).length > 0) {
    errorSetter(validationErrors);
    return false;
  } else {
    errorSetter({});
    return true;
  }
};

/**
 * Validates if the given email is in a valid format.
 * @param {string} email - The email to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default validateForm;
