import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SessionExpiredAlert = () => {
  const [alertShown, setAlertShown] = useState(false);
  const nav = useNavigate();

  const showSessionExpiredAlert = () => {
    Swal.fire({
      title: "Session Expired",
      text: "Your session has expired. Please log in again.",
      icon: "warning",
      showConfirmButton: true,
    });
  };

  useEffect(() => {
    const checkSessionExpiration = () => {
      const token = Cookies.get("token");
      if (token && !alertShown) {
        const decoded = jwtDecode(token);
        const expiryTime = decoded.exp * 1000; // Convert seconds to milliseconds
        const currentTime = new Date().getTime();
        if (currentTime >= expiryTime) {
          // Session has expired
          showSessionExpiredAlert();
          setAlertShown(true);
          nav("/login");
        }
      }
    };

    const interval = setInterval(checkSessionExpiration, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup interval on unmount or re-render
  }, []); // Re-run effect when alertShown state changes

  return null; // This component doesn't render anything, so return null
};

export default SessionExpiredAlert;
