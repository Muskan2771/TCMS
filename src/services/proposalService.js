import axiosInstance from '../utils/axiosInstance';

export const getAllProposals = async (query) => {
  const response = await axiosInstance.get(
    `/api/proposals?page=&size=&searchTerm=${query}`,
  );
  return response.data;
};

export const getProposalById = async (id) => {
  const response = await axiosInstance.get(`/api/proposals/${id}`);
  return response.data;
};

export const createProposal = async (proposal) => {
  const formData = new FormData();
  Object.keys(proposal).forEach((key) => {
    if (
      key !== 'proposalLogoFile' &&
      key !== 'proposalLogoUrl' &&
      key !== 'proposalLogo'
    ) {
      formData.append(key, proposal[key]);
    }
  });

  if (proposal.proposalLogoFile) {
    formData.append('proposalLogoFile', proposal.proposalLogoFile);
  }

  const response = await axiosInstance.post(
    `/api/proposals`,
    formData,
  );
  return response.data;
};

export const updateProposal = async (id, proposal) => {
  const formData = new FormData();
  Object.keys(proposal).forEach((key) => {
    if (
      key !== 'proposalLogoFile' &&
      key !== 'proposalLogoUrl' &&
      key !== 'proposalLogo'
    ) {
      formData.append(key, proposal[key]);
    }
  });

  if (proposal.proposalLogoFile) {
    formData.append('proposalLogoFile', proposal.proposalLogoFile);
  }

  const response = await axiosInstance.put(
    `/api/proposals/${id}`,
    formData,
  );
  return response.data;
};

export const deleteProposal = async (id) => {
  const response = await axiosInstance.delete(
    `/api/proposals/${id}`,
  );
  return response.data;
};

// New API methods for handling quotes and suppliers

export const getSuppliers = async () => {
  const response = await axiosInstance.get('/api/current-supplier');
  return response.data;
};

export const createSupplier = async (supplier) => {
  const response = await axiosInstance.post(
    '/api/current-supplier',
    supplier,
  );
  return response.data;
};

export const getQuotes = async (page, size, search, states) => {
  const response = await axiosInstance.get(
    `/api/quote?page=${page}&size=${size}&searchTerm=${search}&states=${states.join(
      ',',
    )}`,
  );
  if (response.status === 204) {
    return ['No Data Found'];
  }
  return response.data;
};

export const getQuoteById = async (id) => {
  const response = await axiosInstance.get(`/api/quote/${id}`);
  return response.data;
};

export const createQuote = async (quote) => {
  const response = await axiosInstance.post('/api/quote', quote);
  return response.data;
};

export const updateQuote = async (id, quote) => {
  const response = await axiosInstance.put(
    `/api/quote/${id}`,
    quote,
  );
  return response.data;
};

export const deleteQuote = async (id) => {
  const response = await axiosInstance.delete(`/api/quote/${id}`);
  return response.data;
};

export const updateQuoteState = async (updateStateObj) => {
  const response = await axiosInstance.put(
    `/api/quote/update-state`,
    updateStateObj,
  );
  return response.data;
};

export const getQuotePdf = async (id, config = {}) => {
  try {
    const response = await axiosInstance.get(
      `/api/quote/export-pdf/${id}`,
      {
        responseType: 'blob',
        ...config, // Spread the additional config (including onDownloadProgress) here
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data || 'An error occurred while fetching the PDF',
    );
  }
};

export const saveAndPrintQuote = async (quote, config = {}) => {
  const response = await axiosInstance.post(
    '/api/quote/save-and-print',
    quote,
    {
      responseType: 'blob',
      ...config, // Spread the additional config (including onDownloadProgress) here
    },
  );
  return response.data;
};
export const updateAndPrintQuote = async (quote, config = {}) => {
  const response = await axiosInstance.put(
    `/api/quote/update-and-print/${quote.id}`,
    quote,
    {
      responseType: 'blob',
      ...config, // Spread the additional config (including onDownloadProgress) here
    },
  );
  return response.data;
};

export const getQuoteExcel = async (id, config = {}) => {
  try {
    const response = await axiosInstance.get(
      `/api/quote/export-excel/${id}`,
      {
        responseType: 'blob',
        ...config, // Spread the additional config (including onDownloadProgress) here
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data || 'An error occurred while fetching the Excel file',
    );
  }
};

export const getExcelExportToPronto = async (id, config = {}) => {
  try {
    const response = await axiosInstance.get(
      `/api/quote/export-to-pronto/${id}`,
      {
        responseType: 'blob',
        ...config, // Spread the additional config (including onDownloadProgress) here
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data || 'An error occurred while fetching the Excel file',
    );
  }
};
