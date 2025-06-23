import axiosInstance from "../utils/axiosInstance";
import { showAlert } from "../components/common/toastify/ToastContainer";

export const uploadProductFile = async (file, config = {}) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axiosInstance.post(
      "/api/margin-calculation/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        ...config,
      }
    );
    showAlert("success", "File uploaded successfully");
    return res.data;
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error.response && error.response.data instanceof Blob) {
      const text = await error.response.data.text();
      errorMessage = text || errorMessage;
    } else {
      errorMessage = error.response?.data || errorMessage;
    }
    showAlert("error", errorMessage);
    throw error;
  }
};

export const downloadProductFileCSV = async () => {
  try {
    const res = await axiosInstance.get(
      "/api/margin-calculation/csv",
      {
        responseType: "blob",
      }
    );
    return res.data;
  } catch (error) {
    showAlert("error", error.message || "An error occurred");
    throw error;
  }
};

export const downloadProductFileExcel = async () => {
  try {
    const res = await axiosInstance.get(
      "/api/margin-calculation/excel",
      {
        responseType: "blob",
      }
    );
    showAlert("success", "File downloaded successfully");
    return res.data;
  } catch (error) {
    showAlert("error", error.message || "An error occurred");
    throw error;
  }
};

/**
 * Calculates the margin based on the provided parameters.
 *
 * @param {string} groupName - The name of the group.
 * @param {string} childGroup - The name of the child group.
 * @param {number} cost - The cost value.
 * @param {number} cost1 - The float value of the cost.
 * @param {number} conversionFactor - The conversion factor.
 * @returns {Promise<Object>} The result of the margin calculation.
 * @throws Will throw an error if the API request fails.
 */
export const calculateMargin = async (
  groupName,
  childGroup,
  cost,
  cost1,
  conversionFactor
) => {
  try {
    const res = await axiosInstance.get(
      `/api/margin-calculation/calculate?groupName=${encodeURIComponent(
        groupName
      )}&childGroup=${encodeURIComponent(childGroup)}&cost=${encodeURIComponent(
        cost
      )}&cost1=${encodeURIComponent(
        cost1
      )}&conversionFactor=${encodeURIComponent(conversionFactor)}`
    );
    return res.data;
  } catch (error) {
    showAlert("error", error.response?.data || "An error occurred");
    throw error;
  }
};

export const calculateMarginByFile = async (file, config = {}) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axiosInstance.post(
      "/api/margin-calculation/calculate-by-file",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
        ...config,
      }
    );
    return res.data;
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error.response && error.response.data instanceof Blob) {
      const text = await error.response.data.text();
      errorMessage = text || errorMessage;
    } else {
      errorMessage = error.response?.data || errorMessage;
    }
    showAlert("error", errorMessage);
    throw error;
  }
};

export const getAllDistinctProductName = async () => {
  try {
    const res = await axiosInstance.get(
      "/api/margin-calculation/group-names"
    );
    return res.data;
  } catch (error) {
    showAlert("error", error.response?.data || "An error occurred");
    throw error;
  }
};

export const getAllMinorGroupList = async (groupName) => {
  try {
    const res = await axiosInstance.get(
      `/api/margin-calculation/child-group-names?groupName=${groupName}`
    );
    return res.data;
  } catch (error) {
    showAlert("error", error.response?.data || "An error occurred");
    throw error;
  }
};
