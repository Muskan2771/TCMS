import { toast } from "react-toastify";

export const showAlert = (type, message) => {
  switch (type) {
    case "save":
      toast.success(message || "Saved successfully!");
      break;
    case "update":
      toast.info(message || "Updated successfully!");
      break;
    case "error":
      toast.error(message || "An error occurred!");
      break;
    default:
      toast(message); // Default toast for custom messages
  }
};

// Example usage with a promise
export const handlePromiseWithAlert = (
  promise,
  successMessage,
  errorMessage
) => {
  promise
    .then(() => showAlert("success", successMessage))
    .catch(() => showAlert("error", errorMessage));
};
