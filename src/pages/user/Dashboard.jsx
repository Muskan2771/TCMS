import React from 'react';
import { FaBook, FaClipboardList, FaCalendarAlt, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const stats = [
    {
      title: 'Active Courses',
      value: '4',
      icon: <FaBook className="w-6 h-6 text-blue-500" />,
      color: 'bg-blue-50'
    },
    {
      title: 'Upcoming Tests',
      value: '2',
      icon: <FaClipboardList className="w-6 h-6 text-green-500" />,
      color: 'bg-green-50'
    },
    {
      title: 'Today\'s Schedule',
      value: '3',
      icon: <FaCalendarAlt className="w-6 h-6 text-purple-500" />,
      color: 'bg-purple-50'
    },
    {
      title: 'Overall Progress',
      value: '75%',
      icon: <FaChartLine className="w-6 h-6 text-orange-500" />,
      color: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Welcome back, Student!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} p-6 rounded-lg shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Completed Mathematics Quiz</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Started Physics Course</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Tests</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Physics Mid-term</p>
                <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
                Physics
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Chemistry Quiz</p>
                <p className="text-xs text-gray-500">Friday, 2:00 PM</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                Chemistry
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 