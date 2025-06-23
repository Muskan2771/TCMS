import axiosInstance from '@/utils/axiosInstance';
import { showAlert } from '@/components/common/toastify/ToastContainer';

export const getQuickNotes = async () => {
  try {
    const res = await axiosInstance.get('/api/quick-notes');
    if (res.status === 204) {
      return ['No Data Found'];
    }
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postQuickNotes = async (data) => {
  try {
    const res = await axiosInstance.post('/api/quick-notes', data);
    showAlert('success', res.data);
  } catch (error) {
    throw error;
  }
};

export const deleteQuickNotes = async (id) => {
  try {
    const res = await axiosInstance.delete(
      `/api/quick-notes/${id}`,
    );
    showAlert('success', res.data);
  } catch (error) {
    throw error;
  }
};

export const updateQuickNotes = async (id, data) => {
  try {
    const res = await axiosInstance.put(
      `/api/quick-notes/${id}`,
      data,
    );
    showAlert('success', res.data);
  } catch (error) {
    throw error;
  }
};

export const getClientResources = async () => {
  try {
    const res = await axiosInstance.get('/api/client-resources');
    if (res.status === 204) {
      return [];
    }
    return res.data.map((resource) => ({
      id: resource.id,
      title: resource.title,
      link: resource.link,
      assignedRoleId: resource.assignedRoleId,
      createdDate: resource.createdDate,
      updatedDate: resource.updatedDate,
    }));
  } catch (error) {
    throw error;
  }
};

export const postClientResources = async (data) => {
  try {
    const res = await axiosInstance.post(
      '/api/client-resources',
      data,
    );
    showAlert('success', res.data);
  } catch (error) {
    throw error;
  }
};

export const deleteClientResources = async (id) => {
  try {
    const res = await axiosInstance.delete(
      `/api/client-resources/${id}`,
    );
    showAlert('success', res.data);
  } catch (error) {
    throw error;
  }
};

export const updateClientResources = async (id, data) => {
  try {
    const res = await axiosInstance.put(
      `/api/client-resources/${id}`,
      data,
    );
    showAlert('success', res.data);
  } catch (error) {
    throw error;
  }
};

export const getNotification = async () => {
  try {
    const res = await axiosInstance.get('/api/notifications');
    if (res.status === 204) {
      return ['No Data Found'];
    }
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postNotification = async (data) => {
  try {
    const res = await axiosInstance.post(
      '/api/notifications',
      data,
    );
    showAlert('success', res.data);
  } catch (error) {
    throw error;
  }
};

export const deleteNotification = async (id) => {
  try {
    const res = await axiosInstance.delete(
      `/api/notifications/${id}`,
    );
    showAlert('success', res.data);
  } catch (error) {
    throw error;
  }
};

export const updateNotification = async (id, data) => {
  try {
    const res = await axiosInstance.put(
      `/api/notifications/${id}`,
      data,
    );
    showAlert('success', res.data);
  } catch (error) {
    throw error;
  }
};
