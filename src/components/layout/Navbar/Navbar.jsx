import React, { useEffect, useState } from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaFileAlt,
  FaUsers,
  FaClipboardList,
  FaBoxOpen,
  FaChartBar,
  FaUserShield,
  FaCalculator,
  FaFileUpload,
  FaAngleRight,
  FaAngleDown,
  FaSignOutAlt,
  FaUserCog,
  FaDropbox,
} from 'react-icons/fa';
import { BiSolidOffer, BiSolidUserAccount } from 'react-icons/bi';
import { AiFillProduct } from 'react-icons/ai';
import { IoMdCreate, IoMdSettings } from 'react-icons/io';
import { GiBookshelf, GiBoxUnpacking } from 'react-icons/gi';
import { useAuth } from '../../../context/authContext/AuthContextProvider';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import { PiHeadsetFill } from 'react-icons/pi';
import { RiShieldUserFill } from 'react-icons/ri';
import { ConfirmAlert } from '../../common/alert/ConfirmAlert';
import { LuCalendarClock } from 'react-icons/lu';
// import Popover from "../../common/popover/Popover";

// Icon mappers
export const iconMapper = {
  Home: <FaHome />,
  Settings: <IoMdSettings />,
  'Sales Rep': <FaUserShield />,
  Proposal: <FaClipboardList />,
  Application: <GiBookshelf />,
  Inventory: <FaBoxOpen />,
  BTS: <FaClipboardList />,
  'Payment Reminder': <LuCalendarClock />,
};

export const subIconMapper = {
  'Account Consolidation': <FaChartBar />,
  'BI Customers': <FaChartBar />,
  'Create/Edit Sales Rep': <FaUsers />,
  'Estimated Arrival Report': <FaChartBar />,
  'Fiscal Year': <FaChartBar />,
  'Margin Calculator': <FaCalculator />,
  'Sales File Upload': <FaFileUpload />,
  'Unique Customer Report': <FaChartBar />,
  'Upload ETA File': <FaFileUpload />,
  'Manage User Profile': <FaUserCog />,
  Customers: <FaUsers />,
  'Product Group': <AiFillProduct />,
  'Terms And Conditions': <IoDocumentAttachOutline />,
  Product: <FaDropbox />,
  Offers: <BiSolidOffer />,
  Service: <PiHeadsetFill />,
  'Alternate Product': <GiBoxUnpacking />,
  'Access and Privilege': <RiShieldUserFill />,
  'Create Proposal': <IoMdCreate />,
  'Restore Proposal': <FaFileAlt />,
  'View/Edit Proposal': <FaFileAlt />,
  'Payment Reminder': <LuCalendarClock />,
  'Min Max Maintenance Report': <FaFileAlt />,
  'Min Max Settings': <FaFileAlt />,
  'Create BTS Proposal': <FaFileAlt />,
  'Upload BTS Price File': <FaFileUpload />,
  'New Account Form': <BiSolidUserAccount />,
};

const Navbar = ({ isNavSmall, setIsNavSmall }) => {
  const { handleLogout, navMenu } = useAuth();
  const [activeSection, setActiveSection] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [submenuUsage, setSubmenuUsage] = useState({});

  // Ensure navMenu is defined and is an array
  const sortedNavMenu = Array.isArray(navMenu)
    ? navMenu.sort((a, b) => a.menu.id - b.menu.id)
    : [];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      // Simulate fetching navMenu data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false); // Stop loading
    };
    fetchData();
  }, [navMenu]);

  useEffect(() => {
    const storedUsage = localStorage.getItem('submenuUsage');
    if (storedUsage) {
      setSubmenuUsage(JSON.parse(storedUsage));
    }
  }, []);

  const handleToggle = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleIconClick = () => {
    if (isNavSmall) {
      setIsNavSmall(false);
    }
  };

  const handleSubmenuClick = (subMenuUrl, subMenuName, subMenuIconName) => {
    setSubmenuUsage((prevUsage) => {
      const updatedUsage = {
        ...prevUsage,
        [subMenuUrl]: {
          count: (prevUsage[subMenuUrl]?.count || 0) + 1,
          name: subMenuName,
          iconName: subMenuIconName,
        },
      };
      localStorage.setItem('submenuUsage', JSON.stringify(updatedUsage));
      return updatedUsage;
    });
    handleIconClick();
  };

  const generateMenu = () => {
    return sortedNavMenu.map((navItem, index) => (
      <li key={index} className="text-gray-700">
        {navItem.menu.menu === 'Home' ? (
          <NavLink
            to={navItem.menu.menu === 'Home' ? '' : navItem.menu.menuUrl}
            className={({ isActive }) =>
              `flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-700 text-[1rem] ${
                isActive ? 'bg-gray-300 text-blue-600' : ''
              }`
            }
            onClick={() => {
              handleIconClick();
            }}>
            <div
              className={` ${
                isNavSmall
                  ? 'flex flex-col items-center justify-center w-20'
                  : 'flex items-center space-x-2'
              }`}>
              {' '}
              {iconMapper[navItem.menu.menu] || <FaHome />}
              <span
                className={`${isNavSmall ? 'text-[0.8rem] text-center' : ''}`}>
                {navItem.menu.menu}
              </span>{' '}
            </div>
          </NavLink>
        ) : (
          <div
            className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-300 transition-colors duration-700 text-[1rem]`}
            onClick={() => {
              handleToggle(navItem.menu.menu);
              handleIconClick();
            }}>
            <div
              className={` ${
                isNavSmall
                  ? 'flex flex-col items-center justify-center w-20'
                  : 'flex items-center space-x-2'
              }`}>
              {iconMapper[navItem.menu.menu] || <FaHome />}
              {
                <span
                  className={`${isNavSmall ? 'text-[0.8rem] text-center' : ''}`}>
                  {navItem.menu.menu}
                </span>
              }
            </div>
            {navItem.menu.submenus &&
              navItem.menu.submenus.length > 0 &&
              !isNavSmall &&
              (activeSection === navItem.menu.menu ? (
                <FaAngleDown />
              ) : (
                <FaAngleRight />
              ))}
          </div>
        )}
        {navItem.menu.submenus && (
          <div
            className={`ml-8 mt-2 space-y-1 text-sm overflow-hidden transition-all duration-300 ease-in-out ${
              activeSection === navItem.menu.menu && !isNavSmall
                ? 'max-h-screen'
                : 'max-h-0'
            }`}>
            {navItem.menu.submenus
              .filter((subItem) => subItem) // Remove null entries
              .sort((a, b) => a.id - b.id) // Sort subMenu items by id
              .map((subItem, subIndex) => (
                <NavLink
                  to={subItem.subMenuUrl}
                  key={`${index}-${subIndex}`}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 p-2 rounded transition-colors duration-200 text-[0.8rem] ${
                      isActive
                        ? 'bg-gray-300 text-blue-600'
                        : 'hover:bg-gray-200'
                    }`
                  }
                  onClick={() => {
                    handleSubmenuClick(
                      subItem.subMenuUrl,
                      subItem.subMenu,
                      subItem.subMenu,
                    );
                  }}>
                  {subIconMapper[subItem.subMenu] || <FaFileAlt />}
                  {!isNavSmall && <span>{subItem.subMenu}</span>}
                </NavLink>
              ))}
            
          </div>
        )}
      </li>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 font-400 overflow-y-auto flex flex-col justify-between lg:mt-0 z-100">
        <ul className="space-y-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index} className="text-gray-700 animate-pulse">
              <div className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-700 text-[1rem]">
                <div
                  className={` ${
                    isNavSmall
                      ? 'flex flex-col items-center justify-center w-20'
                      : 'flex items-center space-x-2'
                  }`}>
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  <div
                    className={`${
                      isNavSmall
                        ? 'w-16 h-4 bg-gray-300 rounded mt-2'
                        : 'w-24 h-4 bg-gray-300 rounded'
                    }`}></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-700 text-gray-700 lg:flex hidden items-center justify-start">
          <div
            className={` ${
              isNavSmall
                ? 'flex flex-col items-center justify-center w-20'
                : 'flex items-center space-x-2'
            }`}>
            <FaSignOutAlt className="mr-2" />
            {!isNavSmall ? (
              <span>Logout</span>
            ) : (
              <span
                className={`${isNavSmall ? 'text-[0.8rem] text-center' : ''}`}>
                {'Logout'}
              </span>
            )}
          </div>
        </div>
      </div>
    ); // Show skeleton loading while fetching data
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-400 overflow-y-auto flex flex-col justify-between lg:mt-0 z-100">
      <ul className="space-y-2">{generateMenu()}</ul>
      <div
        className="mt-4 p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-700 text-gray-700 lg:flex hidden items-center justify-start"
        onClick={handleLogout}>
        <div
          className={` ${
            isNavSmall
              ? 'flex flex-col items-center justify-center w-20'
              : 'flex items-center space-x-2'
          }`}>
          <FaSignOutAlt className="mr-2" />
          {!isNavSmall ? (
            <span>Logout</span>
          ) : (
            <span
              className={`${isNavSmall ? 'text-[0.8rem] text-center' : ''}`}>
              {'Logout'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
