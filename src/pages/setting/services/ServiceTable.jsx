import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { useService } from '../../../context/serviceContext/ServiceContextProvider';
import ActionButtons from '../../../components/common/ActionButtons';

const ServiceTable = ({ showForEdit }) => {
  const { getAllService, serviceData, deleteService, service, setService } =
    useService();

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        await getAllService(); // Fetch service data
      } catch (err) {
        setError('Failed to load services.'); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData();
  }, []);

  const handleUpdateService = (data) => {
    setService(data);
    showForEdit();
  };

  if (loading) {
    return (
      <div className="m-10 p-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center border p-4 rounded-lg border-l-8 border-l-[#ffb800] my-4 shadow-md animate-pulse">
            <div className="flex items-center gap-5">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div>
                <div className="w-24 h-6 bg-gray-300 rounded"></div>
                <div className="w-40 h-4 bg-gray-300 rounded mt-2"></div>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    ); // Show skeleton loading while fetching data
  }

  if (error) {
    return <div className="text-red-500 text-center p-5">{error}</div>; // Show error message if data fetching fails
  }

  return (
    <div className="m-10 p-5">
      {serviceData && serviceData.length > 0 ? (
        serviceData.map((data, index) => (
          <div
            key={data?.id}
            className="flex justify-between items-center border p-4 rounded-lg border-l-8 border-l-[#ffb800] my-4 shadow-md transition-transform hover:scale-105">
            <div className="flex items-center gap-5">
              <div className="font-semibold text-lg text-gray-600">
                {index + 1}
              </div>
              <div>
                <div className="font-bold text-xl text-gray-700">Service</div>
                <div className="text-base text-gray-500">{data?.service}</div>
              </div>
            </div>
            <ActionButtons
              actions={[
                {
                  icon: <FaTrash />,
                  onClick: () => deleteService(data?.id),
                  tooltip: 'Delete Service',
                  className: 'text-red-600 pr-5',
                },
                {
                  icon: <MdEdit />,
                  onClick: () => handleUpdateService(data),
                  tooltip: 'Edit Service',
                  className: 'text-gray-600',
                },
              ]}
            />
          </div>
        ))
      ) : (
        <div className="flex justify-center p-5 font-bold text-3xl">
          No services found.
        </div> // Show message if no data is found
      )}
    </div>
  );
};

export default ServiceTable;
