import { useState } from "react";

/**
 * Represents a user model.
 * @returns {Object} An object containing the user state and setter function.
 */
const userModel = () => {
  const initialState = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    password: "",
    role: null,
    department: null,
    createdDate: new Date(), // Initialize with the current date
    isActive: false, // Assuming boolean value for isActive
    confirmPassword: "",
    userType: false,
    salesRep: null,
  };

  const [user, setUser] = useState(initialState);

  return { user, setUser, initialState };
};

export default userModel; // If this is the only export from the file
