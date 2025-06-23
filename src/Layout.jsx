import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from './context/authContext/AuthContextProvider';
import { IoArrowBackCircle, IoCloseSharp } from 'react-icons/io5';

const Layout = () => {
  const [showNav, setShowNav] = useState(false);
  const [isNavSmall, setIsNavSmall] = useState(true);
  const { handleLogout } = useAuth();
  const location = useLocation();

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const toggleNavSize = () => {
    setIsNavSmall(!isNavSmall);
  };

  useEffect(() => {
    setShowNav(false);
  }, [location]);

  return (
    <>
      <div
        className={`lg:flex relative min-h-screen ${showNav ? 'nav-open' : ''}`}>
        <div className="lg:hidden flex justify-between bg-gray-100 items-center w-screen">
          <div className="flex justify-center items-center">
            <span className="p-4" onClick={toggleNav}>
              {showNav ? (
                <IoCloseSharp className="font-extrabold text-xl" />
              ) : (
                <RxHamburgerMenu className="font-extrabold text-xl" />
              )}
            </span>
            <span className="px-1 font-800 text-xl">Smart Proposal</span>
          </div>
          <div
            className="flex justify-center items-center px-5"
            onClick={handleLogout}>
            <FaSignOutAlt className="mr-2" />
            <span>Logout</span>
          </div>
        </div>
        <div
          // style={{ overflowY: "auto" }}
          className={`text-white transition-all duration-300 overflow-auto z-50 ${
            showNav ? 'fixed' : 'fixed lg:block hidden '
          } ${isNavSmall ? 'w-24' : 'w-60'} lg:inset-y-0`}>
          <Navbar isNavSmall={isNavSmall} setIsNavSmall={setIsNavSmall} />
        </div>
        <div
          className={`flex-grow transition-all duration-300 min-w-full p-2 ${
            isNavSmall ? 'lg:pl-28' : 'lg:pl-64'
          } pl-0 ${showNav ? 'nav-open' : ''}`}>
          <button
            onClick={toggleNavSize}
            className={`fixed top-4 mx-5 bg-gray-200 hover:bg-slate-400 p-2 rounded-lg transition-all duration-300 ${
              isNavSmall ? 'left-24' : 'left-64'
            } z-50`} // Ensure the button stays on top with a high z-index
          >
            {isNavSmall ? <RxHamburgerMenu /> : <IoArrowBackCircle />}
          </button>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
