import axiosInstance from '../utils/axiosInstance';

export const getAllProducts = async (query) => {
  const response = await axiosInstance.get(
    `/api/products?page=&size=&searchTerm=${query}`,
  );
  return response.data;
};

export const getProductsByPage = async (currentPage, pageSize, searchQuery) => {
  const response = await axiosInstance.get(
    `/api/products?page=${currentPage}&size=${pageSize}&searchTerm=${searchQuery}`,
  );
  if (response.status === 204) {
    return ['No Data Found'];
  }
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/api/products/${id}`);
  return response.data;
};

export const createProduct = async (productMaster) => {
  const response = await axiosInstance.post(
    `/api/products`,
    productMaster,
  );
  return response.data;
};

export const updateProduct = async (id, productMaster) => {
  const response = await axiosInstance.put(
    `/api/products/${id}`,
    productMaster,
  );
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(
    `/api/products/${id}`,
  );
  return response.data;
};

export const uploadProductFile = async (file, config = {}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.post(
      `/api/products/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...config,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadPromoPriceFile = async (file, config = {}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.post(
      `/api/products/upload-promo-price`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...config,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadProductCondtitionFile = async (file, config = {}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.post(
      `/api/products/upload-product-condition`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...config,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadProductNewCode = async (file, config = {}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.post(
      `/api/products/upload-new-product-code`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...config,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
