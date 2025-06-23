import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBook, FaClipboardList, FaCalendarAlt, FaChartBar } from 'react-icons/fa';

const menuItems = [
  {
    title: 'Dashboard',
    path: '/user/dashboard',
    icon: <FaChartBar className="w-5 h-5" />
  },
  {
    title: 'Course Details',
    path: '/user/courses',
    icon: <FaBook className="w-5 h-5" />
  },
  {
    title: 'Test Details',
    path: '/user/tests',
    icon: <FaClipboardList className="w-5 h-5" />
  },
  {
    title: 'Schedule',
    path: '/user/schedule',
    icon: <FaCalendarAlt className="w-5 h-5" />
  }
];

const UserSidebar = ({ isOpen }) => {
  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.title}
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default UserSidebar; 