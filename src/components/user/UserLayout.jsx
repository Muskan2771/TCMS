import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import UserSidebar from './UserSidebar';

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <UserSidebar isOpen={sidebarOpen} />
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout; 