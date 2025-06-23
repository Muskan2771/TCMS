export const tableInfo = {
  user: {
    perPage: 10,
    tableHeaders: [
      { header: "User", field: "user", isDefault: true },
      { header: "Email", field: "email", isDefault: true },
      { header: "Role", field: "role", isDefault: true },
      { header: "Status", field: "status", isDefault: true },
      { header: "Sales Rep", field: "salesRep", isDefault: true },
      { header: "First Name", field: "firstName", isDefault: false },
      { header: "Last Name", field: "lastName", isDefault: false },
      { header: "Contact No", field: "contactNo", isDefault: false },
      // { header: "Department", field: "department", isDefault: false },
    ],
  },
  customer: {
    perPage: 100,
    tableHeaders: [
      { header: "Customer Code", field: "customerCode", isDefault: true },
      { header: "Customer Name", field: "customerName", isDefault: true },
      { header: "Contact Person", field: "contactPerson", isDefault: true },
      { header: "Phone", field: "phone", isDefault: true },
      { header: "Email", field: "email", isDefault: true },
      { header: "Address", field: "address", isDefault: true },
      { header: "Avg Purchase", field: "avgPurchase", isDefault: true },
    ],
  },
};
