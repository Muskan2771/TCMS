import React, { useContext, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/authContext/AuthContext";
import Loader from "../components/common/loader/Loader";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, navMenu = [], loading } = useContext(AuthContext);
  const location = useLocation();

  // Show loader while loading
  if (loading) {
    return <Loader />;
  }

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Memoize the authorization check for performance optimization
  const isAuthorized = useMemo(() => {
    const currentPath = location.pathname.slice(1);
    const basePath = currentPath.split("/")[0] || "";

    // Home/Dashboard routes are always accessible
    if (basePath === "" || basePath === " ") {
      return true;
    }

    // Check if the basePath is a subMenuUrl of the Home menu
    const isHomePath = navMenu.some(
      (menu) =>
        menu?.menu?.menu === "Home" &&
        menu?.menu?.submenus?.some((sub) => sub?.subMenuUrl === basePath)
    );

    if (isHomePath) {
      return true;
    }

    // Check if the basePath matches any subMenuUrl in the navMenu
    return navMenu.some((menu) =>
      menu?.menu?.submenus?.some((sub) => sub?.subMenuUrl.startsWith(basePath))
    );
  }, [location.pathname, navMenu]);

  // Redirect to not-authorized if not authorized
  if (!isAuthorized) {
    return <Navigate to="/not-authorized" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
