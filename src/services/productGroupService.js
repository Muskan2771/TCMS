import axiosInstance from "../utils/axiosInstance";

export const getAllProductGroups = async (query) => {
  const response = await axiosInstance.get(
    `/api/product-groups?page=&size=&searchTerm=${query}`
  );
  return response.data;
};

export const getProductGroupsByPage = async (
  currentPage,
  pageSize,
  searchQuery
) => {
  const response = await axiosInstance.get(
    `/api/product-groups?page=${currentPage}&size=${pageSize}&searchTerm=${searchQuery}`
  );
  return response.data;
};

export const getProductGroupById = async (id) => {
  const response = await axiosInstance.get(
    `/api/product-groups/${id}`
  );
  return response.data;
};

export const createProductGroup = async (productGroup) => {
  const response = await axiosInstance.post(
    `/api/product-groups`,
    productGroup
  );
  return response.data;
};

export const updateProductGroup = async (id, productGroup) => {
  const response = await axiosInstance.put(
    `/api/product-groups/${id}`,
    productGroup
  );
  return response.data;
};

export const deleteProductGroup = async (id) => {
  const response = await axiosInstance.delete(
    `/api/product-groups/${id}`
  );
  return response.data;
};
