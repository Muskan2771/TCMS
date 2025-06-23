import { showAlert } from '@/components';
import axiosInstance from '@/utils/axiosInstance';

export const getAllStates = async () => {
  const response = await axiosInstance.get(`/api/state`);
  return response.data;
};

export const saveAccountForm = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/api/new-account-form/save`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const saveAndSendMailAccountForm = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/api/new-account-form/save-send-mail`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const isProntoCodeUnique = async (prontoCode) => {
  try {
    const response = await axiosInstance.get(
      `/api/new-account-form/isProntoCodeUnique?prontoCode=${prontoCode}`,
    );
    return response.data;
  } catch (error) {
    showAlert('error', error.response.data);
    throw error;
  }
};

export const getAllAccountForm = async (currentPage, pageSize, searchTerm) => {
  try {
    const response = await axiosInstance.get(
      `/api/new-account-form?page=${currentPage}&size=${pageSize}&searchTerm=${searchTerm}`,
    );
    return response;
  } catch (error) {
    showAlert('error', error.response.data);
    throw error;
  }
};

export const updatedAccountForm = async (data, id) => {
  try {
    const response = await axiosInstance.put(
      `/api/new-account-form/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    showAlert('error', error.response.data);
    throw error;
  }
};
export const updatedAndSendMailAccountForm = async (data, id) => {
  try {
    const response = await axiosInstance.put(
      `/api/new-account-form/update-send-mail/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    showAlert('error', error.response.data);
    throw error;
  }
};

export const deleteAccountForm = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/new-account-form/${id}`,
    );
    return response.data;
  } catch (error) {
    showAlert('error', error.response.data);
    throw error;
  }
};

/**
 * Downloads an account form PDF by making a GET request to the specified API endpoint.
 *
 * @async
 * @function
 * @param {string} id - The unique identifier of the account form to download.
 * @param {Object} [config={}] - Optional Axios configuration object. Can include additional settings such as `onDownloadProgress`.
 * @returns {Promise<Blob>} A promise that resolves to the PDF file as a Blob.
 * @throws {Error} Throws an error if the request fails. Displays an alert with the error message.
 */
export const downloadAccountFromPdf = async (id, config = {}) => {
  try {
    const response = await axiosInstance.get(
      `/api/new-account-form/export-pdf/${id}`,
      {
        responseType: 'blob',
        ...config, // Spread the additional config (including onDownloadProgress) here
      },
    );
    return response.data;
  } catch (error) {
    showAlert('error', error.response.data);
    throw error;
  }
};
