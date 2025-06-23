# API Documentation

This document provides an overview of the API endpoints used in the various context files within the project. Each section corresponds to a context provider and details the endpoints utilized for performing different operations.

---

## AuthContext.js

Handles user authentication.

- **Login**: `POST /api/auth/login` - Authenticates the user.
- **Logout**: `POST /api/auth/logout` - Logs out the user.
- **Register**: `POST /api/auth/register` - Registers a new user.

---

## DashboardContext.js

Manages data related to the dashboard.

- **Get Dashboard Data**: `GET /api/dashboard/data` - Fetches data for the dashboard.
- **Update Dashboard Settings**: `PUT /api/dashboard/settings` - Updates dashboard settings.

---

## AccessContextProvider.jsx

Handles menu and access control.

- **Get Menu and Submenu**: `GET /api/menu-submenu` - Fetches menu and submenu.
- **Get Menu and Submenu by User**: `GET /api/role-menu-submenu-accesses/{id}` - Fetches menu and submenu by user.
- **Save Access**: `POST /api/role-menu-submenu-accesses` - Saves access details.

---

## AlternateProductContextProvider.jsx

Manages alternate products.

- **Get Alternate Products**: `GET /api/alternate-products` - Fetches alternate products.
- **Create New Alternate Product**: `POST /api/alternate-products` - Creates a new alternate product.
- **Delete Alternate Product**: `DELETE /api/alternate-products/{id}` - Deletes an alternate product.
- **Update Alternate Product**: `PUT /api/alternate-products/{id}` - Updates an alternate product.

---

## AuthContextProvider.jsx

Handles user session and access control.

- **Check User Session**: `GET /api/check-session` - Checks if the user session is valid.
- **Handle Login**: `POST /api/login` - Handles user login.
- **Get Access**: `GET /api/access` - Fetches user access details.
- **Handle Logout**: `POST /api/logout` - Handles user logout.

---

## CustomerContextProvider.jsx

Manages customer-related operations.

- **Get All Customers**: `GET /api/customers` - Fetches all customers.
- **Add New Customer**: `POST /api/customers` - Adds a new customer.
- **Update Customer**: `PUT /api/customers/{id}` - Updates a customer's information.
- **Delete Customer**: `DELETE /api/customers/{id}` - Deletes a customer.

---

## OfferContextProvider.jsx

Manages offer-related operations.

- **Fetch Offers**: `GET /api/offers` - Fetches available offers.
- **Create New Offer**: `POST /api/offers` - Creates a new offer.
- **Update Offer**: `PUT /api/offers/{id}` - Updates an existing offer.
- **Delete Offer**: `DELETE /api/offers/{id}` - Deletes an offer.

---

## ProductContextProvider.jsx

Manages product-related operations.

- **Get All Products**: `GET /api/products` - Fetches all products.
- **Get Products by Page**: `GET /api/products/page` - Fetches products in a paginated format.
- **Get Product by ID**: `GET /api/products/{id}` - Fetches a product by its ID.
- **Create Product Master**: `POST /api/products` - Creates a new product.
- **Update Product**: `PUT /api/products/{id}` - Updates an existing product.
- **Delete Product**: `DELETE /api/products/{id}` - Deletes a product.

---

## ProductGroupContextProvider.jsx

Handles operations related to product groups.

- **Get Main Product Groups**: `GET /api/main-product-groups` - Fetches main product groups.
- **Create Main Product Group**: `POST /api/main-product-groups` - Creates a new main product group.
- **Get Power BI Main Product Groups**: `GET /api/powerbi-main-product-groups` - Fetches Power BI main product groups.
- **Create Power BI Main Product Group**: `POST /api/powerbi-main-product-groups` - Creates a Power BI main product group.
- **Get Sales Departments**: `GET /api/sales-departments` - Fetches sales departments.
- **Create Sales Department**: `POST /api/sales-departments` - Creates a new sales department.
- **Get Product Groups**: `GET /api/product-groups` - Fetches product groups.
- **Create Product Group**: `POST /api/product-groups` - Creates a new product group.
- **Update Product Group**: `PUT /api/product-groups/{id}` - Updates an existing product group.
- **Delete Product Group**: `DELETE /api/product-groups/{id}` - Deletes a product group.

---

## ProposalContextProvider.jsx

Manages suppliers.

- **Get Suppliers**: `GET /api/current-supplier` - Fetches current suppliers.

---

## RoleContextProvider.jsx

Handles role management.

- **Get Roles**: `GET /api/roles` - Fetches available roles.
- **Get Departments**: `GET /api/departments` - Fetches departments.
- **Create Role**: `POST /api/roles` - Creates a new role.

---

## ServiceContextProvider.jsx

Manages service-related operations.

- **Get All Services**: `GET /api/services` - Fetches all services.
- **Delete Service**: `DELETE /api/services/{id}` - Deletes a service.
- **Create New Service**: `POST /api/services` - Creates a new service.
- **Update Service**: `PUT /api/services/{id}` - Updates an existing service.

---

## UserContextProvider.jsx

Handles user-related operations.

- **Check if Email Exists**: `POST /api/check-email` - Verifies if an email is already registered.
- **Invite User**: `POST /api/invite-user` - Sends an invitation to a user.
- **Activate User**: `POST /api/activate-user` - Activates a user.
- **Forgot Password**: `POST /api/forgot-password` - Handles forgotten password requests.
- **Reset User Password**: `POST /api/reset-password` - Resets a user password.
- **Get All Users**: `GET /api/users` - Fetches all users.
- **Verify Forgot Password Token**: `POST /api/verify-forgot-password-token` - Verifies the forgot password token.
- **Verify Invitation Token**: `POST /api/verify-invitation-token` - Verifies the invitation token.

---

## TermsAndConditionContextProvider.jsx

Manages terms and conditions.

- **Get All Terms and Conditions**: `GET /api/terms-and-conditions` - Fetches all terms and conditions.
- **Create New Terms and Conditions**: `POST /api/terms-and-conditions` - Creates new terms and conditions.
- **Update Terms and Conditions**: `PUT /api/terms-and-conditions/{id}` - Updates existing terms and conditions.
- **Delete Terms and Conditions**: `DELETE /api/terms-and-conditions/{id}` - Deletes terms and conditions.

---

This document provides an overview of all the key endpoints and their corresponding functionality. For more detailed information about request payloads and responses, refer to the API documentation or the context provider implementations.

---

This `README.md` gives a clear, concise overview of the API endpoints organized by their respective context providers.
