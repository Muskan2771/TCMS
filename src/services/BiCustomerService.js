import axiosInstance from '@/utils/axiosInstance';
import { showAlert } from '@/components/common/toastify/ToastContainer';

export const getBiCustomers = async (page, size, search) => {
  try {
    const res = await axiosInstance.get(
      `/api/sales-customers?page=${page}&size=${size}&searchTerm=${search}`,
    );
    if (res.status === 204) {
      return ['No Data Found'];
    }
    return res.data;
  } catch (error) {
    showAlert('error', error.response?.data || 'An error occurred');
    throw error;
  }
};

export const createBiCustomer = async (customerData) => {
  try {
    const res = await axiosInstance.post(
      '/api/sales-customers',
      customerData,
    );
    showAlert('success', 'Customer created successfully');
    return res.data;
  } catch (error) {
    showAlert('error', error.response?.data || 'An error occurred');
    throw error;
  }
};

export const updateBiCustomer = async (customerId, customerData) => {
  try {
    const res = await axiosInstance.put(
      `/api/sales-customers/${customerId}`,
      customerData,
    );
    showAlert('success', 'Customer updated successfully');
    return res.data;
  } catch (error) {
    showAlert('error', error.response?.data || 'An error occurred');
    throw error;
  }
};

export const deleteBiCustomer = async (customerId) => {
  try {
    await axiosInstance.delete(
      `/api/sales-customers/${customerId}`,
    );
    showAlert('success', 'Customer deleted successfully');
  } catch (error) {
    showAlert('error', error.response?.data || 'An error occurred');
    throw error;
  }
};

export const uploadBiCustomersFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axiosInstance.post(
      '/api/sales-customers/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res.data;
  } catch (error) {
    showAlert('error', error.response?.data || 'An error occurred');
    throw error;
  }
};

export const confirmBiCustomers = async (data) => {
  try {
    const res = await axiosInstance.post(
      '/api/sales-customers/confirm-updates',
      data,
    );
    return res.data;
  } catch (error) {
    showAlert('error', error.response?.data || 'An error occurred');
    throw error;
  }
};

export const getSalesReps = async () => {
  try {
    const res = await axiosInstance.get('/api/sales-rep');
    return res.data;
  } catch (error) {
    showAlert('error', error.response?.data || 'An error occurred');
    throw error;
  }
};

export const sendBiCustommerMonthlyReport = async () => {
  try {
    const res = await axiosInstance.post(
      '/api/sales-customers/send-bi-customer-monthly-report',
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
