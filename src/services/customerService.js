import axiosInstance from '../utils/axiosInstance';
import { showAlert } from '../components/common/toastify/ToastContainer';

export const getCustomers = async (page, size, search) => {
  try {
    const res = await axiosInstance.get(
      `/api/customer?page=${page}&size=${size}&searchTerm=${search}`,
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

export const createCustomer = async (customerData) => {
  try {
    const res = await axiosInstance.post(
      '/api/customer',
      customerData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    showAlert('success', 'Customer created successfully');
    return res.data;
  } catch (error) {
    showAlert('error', error.response?.data || 'An error occurred');
    throw error;
  }
};

export const updateCustomer = async (customerId, customerData) => {
  try {
    const res = await axiosInstance.put(
      `/api/customer/${customerId}`,
      customerData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    showAlert('success', 'Customer updated successfully');
    return res.data;
  } catch (error) {
    showAlert('error', error.response?.data || 'An error occurred');
    throw error;
  }
};

export const deleteCustomer = async (customerId) => {
  try {
    await axiosInstance.delete(`/api/customer/${customerId}`);
    showAlert('success', 'Customer deleted successfully');
  } catch (error) {
    showAlert('error', error.response?.data || 'An error occurred');
    throw error;
  }
};
