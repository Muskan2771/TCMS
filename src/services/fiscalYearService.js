import axiosInstance from "@/utils/axiosInstance";

export const getFiscalYears = async () => {
  const response = await axiosInstance.get(
    `/api/fiscal-year/get-fiscal-years`
  );
  return response.data;
};

export const addFiscalYear = async (fiscalYear) => {
  console.log("fiscalYear", fiscalYear);
  const response = await axiosInstance.post(
    `/api/fiscal-year/add-fiscal-year`,
    { fiscalYear } // Send as an object
  );
  return response.data;
};

export const updateFiscalYear = async (fiscalYear) => {
  const response = await axiosInstance.put(
    `/api/fiscal-year/update-fiscal-year`,
    fiscalYear
  );
  return response.data;
};
