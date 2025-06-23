// Ensure no usage of `process` module in this file

import { showAlert } from '@/components';
import axiosInstance from '@/utils/axiosInstance';

// Example of replacing process.env with a direct value or a safer alternative

export const getEstimatedArrivals = async (page, size, search) => {
  try {
    const res = await axiosInstance.get(
      `/api/estimated-arrival/get-eta-files?page=${page}&size=${size}&searchTerm=${search}`,
    );
    return res.data;
  } catch (error) {
    showAlert('error', error.response?.data || 'An error occurred');
    throw error;
  }
};

export const uploadETAFile = async (file, config = {}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axiosInstance.post(
      `/api/estimated-arrival/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...config,
      },
    );
    showAlert('success', 'File uploaded successfully');
    return res.data;
  } catch (error) {
    showAlert('error', error.response.data);
    throw error;
  }
};

export const unloadETAFileBYId = async (id) => {
  try {
    const res = await axiosInstance.delete(
      `/api/estimated-arrival/unload-file?fileId=${id}`,
    );
    showAlert('success', 'File deleted successfully');
    return res.data;
  } catch (error) {
    showAlert('error', error.response?.data || 'An error occurred');
    throw error;
  }
};

export const downloadETAFile = async (whseList) => {
  try {
    const res = await axiosInstance.post(
      `/api/estimated-arrival/export-csv`,
      whseList,
      {
        responseType: 'blob',
      },
    );
    console.log(res);
    return res.data;
  } catch (error) {
    showAlert('error', error.response?.data || 'An error occurred');
    throw error;
  }
};
