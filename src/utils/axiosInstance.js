// axiosConfig.js

import axios from "axios";
import Cookies from "js-cookie";
import { showAlert } from "../components/"; // Import showAlert

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Get the token from wherever it's stored

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      // if (status === 500) {
      //   showAlert("error", "Something went wrong. ");
      // }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
