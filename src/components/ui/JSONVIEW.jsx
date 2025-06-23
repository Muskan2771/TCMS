import React from "react";

const JSONVIEW = ({ children }) => {
  if (process.env.NODE_ENV === "production") {
    return null;
  }
  return <>{children}</>;
};

export default JSONVIEW;
