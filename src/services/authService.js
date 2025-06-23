import axiosInstance from '../utils/axiosInstance';
import Cookies from 'js-cookie';
import { showAlert } from '../components/common/toastify/ToastContainer';
import { jwtDecode } from 'jwt-decode';

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post(
      '/api/auth/authenticate',
      credentials,
      { timeout: 10000 },
    );
    const decoded = jwtDecode(response.data.token);
    const expiryDate = new Date(decoded.exp * 1000);
    Cookies.set('token', response.data.token, {
      expires: expiryDate,
      path: '/',
    });
    // Cookies.set("email", credentials.email, {
    //   expires: expiryDate,
    //   path: "/",
    // });
    
    // Check if email is dummyStudent@gmail.com and redirect to user side
    if (credentials.email === 'dummyStudent@gmail.com') {
      window.location.href = '/user';
    }
    
    console.log('Login successful',decoded);
    return decoded;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      showAlert('error', 'Request Timeout');
    } else if (error.response && error.response.data) {
      showAlert('error', error.response.data || 'An error occurred');
    } else {
      showAlert('error', 'An error occurred');
    }
    throw error;
  }
};

export const logout = async () => {
  console.log("logout");
  try {
    // const res = await axiosInstance.post('/api/auth/logout');
    showAlert('update', 'Logout Successfully');
    Cookies.remove('token', { path: '/' });
  } catch (error) {
    console.log(error,"logout error");
  }
};

export const getAccess = async () => {
  try {
    const res = await axiosInstance.get(
      '/api/role-menu-submenu-accesses',
    );
    return res.data.accessControl || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const checkSession = () => {
  const token = Cookies.get('token');

  if (!token) {
    return false;
  }

  const decoded = jwtDecode(token);
  const expiryTime = decoded.exp * 1000;
  const currentTime = Date.now();

  if (currentTime >= expiryTime) {
    import('sweetalert2').then((Swal) => {
      Swal.default
        .fire({
          title: 'Session Expired',
          text: 'Your session has expired. Please log in again.',
          icon: 'warning',
        })
        .then(() => {
          Cookies.remove('token');
        });
    });
    return false;
  } else {
    return true;
  }
};
