import React, { useContext, useEffect, useState } from 'react';
import { FaTrash, FaEye, FaBook } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import Table from '../../components/common/table/Table'; // Adjust the import path as necessary
import UserContext from '../../context/userContext/UserContext';
import ActionButtons from '../../components/common/ActionButtons';
import { useModal } from '@/components/common/modal/ModalContext';
import UserRegistrationModal from './UserRegistrationModal';

import AllocateCourseModal from './AllocateCourseModal';
import { getCourses } from '@/services/courseService';

// Define the getStatusClass function
const getStatusClass = (active) => {
  return active ? 'text-black bg-green-200' : 'text-black bg-red-200';
};

const UsersTable = () => {
  const { userData, filteredUsers } = useContext(UserContext);
  const { openModal, closeModal, isModalOpen } = useModal();
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
      return data;
    } catch (err) {
      // Optionally handle error
      return [];
    }
  };

  const handleOpenModal = (user) => {
    openModal(
      <UserRegistrationModal closeModal={closeModal} data={user} />,
      'Update User',
    );
  };

  const handleAllocateCourse = async (user) => {
    const courseList = courses.length ? courses : await fetchCourses();
    openModal(
      <AllocateCourseModal user={user} courses={courseList} closeModal={closeModal} />, 
      'Allocate Course'
    );
  };

  // Your columns configuration
  const columns = [
    {
      header: 'USER',
      render: (user) => (
        <div className="py-2 px-4 flex items-center">
          <img
            src="images/user.png"
            alt="user"
            className="w-10 h-10 rounded-full mr-2"
          />
          <div className="ml-2 py-2 px-4">
            <p>{`${user.firstName} ${user.lastName}`}</p>
          </div>
        </div>
      ),
    },
    { header: 'EMAIL', field: 'email' },
    { header: 'ROLE', field: 'role' },
    {
      header: 'STATUS',
      render: (user) => (
        <span
          className={`px-2 py-1 w-20 text-center inline-block rounded-full ${getStatusClass(
            user.active,
          )}`}>
          {user.active ? 'active' : 'inactive'}
        </span>
      ),
    },
    {
      header: 'ACTIONS',
      render: (user) => (
        <ActionButtons
          actions={[
          
            {
              icon: <FaBook />,
              onClick: () => handleAllocateCourse(user),
              tooltip: 'Allocate Course',
              className: 'text-blue-500',
            },
            // {
            //   icon: <MdEdit />,
            //   onClick: () => handleOpenModal(user),
            //   tooltip: 'Edit User',
            //   className: 'text-gray-500',
            // },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      {filteredUsers?.length > 0 ? (
        <Table
          columns={columns}
          data={filteredUsers}
          // onIconClick=}
        />
      ) : (
        <>
          <div className="font-800 text-center m-20 text-3xl">
            No data found
          </div>
        </>
      )}
    </>
  );
};

export default UsersTable;
