import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const navigate = useNavigate();

export const checkSession = () => {
  const token = Cookies.get("token");

  if (!token) {
    setIsLoggedIn(false);
    // navigate("/login");
    return; // Exit early if no token exists
  }

  const decoded = jwtDecode(token);
  const expiryTime = decoded.exp * 1000; // Convert seconds to milliseconds
  const currentTime = new Date().getTime();
  console.log("Timer", currentTime, expiryTime, decoded);

  if (currentTime >= expiryTime) {
    // Session has expired
    Swal.fire({
      title: "Session Expired",
      text: "Your session has expired. Please log in again.",
      icon: "warning",
    }).then(() => {
      Cookies.remove("token"); // Clear token cookie
      setIsLoggedIn(false);
      navigate("/login");
    });
  } else {
    setIsLoggedIn(true);
    return () => clearTimeout(timeout);
  }
};
