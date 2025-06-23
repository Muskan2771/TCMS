import axiosInstance from '@/utils/axiosInstance';

export const uploadSalesFile = async (formData) => {
  try {
    const response = await axiosInstance.post(
      '/api/salesfile/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const getSalesFiles = async (currentPage, pageSize, searchQuery) => {
  try {
    const response = await axiosInstance.get(
      `/api/salesfile/get-sales-files?page=${currentPage}&size=${pageSize}&searchTerm=${searchQuery}`,
    );
    if (response.status === 204) {
      return ['No Data Found'];
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching sales files:', error);
    throw error;
  }
};

export const getWhrehouseList = async () => {
  try {
    const res = await axiosInstance.get(
      `/api/salesfile/distinct-whse`,
    );
    return res.data;
  } catch (error) {
    showAlert('error', error.response?.data || 'An error occurred');
    throw error;
  }
};
