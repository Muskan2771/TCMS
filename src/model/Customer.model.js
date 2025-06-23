import { useState } from "react";

/**
 * Represents a user model.
 * @returns {Object} An object containing the user state and setter function.
 */
const customerModel = () => {
  const initialState = {
    id: 0,
    customerCode: "",
    customerName: "",
    address: "",
    phone: "",
    contactPerson: "",
    email: "",
    avgPurchase: "",
    customerLogo: "",
    customerLogoUrl: null,
  };

  const [customer, setCustomer] = useState(initialState);

  return { customer, setCustomer, initialState };
};

export default customerModel; // If this is the only export from the file
