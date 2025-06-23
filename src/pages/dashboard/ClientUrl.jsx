import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useDashboard } from '@/context/dashboardContext/DashboardContextProvider';
import Cookies from 'js-cookie';
import axiosInstance from '@/utils/axiosInstance'; // Import axiosInstance for API calls

const ClientURLs = () => {
  const {
    fetchClientResources,
    clientResources = [],
    removeClientResource,
    addClientResource,
    editClientResource, // Ensure this is included
  } = useDashboard();

  const token = Cookies.get('token');
  const role = token ? JSON.parse(atob(token.split('.')[1])).role : null;
  const isSuperAdmin = role === 'SUPER ADMIN';

  const [newResource, setNewResource] = useState({
    id: 0,
    title: '',
    link: '',
    assignedRoleId: {
      id: 0,
      role: '',
    },
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  });
  const [editingResource, setEditingResource] = useState(null);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({
    title: '',
    link: '',
    createdDate: '',
    role: '',
  });

  useEffect(() => {
    fetchClientResources();
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axiosInstance.get('/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleCreateResource = () => {
    const newErrors = {
      title: !newResource.title.trim() ? 'Title is required.' : '',
      link:
        !newResource.link.trim() || !isValidURL(newResource.link)
          ? 'A valid link is required.'
          : '',
      createdDate: !newResource.createdDate ? 'Created date is required.' : '',
      role: newResource.assignedRoleId.id === 0 ? 'Role is required.' : '',
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    if (
      newResource.title &&
      newResource.link &&
      newResource.assignedRoleId.id
    ) {
      addClientResource(newResource);
      setNewResource({
        id: 0,
        title: '',
        link: '',
        assignedRoleId: { id: 0, role: '' },
        createdDate: '',
        updatedDate: '',
      });
      setErrors({ title: '', link: '', createdDate: '', role: '' });
      setIsInputVisible(false);
    }
  };

  const handleEditResource = (resource) => {
    setEditingResource(resource);
    setNewResource({
      id: resource.id,
      title: resource.title,
      link: resource.link,
      assignedRoleId: resource.assignedRoleId,
      createdDate: resource.createdDate,
      updatedDate: new Date().toISOString(),
    });
    setIsInputVisible(true);
  };

  const handleUpdateResource = () => {
    const newErrors = {
      title: !newResource.title.trim() ? 'Title is required.' : '',
      link:
        !newResource.link.trim() || !isValidURL(newResource.link)
          ? 'A valid link is required.'
          : '',
      createdDate: !newResource.createdDate ? 'Created date is required.' : '',
      role: newResource.assignedRoleId.id === 0 ? 'Role is required.' : '',
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    if (editingResource) {
      editClientResource(editingResource.id, newResource); // Pass the updated newResource to the API
      setEditingResource(null);
      setIsInputVisible(false);
      setErrors({ title: '', link: '', createdDate: '', role: '' });
    }
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="relative m-5 bg-white shadow-lg rounded-xl border border-gray-200 h-80 overflow-y-auto ">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 bg-white rounded-t-xl shadow-md sticky top-0 z-10 p-4">
        <h2 className="text-2xl font-bold text-gray-800">Client Resources</h2>
        {isSuperAdmin && (
          <button
            onClick={() => {
              setNewResource({
                id: 0,
                title: '',
                link: '',
                assignedRoleId: { id: 0, role: '' },
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toISOString(),
              });
              setIsInputVisible(!isInputVisible);
              setErrors({ title: '', link: '', createdDate: '', role: '' });
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition-all p-2">
            {!isInputVisible ? <FaPlus /> : <FaMinus />}
          </button>
        )}
      </div>

      {/* Input Form */}
      <div className="p-2">
        {' '}
        {isInputVisible && isSuperAdmin && (
          <div className="flex flex-col gap-4 mb-6">
            <div>
              <input
                type="text"
                placeholder="Enter title"
                className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-full"
                value={newResource.title}
                onChange={(e) =>
                  setNewResource({ ...newResource, title: e.target.value })
                }
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter link"
                className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-full"
                value={newResource.link}
                onChange={(e) =>
                  setNewResource({ ...newResource, link: e.target.value })
                }
              />
              {errors.link && (
                <p className="text-red-500 text-sm mt-1">{errors.link}</p>
              )}
            </div>
            <div>
              <select
                className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-full"
                value={newResource.assignedRoleId.id}
                onChange={(e) => {
                  const selectedRole = roles.find(
                    (role) => role.id === parseInt(e.target.value),
                  );
                  setNewResource({
                    ...newResource,
                    assignedRoleId: selectedRole || { id: 0, role: '' },
                  });
                }}>
                <option value={0}>Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>
            <button
              className="w-full py-3 rounded-lg shadow-md text-white font-bold bg-green-500 hover:bg-green-600"
              onClick={
                editingResource ? handleUpdateResource : handleCreateResource
              }>
              {editingResource ? 'Update Resource' : 'Add Resource'}
            </button>
          </div>
        )}
        {/* Resources Display */}
        {clientResources.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 italic text-center">
            <p>
              No client resources available. Add a new resource to get started!
            </p>
          </div>
        ) : (
          <>
            {!isInputVisible && (
              <div
                className="grid gap-6"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                }}>
                {clientResources.map((item) => (
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
                            onClick={() => handleEditResource(item)}>
                            <FaEdit />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-600"
                            onClick={() => removeClientResource(item.id)}>
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm truncate mt-2">
                      {item.link}
                    </a>
                    <p className="text-gray-500 text-xs mt-1">
                      Assigned Role: {item.assignedRoleId.role}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ClientURLs;
