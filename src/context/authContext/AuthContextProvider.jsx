import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../utils/LoadingUtil';
import {
  login as loginService,
  logout as logoutService,
  getAccess as getAccessService,
  checkSession as checkSessionService,
} from '../../services/authService';

/**
 * @file Provides the AuthContextProvider component for managing user authentication.
 * @module AuthContextProvider
 */

/**
 * Represents the initial state of the user credentials.
 * @constant
 * @type {Object}
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 */
const initialState = {
  email: '',
  password: '',
};

/**
 * Provides the AuthContextProvider component.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} The AuthContextProvider component.
 */
const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userCredential, setUserCredential] = useState({ ...initialState });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [error, setError] = useState({});
  const [navMenu, setNavMenu] = useState([]);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [navSize, setNavSize] = useState('small');

  /**
   * Checks the user's session and handles session expiration.
   * @private
   */
  useEffect(() => {
    const isSessionValid = checkSessionService();
    setIsLoggedIn(isSessionValid);
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      getAccess();
    }
  }, [isLoggedIn]);

  /**
   * Validates the user's input and sets error messages if necessary.
   * @private
   * @returns {string} The validation result ("error" or "success").
   */
  const validateErrors = useCallback(() => {
    const { email, password } = userCredential;
    let hasError = false;
    const newError = {};

    if (!email) {
      newError.email = 'Email is required';
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = 'Enter a valid email address';
      hasError = true;
    }

    if (!password) {
      newError.password = 'Password is required';
      hasError = true;
    }

    setError(newError);
    return hasError ? 'error' : 'success';
  }, [userCredential]);

  /**
   * Handles the login process.
   * @private
   * @param {Event} e - The form submit event.
   */
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      const validationError = validateErrors();
      if (validationError === 'error' || isLoggingIn) {
        return;
      }
      setIsLoggingIn(true);
      startLoading();
      try {
        await loginService(userCredential);
        setError({});
        setIsLoggedIn(true);
        showAlert('save', 'Login Successfully');
        navigate('/');
        setUserCredential({ ...initialState });
      } catch (error) {
        setError({ message: error.response.data || 'An error occurred' });
      } finally {
        setIsLoggingIn(false);
        stopLoading();
      }
    },
    [
      userCredential,
      validateErrors,
      isLoggingIn,
      startLoading,
      stopLoading,
      navigate,
    ],
  );

  const getAccess = useCallback(async () => {
    startLoading();
    try {
      const accessControl = await getAccessService();
      console.log(accessControl,"navmenu");
      setNavMenu(accessControl);
      
    } catch (error) {
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  /**
   * Handles the logout process.
   * @private
   */
  const handleLogout = useCallback(async () => {
    await logoutService();
    setIsLoggedIn(false);
    setError({});
    setUserCredential({ ...initialState });
    navigate('/login'); // Navigate to the login page after logout
  }, [navigate]);

  const contextValue = useMemo(
    () => ({
      userCredential,
      setUserCredential,
      handleLogin,
      handleLogout,
      isLoading,
      isLoggedIn,
      error,
      navMenu,
      setNavMenu,
      getAccess,
      navSize,
      setNavSize,
    }),
    [
      userCredential,
      handleLogin,
      handleLogout,
      isLoading,
      isLoggedIn,
      error,
      navMenu,
      getAccess,
      navSize,
      setNavSize,
    ],
  );

  /**
   * useMemo is used here to memoize the context value object. This ensures that the context value
   * is only recalculated when one of its dependencies changes, preventing unnecessary re-renders
   * of the components that consume this context.
   */

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);
