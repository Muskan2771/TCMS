import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../common/buttons/Button";
import { useAuth } from "../../context/authContext/AuthContextProvider";

const NotAuthorized = () => {
  const { handleLogout } = useAuth();
  return (
    <div className="flex justify-center items-center h-screen">
      <div style={{ textAlign: "center", padding: "50px" }}>
        <img
          src="/images/no-access.webp"
          alt="No Access"
          className="h-[300px] m-5"
        />
        <h1 className="font-800 text-2xl">Not Authorized</h1>
        <p className="font-600">
          You do not have permission to access this page.
        </p>
        <div className="flex items-center gap-10">
          <NavLink
            to="/"
            className="text-sky-300 hover:text-sky-500 font-600 text-xl"
          >
            Navigate To Home
          </NavLink>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
