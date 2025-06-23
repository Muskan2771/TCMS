# TCMS

# Project Structure

This section outlines the structure of the project files and directories.

```bash

SmartPro-2024-FE/
├── public/
│   ├── index.html               # The main HTML file for the application.
│   └── assets/                  # Directory for static assets.
│       ├── images/              # Static image files.
│       ├── styles/              # Global styles.
│       └── fonts/               # Font files.
├── src/
│   ├── assets/                  # Application-specific assets.
│   │   ├── fonts/               # Fonts used in the application.
│   │   └── styles/              # CSS or SASS stylesheets.
│   │       └── globalFont.css   # Global font styles.
│   ├── components/              # Reusable UI components.
│   │   ├── common/              # Common components like buttons, inputs, etc.
│   │   │   ├── alert/           # Alert component.
│   │   │   ├── buttons/         # Button components.
│   │   │   ├── containers/      # Container components.
│   │   │   ├── dropdown/        # Dropdown components.
│   │   │   ├── icons/           # Icon components.
│   │   │   ├── loader/          # Loader components.
│   │   │   ├── modal/           # Modal components.
│   │   │   ├── table/           # Table components.
│   │   │   ├── toastify/        # Toast notifications.
│   │   └── layout/              # Layout components.
│   │       ├── Navbar.jsx       # Navbar component.
│   │       └── NotAuthorized.jsx# Unauthorized access component.
│   │   └── ui/                  # UI-specific components.
│   │       ├── PageNotFound.jsx # 404 Page component.
│   │       └── UnderDev.jsx     # Under Development component.
│   ├── config/                  # Configuration files.
│   │   ├── NavIconConfig.js     # Navigation icons configuration.
│   │   ├── TableConfig.js       # Table configuration.
│   ├── context/                 # Context providers for state management.
│   │   ├── accessContext/       # Access-related context.
│   │   │   ├── AccessContext.js
│   │   │   └── AccessContextProvider.jsx
│   │   ├── alternateProductContext/
│   │   │   ├── AlternateProductContext.js
│   │   │   └── AlternateProductContextProvider.jsx
│   │   ├── authContext/
│   │   │   ├── AuthContext.js
│   │   │   └── AuthContextProvider.jsx
│   │   ├── customerContext/
│   │   │   ├── CustomerContext.js
│   │   │   └── CustomerContextProvider.jsx
│   │   ├── offersContext/
│   │   │   ├── OfferContext.js
│   │   │   └── OfferContextProvider.jsx
│   │   ├── productContext/
│   │   │   ├── ProductContext.js
│   │   │   └── ProductContextProvider.jsx
│   │   ├── proposalContext/
│   │   │   ├── ProposalContext.js
│   │   │   └── ProposalContextProvider.jsx
│   │   ├── roleContext/
│   │   │   ├── RoleContext.js
│   │   │   └── RoleContextProvider.jsx
│   │   ├── serviceContext/
│   │   │   ├── ServiceContext.js
│   │   │   └── ServiceContextProvider.jsx
│   │   ├── termsAndConditionContext/
│   │   │   ├── TermsAndConditionContext.js
│   │   │   └── TermsAndConditionContextProvider.jsx
│   │   ├── userContext/
│   │   │   ├── UserContext.js
│   │   │   └── UserContextProvider.jsx
│   ├── pages/                   # Main pages of the application.
│   │   ├── view-proposal/        # View proposal page.
│   │   ├── setting/              # Setting-related pages.
│   │   │   ├── access-privilege/
│   │   │   ├── alternate-product/
│   │   │   ├── customer/
│   │   │   ├── offers/
│   │   │   ├── product/
│   │   │   ├── services/
│   │   │   └── terms-and-conditions/
│   ├── routing/                 # Routing files.
│   │   ├── PrivateRoute.jsx     # Private route component.
│   ├── services/                # Service files for API calls, authentication, etc.
│   │   ├── accessControlService.js # API service for access control.
│   │   ├── alternateProductService.js # API service for alternate products.
│   │   ├── authService.js       # API service for authentication.
│   │   ├── customerService.js   # API service for customers.
│   │   ├── offerService.js      # API service for offers.
│   │   ├── productGroupService.js # API service for product groups.
│   │   └── ProductService.js    # API service for products.
│   ├── utils/                   # Utility functions and constants.
│   │   ├── axiosInstance.js     # Axios instance for HTTP requests.
│   │   ├── checkSession.js      # Session check utility.
│   │   ├── debounce.js          # Debounce utility.
│   │   ├── disableConsoleLogs.js # Utility to disable console logs in production.
│   │   ├── LoadingUtil.jsx      # Loading utility component.
│   │   ├── SessionExpiredAlert.jsx # Alert component for session expiry.
│   │   ├── throttle.js          # Throttle utility function.
│   │   └── validateForm.js      # Form validation utility.
│   ├── App.js                   # Main App component.
│   ├── App.css                  # Global app styles.
│   ├── index.js                 # Entry point for the React application.
│   ├── main.jsx                 # Main JSX file.
│   ├── Layout.jsx               # Layout component file.
│   ├── temp.json                # Temporary configuration file.
│   ├── babelrc                  # Babel configuration file.
├── .gitignore                   # Specifies files to be ignored by Git.
├── README.md                    # Project documentation.
└── yarn.lock / package-lock.json # Lock file for package managers.

```

Each file and directory in the project serves a specific purpose, ensuring a well-organized and maintainable codebase.

## API Endpoints Used in Context

For more detailed API documentation, refer to [APIDOCK.md](./APIDOCK.md).

## Proposal Calculation

For more detailed documentation, refer to [calculationDocumentation.md](docs/calculationDocumentation.md).
