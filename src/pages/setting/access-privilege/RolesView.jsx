import React, { useContext, useEffect, useState } from 'react';
import RoleContext from '../../../context/roleContext/RoleContext';
import { RiShieldUserFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const RolesView = () => {
  const { userRoleCount, userRoleCountData } = useContext(RoleContext);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      await userRoleCount();
      setLoading(false); // Stop loading
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-3 justify-items-center gap-10 m-10 mb-20">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="p-10 w-60 border rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50/60 animate-pulse">
            <div className="w-24 h-6 bg-gray-300 rounded mb-4"></div>
            <div className="border-sky-200 border-[10px] h-28 w-28 rounded-full flex justify-center items-center bg-white">
              <div className="w-16 h-6 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    ); // Show skeleton loading while fetching data
  }

  const token = Cookies.get('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const isSuperAdmin = decodedToken?.role === 'SUPER ADMIN';

  return (
    <>
      {userRoleCountData ? (
        <div className="grid grid-cols-3 justify-items-center gap-10 m-10 mb-20">
          {userRoleCountData?.map((item) => (
            <>
              <NavLink
                to={`/user-access/access/${item.role.role}/${item.role.id}`}
                key={item.role.id}
                className="p-10 w-60 border rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50/60">
                <div className="text-center font-700">{item.role.role}</div>
                <div className="border-sky-200 border-[10px] h-28 w-28 rounded-full mt-4 flex justify-center items-center bg-white">
                  <div className="font-600 text-sm">{item.count} Users</div>
                </div>
              </NavLink>
            </>
          ))}
        </div>
      ) : (
        <div className="font-600 flex justify-center items-center m-20 text-2xl">
          Loading
        </div>
      )}
    </>
  );
};

export default RolesView;
