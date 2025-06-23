import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './assets/styles/globalStyles.css'; // Import global styles
import AuthContextProvider from './context/authContext/AuthContextProvider.jsx';
import { MemoryRouter } from 'react-router-dom';
import UserContextProvider from './context/userContext/UserContextProvider.jsx';
import RoleContextProvider from './context/roleContext/RoleContextProvider.jsx';

import AccessContextProvider from './context/accessContext/AccessContextProvider.jsx';

import { registerSW } from 'virtual:pwa-register';
import DashboardContextProvider from './context/dashboardContext/DashboardContextProvider.jsx';

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MemoryRouter>
      <AuthContextProvider>
        <DashboardContextProvider>
          <UserContextProvider>
            <AccessContextProvider>
              <RoleContextProvider>
                <App />
              </RoleContextProvider>
            </AccessContextProvider>
          </UserContextProvider>
        </DashboardContextProvider>
      </AuthContextProvider>
    </MemoryRouter>
  </React.StrictMode>,
);
