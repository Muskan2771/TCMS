import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from '../components/user/UserLayout';
import Dashboard from '../pages/user/Dashboard';
import CourseDetails from '../pages/user/CourseDetails';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<CourseDetails />} />
        <Route path="tests" element={<div>Test Details Page</div>} />
        <Route path="schedule" element={<div>Schedule Page</div>} />
      </Route>
    </Routes>
  );
};

export default UserRoutes; 