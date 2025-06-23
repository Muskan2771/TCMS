import axiosInstance from '../utils/axiosInstance';

/**
 * Fetches alternate products from the API.
 *
 * @param {number} currentPage - The current page number for pagination.
 * @param {number} pageSize - The number of items per page.
 * @param {string} searchQuery - The search term to filter products.
 * @returns {Promise<Object>} The response data containing alternate products.
 */
export const getAlternateProducts = async (
  currentPage,
  pageSize,
  searchQuery,
) => {
  const response = await axiosInstance.get(
    `/api/alternate-products?page=${currentPage}&size=${pageSize}&searchTerm=${searchQuery}`,
  );
  if (response.status === 204) {
    return ['No data found'];
  }
  return response.data;
};

export const createNewAlternateProduct = async (productData) => {
  const response = await axiosInstance.post(
    '/api/alternate-products',
    productData,
  );
  return response.data;
};

export const deleteAlternateProduct = async (id) => {
  const response = await axiosInstance.delete(
    `/api/alternate-products/main/${id}`,
  );
  return response.data;
};

export const updateAlternateProduct = async (productData) => {
  const response = await axiosInstance.post(
    `/api/alternate-products/update`,
    productData,
  );
  return response.data;
};

export const getAlternateProductById = async (id) => {
  const response = await axiosInstance.get(
    `/api/alternate-products/main/${id}`,
  );
  return response.data;
};
