import React, { useContext, useEffect, useState } from 'react';
import validateForm from '../../utils/validateForm';
import userModel from '../../model/User.model';
import UserContext from './UserContext';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { ConfirmAlert, showAlert } from '../../components';
import { useLoading } from '../../utils/LoadingUtil';

const UserContextProvider = ({ children }) => {
  const { user, setUser, initialState } = userModel();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isEmailExist, setIsEmailExist] = useState(null);
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [salesReps, setSalesReps] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = userData.filter((user) => {
        for (let key in user) {
          if (
            user[key] &&
            user[key]
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(userData); // No search term, show all users
    }
  }, [searchTerm, userData]);

  const isValidData = (userData) => {
    const errorMessages = {
      firstName: 'First Name is required',
      lastName: 'Last Name is required',
      email: 'Email is required',
      contactNo: 'Contact number is required ',
      role: 'Role is required',
      // salesRep: "SalesRep is required",
      // department: "Department is required",
    };

    const isValid = validateForm(userData, setError, errorMessages);
    if (!isValid) {
      stopLoading();
      return 'error';
    }

    if (userData.contactNo.length < 10) {
      setError({ contactNo: 'Contact number should be 10 digits' });
      stopLoading();
      return 'error';
    }
    if (userData?.userType === true) {
      // Initialize an empty error object
      const errors = {};

      // Check for department error
      if (!userData.department || userData.department.trim() === '') {
        errors.department = 'Department is required';
      }

      // Check for salesRep error
      if (!userData.salesRep || userData.salesRep.trim() === '') {
        errors.salesRep = 'Sales Rep Id is required';
      }

      // If there are any errors, set the error state and return
      if (Object.keys(errors).length > 0) {
        setError(errors);
        return 'error';
      }

      // Proceed with the rest of the logic if no errors
    } else {
      setError({ department: null, salesRep: null });
      setUser((prevUser) => ({
        ...prevUser,
        department: null,
        salesRep: null,
      }));
    }
  };

  const checkEmailExist = async (email) => {
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ||
      /(\.\.)|(@.*@)|(@.*\.$)/.test(email)
    ) {
      setError({ email: 'Invalid email format' });
      return;
    }

    try {
      const response = await axiosInstance.get(
        '/api/user/userExistsByMail',
        {
          params: { email },
        },
      );
      if (response.data === true) {
        setError({ email: 'Email already exists' });
        setIsEmailExist(true);
      } else {
        setError({ email: 'Email is Unique  ✓ ', errType: 'valid' });
        setIsEmailExist(false);
      }
    } catch (error) {
      // Handle the error in a meaningful way, such as displaying an error message to the user
      showAlert('error', error.response?.data || 'An error occurred');
    } finally {
      stopLoading();
    }
  };

  const inviteUser = async (userData, e, closeModal) => {
    e.preventDefault();
    const checkValidation = isValidData(userData);
    if (checkValidation === 'error' || isEmailExist) return;
    if (isLoading) return; // Prevent calling multiple times

    const result = await ConfirmAlert({ confirmBtnText: 'Send Invite' });
    if (!result.isConfirmed) {
      stopLoading();
      showAlert('error', 'User invitation has been cancelled.');
      return;
    }
    startLoading();

    try {
      const response = await axiosInstance.post(
        '/api/user/inviteUser',
        userData,
      );
      showAlert('save', 'User has been invited successfully.');
      clearFormData();
      navigate('/manageuser');
      getAllUsers();
      closeModal();
    } catch (error) {
      // Handle the error in a meaningful way, such as displaying an error message to the user
      showAlert('error', error.response?.data || 'An error occurred');
    } finally {
      stopLoading();
    }
  };

  const updateUser = async (userData, e, closeModal) => {
    e.preventDefault();
    const checkValidation = isValidData(userData);
    if (checkValidation === 'error' || isEmailExist) return;
    if (isLoading) return; // Prevent calling multiple times
    console.log(userData,"userData");
    startLoading();

    try {
      const response = await axiosInstance.put(
        '/api/user/updateUser',
        userData,
      );
      showAlert('save', 'User has been Updated successfully.');
      clearFormData();
      navigate('/manageuser');
      getAllUsers();
      closeModal();
    } catch (error) {
      // Handle the error in a meaningful way, such as displaying an error message to the user
      showAlert('error', error.response?.data || 'An error occurred');
    } finally {
      stopLoading();
    }
  };

  const activateUser = async (userData, e, token) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword } = userData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError({
        firstName: firstName ? '' : 'First Name is required',
        lastName: lastName ? '' : 'Last Name is required',
        email: email ? '' : 'Email is required',
        password: password ? '' : 'Password is required',
        confirmPassword: confirmPassword ? '' : 'Confirm Password is required',
      });
      return;
    }

    if (password !== confirmPassword) {
      setError({ confirmPassword: 'Passwords do not match' });
      return;
    }

    if (password.length < 8) {
      setError({ password: 'Password must be at least 8 characters long' });
      return;
    }

    startLoading();
    setError(null);

    const data = { firstName, lastName, password, token };

    try {
      const response = await axiosInstance.post(
        '/api/auth/register',
        data,
      );
      showAlert('save', 'User has been activated successfully.');
      clearFormData();
      window.location.href = '/';
    } catch (error) {
      // Handle the error in a meaningful way, such as displaying an error message to the user
      showAlert('error', error?.response?.data || 'An error occurred');
    } finally {
      stopLoading();
    }
  };

  const forgotPassword = async (e, email) => {
    e.preventDefault();

    if (!email) {
      setError({ email: 'Email is required' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError({ email: 'Invalid email format' });
      return;
    }
    startLoading();

    try {
      const response = await axiosInstance.post(
        '/api/auth/forgot-password',
        null,
        {
          params: { email },
        },
      );
      showAlert('save', 'Password reset link has been sent to your email.');
      clearFormData();
      navigate('/');
    } catch (error) {
      // Handle the error in a meaningful way, such as displaying an error message to the user
      showAlert('error', error?.response?.data || 'An error occurred');
    } finally {
      stopLoading();
    }
  };

  const resetUserPassword = async (userData, e, token) => {
    e.preventDefault();
    const { password, confirmPassword } = userData;

    if (!password || !confirmPassword) {
      setError({
        password: 'Password is required',
        confirmPassword: 'Confirm Password is required',
      });
      return;
    }

    if (password !== confirmPassword) {
      setError({ confirmPassword: 'Passwords do not match' });
      return;
    }

    if (password.length < 8) {
      setError({
        password: 'Password must be at least 8 characters long',
        confirmPassword: 'Password must be at least 8 characters long',
      });
      return;
    }

    startLoading();

    setError(null);

    const data = { password, token };

    try {
      const response = await axiosInstance.post(
        '/api/auth/reset-password',
        data,
      );
      showAlert('save', 'Password has been reset successfully.');
      clearFormData();
      window.location.href = '/';
    } catch (error) {
      // Handle the error in a meaningful way, such as displaying an error message to the user
      showAlert('error', error?.response?.data || 'An error occurred');
    } finally {
      stopLoading();
    }
  };

  const getAllUsers = async () => {
    startLoading();

    try {
      const response = await axiosInstance.get('/api/user');
      setUserData(response.data);
    } catch (error) {
      // Handle the error in a meaningful way, such as displaying an error message to the user
      showAlert('error', error?.response?.data || 'An error occurred');
    } finally {
      stopLoading();
    }
  };

  const verifyForgotPasswordToken = async (token) => {
    validateToken(token);
    startLoading();
    try {
      await axiosInstance.get(
        '/api/validate-token/reset-password',
        {
          params: { token },
        },
      );
    } catch (error) {
      // Handle the error in a meaningful way, such as displaying an error message to the user
      showAlert('error', error?.response?.data || 'An error occurred');
      import('sweetalert2').then((Swal) => {
        Swal.default
          .fire({
            title: 'Invalid token',
            text: 'Token Has Expired. Please try again.',
            icon: 'error',
          })
          .then(() => {
            window.location.href = '/';
          });
      });
    } finally {
      stopLoading();
    }
  };

  const verifyInvitationToken = async (token) => {
    validateToken(token);
    startLoading();
    try {
      await axiosInstance.get('/api/validate-token/invitation', {
        params: { token },
      });
    } catch (error) {
      import('sweetalert2').then((Swal) => {
        Swal.default
          .fire({
            title: '',
            text: 'Token Has Expired. Please try again.',
            icon: 'error',
          })
          .then(() => {
            window.location.href = '/';
          });
      });
    } finally {
      stopLoading();
    }
  };

  const getCurrentUser = async () => {
    startLoading();

    try {
      const response = await axiosInstance.get('/api/user/getUser');
      setCurrentUser(response?.data);
    } catch (error) {
      // Handle the error in a meaningful way, such as displaying an error message to the user
      showAlert('error', error?.response?.data || 'An error occurred');
    } finally {
      stopLoading();
    }
  };

  const getSalesReps = async () => {
    try {
      const response = await axiosInstance.get(
        '/api/user/salesperson',
      );
      setSalesReps(response?.data);
    } catch (error) {
      showAlert('error', error?.response?.data || 'An Error Occured');
    } finally {
      stopLoading();
    }
  };

  const validateToken = (token) => {
    const UserToker = Cookies.get('token');
    if (UserToker) {
      import('sweetalert2').then((Swal) => {
        Swal.default
          .fire({
            title: 'User Is Already Logged In',
            text: 'Please log out to continue.',
            icon: 'error',
          })
          .then(() => {
            window.location.href = '/';
          });
      });
    }

    const decoded = jwtDecode(token);
    setUser({
      email: decoded.sub,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
    });
  };

  const clearFormData = () => {
    setUser(initialState);
    setError(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        error,
        isEmailExist,
        inviteUser,
        getAllUsers,
        clearFormData,
        isValidData,
        activateUser,
        validateToken,
        checkEmailExist,
        resetUserPassword,
        forgotPassword,
        userData,
        verifyForgotPasswordToken,
        verifyInvitationToken,
        searchTerm,
        setSearchTerm,
        setError,
        filteredUsers,
        getCurrentUser,
        getSalesReps,
        currentUser,
        setCurrentUser,
        salesReps,
        setSalesReps,
        updateUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUser = () => useContext(UserContext);
