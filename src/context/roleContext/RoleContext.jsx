import React, { createContext, useContext } from 'react';
import Cookies from 'js-cookie';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const role = Cookies.get('role') || 'USER'; // Default to 'USER' if no role is found
  return (
    <RoleContext.Provider value={{ role }}>{children}</RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);

export default RoleContext;
