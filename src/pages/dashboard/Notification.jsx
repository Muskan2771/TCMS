import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useDashboard } from '@/context/dashboardContext/DashboardContextProvider';
import Cookies from 'js-cookie';
import { useRole } from '@/context/roleContext/RoleContextProvider'; // Import RoleContext

const Notification = () => {
  const {
    fetchNotifications,
    notifications = [],
    addNotification,
    editNotification,
    removeNotification,
  } = useDashboard();

  const { getRoles, roleRes } = useRole(); // Use RoleContext for roles
  const token = Cookies.get('token');
  const role = token ? JSON.parse(atob(token.split('.')[1])).role : null;
  const isSuperAdmin = role === 'SUPER ADMIN';

  const [newNotification, setNewNotification] = useState({
    id: 0,
    title: '',
    description: '',
    assignedRoles: [],
    expiryDate: '',
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  });
  const [editingNotification, setEditingNotification] = useState(null);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    expiryDate: '',
    role: '',
  });
  const [expandedNotifications, setExpandedNotifications] = useState({});

  useEffect(() => {
    fetchNotifications();
    getRoles(); // Fetch roles using RoleContext
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
  };

  const handleCreateNotification = () => {
    const newErrors = {
      title: !newNotification.title.trim() ? 'Title is required.' : '',
      description: !newNotification.description.trim()
        ? 'Description is required.'
        : '',
      expiryDate: !newNotification.expiryDate ? 'Expiry date is required.' : '',
      role:
        newNotification.assignedRoles.length === 0
          ? 'At least one role is required.'
          : '',
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    const formattedNotification = {
      ...newNotification,
      expiryDate: `${newNotification.expiryDate}T00:00:00`, // Format expiry date
    };

    addNotification(formattedNotification);
    handleCancelEdit(); // Reset state and clear errors after saving
  };

  const handleEditNotification = (notification) => {
    setErrors({ title: '', description: '', expiryDate: '', role: '' }); // Clear errors before editing
    setEditingNotification(notification);
    setNewNotification({
      id: notification.id,
      title: notification.title,
      description: notification.description,
      assignedRoles: notification.assignedRoles,
      expiryDate: notification.expiryDate
        ? notification.expiryDate.split('T')[0]
        : '', // Ensure expiry date is set in 'YYYY-MM-DD' format or default to an empty string
      createdDate: notification.createdDate,
      updatedDate: new Date().toISOString(),
    });
    setIsInputVisible(true);
    scrollToTop(); // Scroll to the top
  };

  const handleUpdateNotification = () => {
    const newErrors = {
      title: !newNotification.title.trim() ? 'Title is required.' : '',
      description: !newNotification.description.trim()
        ? 'Description is required.'
        : '',
      expiryDate: !newNotification.expiryDate ? 'Expiry date is required.' : '',
      role:
        newNotification.assignedRoles.length === 0
          ? 'At least one role is required.'
          : '',
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    if (editingNotification) {
      const updatedNotification = {
        ...newNotification,
        expiryDate: `${newNotification.expiryDate}T00:00:00`, // Format expiry date correctly
      };
      editNotification(editingNotification.id, updatedNotification);
      handleCancelEdit(); // Reset state and clear errors after saving
    }
  };

  const handleCancelEdit = () => {
    setEditingNotification(null);
    setIsInputVisible(false);
    setErrors({ title: '', description: '', expiryDate: '', role: '' }); // Clear errors on cancel
    setNewNotification({
      id: 0,
      title: '',
      description: '',
      assignedRoles: [],
      expiryDate: '',
      createdDate: '',
      updatedDate: '',
    });
  };

  const handleRoleSelection = (roleId) => {
    const isSelected = newNotification.assignedRoles.some(
      (role) => role.id === roleId,
    );
    const updatedRoles = isSelected
      ? newNotification.assignedRoles.filter((role) => role.id !== roleId) // Remove role if already selected
      : [
          ...newNotification.assignedRoles,
          roleRes.find((role) => role.id === roleId),
        ]; // Add role if not selected

    setNewNotification({
      ...newNotification,
      assignedRoles: updatedRoles,
    });
  };

  const toggleExpand = (id) => {
    setExpandedNotifications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const truncateText = (text, wordLimit) => {
    const words = text?.split(' ');
    if (words?.length > wordLimit) {
      return `${words.slice(0, wordLimit).join(' ')}...`;
    }
    return text;
  };

  return (
    <div className="relative mb-5 bg-white shadow-lg rounded-xl border border-gray-200 h-[450px] overflow-y-auto ">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 bg-white rounded-t-xl shadow-md sticky top-0 z-10 p-4">
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
        {isSuperAdmin && (
          <button
            onClick={() => {
              setNewNotification({
                id: 0,
                title: '',
                description: '',
                assignedRoles: [],
                expiryDate: '',
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toISOString(),
              });
              setIsInputVisible(!isInputVisible);
              setErrors({
                title: '',
                description: '',
                expiryDate: '',
                role: '',
              }); // Clear errors on cancel
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition-all p-2">
            {!isInputVisible ? <FaPlus /> : <FaMinus />}
          </button>
        )}
      </div>

      <div className="p-2">
        {isInputVisible && isSuperAdmin && (
          <div className="flex flex-col gap-4 mb-6 top-10">
            <div>
              <input
                type="text"
                placeholder="Enter title"
                className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-full"
                value={newNotification.title}
                onChange={(e) =>
                  setNewNotification({
                    ...newNotification,
                    title: e.target.value,
                  })
                }
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div>
              <textarea
                placeholder="Enter description"
                className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-full"
                value={newNotification.description}
                onChange={(e) =>
                  setNewNotification({
                    ...newNotification,
                    description: e.target.value,
                  })
                }
              />
              {errors?.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
            <div>
              <input
                type="date"
                min={getTodayDate()} // Set minimum date to today
                className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-full"
                value={newNotification.expiryDate}
                onChange={(e) =>
                  setNewNotification({
                    ...newNotification,
                    expiryDate: e.target.value,
                  })
                }
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-700">Assign Roles:</p>
              <div className="flex flex-wrap gap-2">
                {roleRes.map((role) => (
                  <label key={role.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newNotification.assignedRoles.some(
                        (r) => r.id === role.id,
                      )}
                      onChange={() => handleRoleSelection(role.id)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">{role.role}</span>
                  </label>
                ))}
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="py-2 px-4 rounded-lg shadow-md text-white font-bold bg-gray-500 hover:bg-gray-600"
                onClick={handleCancelEdit}>
                Cancel
              </button>
              <button
                className="py-2 px-4 rounded-lg shadow-md text-white font-bold bg-green-500 hover:bg-green-600"
                onClick={
                  editingNotification
                    ? handleUpdateNotification
                    : handleCreateNotification
                }>
                {editingNotification
                  ? 'Update Notification'
                  : 'Add Notification'}
              </button>
            </div>
          </div>
        )}

        {/* Notifications Display */}
        {Array.isArray(notifications) &&
        (notifications.length === 0 || notifications[0] === 'No Data Found') ? (
          <div className="flex flex-col items-center justify-center text-gray-500 italic text-center">
            <p>
              No notifications available. Add a new notification to get started!
            </p>
          </div>
        ) : (
          <div
            className="grid gap-6"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}>
            {Array.isArray(notifications) &&
              notifications?.map((item) => (
                <>
                  {!isInputVisible && (
                    <div
                      key={item.id}
                      className="flex flex-col p-4 bg-gray-200/60 rounded-lg shadow-md hover:shadow-lg transition-all">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-md text-gray-800 truncate">
                          {item.title}
                        </h3>
                        {isSuperAdmin && (
                          <div className="flex space-x-3">
                            <button
                              className="text-yellow-500 hover:text-yellow-600"
                              onClick={() => handleEditNotification(item)}>
                              <FaEdit />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-600"
                              onClick={() => removeNotification(item.id)}>
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm mt-2">
                        {expandedNotifications[item.id]
                          ? item?.description
                          : truncateText(item.description, 25)}
                      </p>
                      {item && (
                        <>
                          {item?.description?.split(' ').length > 25 && (
                            <button
                              className="text-blue-500 text-sm mt-2"
                              onClick={() => toggleExpand(item.id)}>
                              {expandedNotifications[item.id]
                                ? 'Show Less'
                                : 'Read More'}
                            </button>
                          )}
                        </>
                      )}

                      <p className="text-gray-500 text-xs mt-1">
                        Expiry Date:{' '}
                        {new Date(item.expiryDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                </>
              ))}
          </div>
        )}
      </div>
      {/* Input Form */}
    </div>
  );
};

export default Notification;
