import axiosInstance from '../../utils/axiosInstance';
import { showAlert, ConfirmAlert } from '../../components'; // Assuming ConfirmAlert is imported from components

export const getMenuAndSubMenu = async () => {
  try {
    const res = await axiosInstance.get('/api/menu-submenu');
    return res.data;
  } catch (error) {
    showAlert('error', error?.response?.data || 'An error occurred');
    throw error;
  }
};

export const getMenuAndSubMenuByUser = async (id) => {
  try {
    const res = await axiosInstance.get(
      `/api/role-menu-submenu-accesses/${id}`,
    );
    return res.data;
  } catch (error) {
    showAlert('error', error?.response?.data || 'An error occurred');
    throw error;
  }
};

/**
 * Saves the access control settings for a menu.
 *
 * @async
 * @function saveAccess
 * @param {Object} accessMenu - The access menu object containing access control details.
 * @param {Array} accessMenu.accessControl - The list of access control items.
 * @throws Will throw an error if the API call fails.
 *
 * @description
 * This function validates the provided access menu, prompts the user for confirmation,
 * and sends a POST request to save the access control settings. If the access control
 * list is empty, it shows an error alert. If the user cancels the confirmation, it
 * shows a cancellation alert. On successful save, it shows a success alert. If an
 * error occurs during the API call, it shows an error alert with the error details.
 */
export const saveAccess = async (accessMenu) => {
  console.log('req data', accessMenu);
  if (accessMenu?.accessControl?.length === 0) {
    showAlert('error', 'Please select at least one menu.');
    return;
  }

  const result = await ConfirmAlert({
    confirmBtnText: 'Save Access',
  });

  if (!result.isConfirmed) {
    showAlert('error', 'Access saving cancelled');
    return;
  }

  try {
    await axiosInstance.post(
      '/api/role-menu-submenu-accesses',
      accessMenu,
    );

    showAlert('success', 'Access saved successfully');
  } catch (error) {
    showAlert(
      'error',
      error?.response?.data || 'An error occurred while saving access',
    );
    throw error;
  }
};
