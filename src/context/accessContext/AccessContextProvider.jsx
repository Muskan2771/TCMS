/**
 * AccessContextProvider component that provides access control context to its children.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} The AccessContextProvider component.
 */

/**
 * Custom hook to use the AccessContext.
 *
 * @returns {Object} The context value.
 */

/**
 * Fetches the menu and submenu data from the API.
 *
 * @async
 * @function
 * @returns {Promise<void>}
 */

/**
 * Fetches the menu and submenu data for a specific user by ID.
 *
 * @async
 * @function
 * @param {string} id - The user ID.
 * @returns {Promise<void>}
 */

/**
 * Saves the access control data.
 *
 * @async
 * @function
 * @param {Object} accessMenu - The access menu data.
 * @returns {Promise<void>}
 */

/**
 * Clears the access control data.
 *
 * @function
 * @returns {void}
 */
import { createContext, useCallback, useContext, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { showAlert, ConfirmAlert } from '../../components'; // Assuming ConfirmAlert is imported from components
import AccessMenuModel from '../../model/setting/AccessMenu.model';
import { useNavigate } from 'react-router-dom'; // To navigate programmatically

const AccessContext = createContext({
  accessMenu: [],
  setAccessMenu: () => {},
  initialState: {},
  getMenuAndSubMenu: () => {},
  getMenuAndSubMenuByUser: (id) => {},
  saveAccess: (accessMenu) => {},
  clearData: () => {},
});

export const useAccess = () => {
  return useContext(AccessContext);
};

const AccessContextProvider = ({ children }) => {
  const [response, setResponse] = useState([]);
  const { accessMenu, setAccessMenu, initialState } = AccessMenuModel();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const getMenuAndSubMenu = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/api/menu-submenu');
      setResponse(res.data);
    } catch (error) {
      showAlert('error', error?.response?.data || 'An error occurred');
    }
  }, []);

  const getMenuAndSubMenuByUser = useCallback(
    async (id) => {
      try {
        const res = await axiosInstance.get(
          `/api/role-menu-submenu-accesses/${id}`,
        );
        setAccessMenu(res.data);
      } catch (error) {
        showAlert('error', error?.response?.data || 'An error occurred');
      }
    },
    [setAccessMenu],
  );

  const saveAccess = useCallback(async (accessMenu) => {
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
      navigate('/user-access'); // Navigate to the desired route
      clearData();
    } catch (error) {
      showAlert(
        'error',
        error?.response?.data || 'An error occurred while saving access',
      );
    }
  }, []);

  const clearData = () => {
    setAccessMenu(initialState);
  };

  return (
    <AccessContext.Provider
      value={{
        getMenuAndSubMenu,
        response,
        getMenuAndSubMenuByUser,
        accessMenu,
        setAccessMenu,
        initialState,
        saveAccess,
        clearData, // Expose the saveAccess function
      }}>
      {children}
    </AccessContext.Provider>
  );
};

export default AccessContextProvider;
