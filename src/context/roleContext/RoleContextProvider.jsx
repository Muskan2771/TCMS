import React, { useCallback, useContext, useState } from 'react';
import RoleContext from './RoleContext';
import axiosInstance from '../../utils/axiosInstance';
import { showAlert } from '../../components';
import validateForm from '../../utils/validateForm';

const RoleContextProvider = ({ children }) => {
  const [roles, setRoles] = useState({
    id: 0,
    role: '',
  });
  const [roleRes, setRoleRes] = useState([]);
  const [department, setDepartment] = useState(null);
  const [error, setError] = useState(null);
  const [userRoleCountData, setUserRoleCountData] = useState([]);

  const isValidData = useCallback((roles) => {
    const errMsg = {
      role: 'Role is required',
    };

    const isValid = validateForm(roles, setError, errMsg);
    if (!isValid) {
      stopLoading();
      return false;
    }

    return true;
  }, []);
  const getRoles = async () => {
    // Logic to get all roles
    try {
      const response = await axiosInstance.get('/api/roles');
      setRoleRes(response.data);
    } catch (error) {
      showAlert('error', error.response.data);
    }
  };

  const getDepartment = async () => {
    // Logic to get all departments
    try {
      const response = await axiosInstance.get('/api/departments');
      setDepartment(response.data);
    } catch (error) {
      showAlert('error', error.response.data);
    }
  };

  const createRole = useCallback(
    async (roles, clickRoleShow) => {
      if (!isValidData(roles)) return;
      try {
        await axiosInstance.post('/api/roles', roles);
        showAlert('success', 'Role added successfully');
        clearFormData();
        clickRoleShow();
        getRoles();
      } catch (error) {
        setError(error);
        showAlert('error', error.response?.data || 'An error occurred');
      } finally {
      }
    },
    [getRoles, isValidData],
  );

  const userRoleCount = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/user/userRoleCounts`,
      );
      setUserRoleCountData(response.data);
    } catch (error) {
      showAlert('error', error.response.data);
    }
  }, [getRoles]);

  const clearFormData = useCallback(() => {
    setError(null);
    setRoles({ id: 0, role: '' });
  }, [setRoles]);

  return (
    <RoleContext.Provider
      value={{
        getRoles,
        roles,
        getDepartment,
        department,
        setRoles,
        error,
        setError,
        createRole,
        roleRes,
        setRoleRes,
        clearFormData,
        userRoleCount,
        userRoleCountData,
      }}>
      {children}
    </RoleContext.Provider>
  );
};

export default RoleContextProvider;
export const useRole = () => useContext(RoleContext);
