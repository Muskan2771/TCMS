import React, { useEffect, useState } from 'react';
import {
  FaHome,
  FaUsers,
  FaClipboardList,
  FaBoxOpen,
  FaUserShield,
  FaUserCog,
  FaDropbox,
  FaCircle,
  BiSolidOffer,
  AiFillProduct,
  IoIosArrowForward,
  IoMdSettings,
  GiBookshelf,
  IoDocumentAttachOutline,
  GiBoxUnpacking,
  PiHeadsetFill,
  RiShieldUserFill,
  FaArrowRightLong,
} from '../../../components/common/icons/icons'; // Update the import path as needed
import { Button, Container, Input, Loader } from '../../../components';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAccess } from '../../../context/accessContext/AccessContextProvider';

const iconMap = {
  Home: <FaHome />,
  Settings: <IoMdSettings />,
  'Manage User Profile': <FaUserCog />,
  Customers: <FaUsers />,
  'Product Group': <AiFillProduct />,
  Product: <FaDropbox />,
  Offers: <BiSolidOffer />,
  'Terms And Conditions': <IoDocumentAttachOutline />,
  Service: <PiHeadsetFill />,
  'Alternate Product': <GiBoxUnpacking />,
  'Access and Privilege': <RiShieldUserFill />,
  Proposal: <FaClipboardList />,
  Application: <GiBookshelf />,
  'Sales Rep': <FaUserShield />,
  Inventory: <FaBoxOpen />,
  BTS: <FaClipboardList />,
  'Create Proposal': <FaClipboardList />,
  'Restore Proposal': <FaClipboardList />,
  'View/Edit Proposal': <FaClipboardList />,
};

// Rest of the ManageAccess component code...

const ManageAccess = () => {
  const { role, id } = useParams();

  const [activeSection, setActiveSection] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    setAccessMenu((prevAccessMenu) => ({
      ...prevAccessMenu,
      role: { id, role },
    }));
  }, [role, id]);

  const {
    getMenuAndSubMenu,
    response,
    getMenuAndSubMenuByUser,
    accessMenu,
    setAccessMenu,
    clearData,
    saveAccess,
  } = useAccess();
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getMenuAndSubMenu();
      await getMenuAndSubMenuByUser(id);
      setLoading(false);
    };

    fetchData();
    return () => clearData();
  }, [id]);

  useEffect(() => {
    initializeCheckedItems();
    ensureHomeMenu();
  }, [accessMenu]);

  // Initialize the checked state based on accessMenu
  const initializeCheckedItems = () => {
    if (!accessMenu || !Array.isArray(accessMenu.accessControl)) {
      setCheckedItems({});
      return;
    }

    const initialCheckedItems = {};
    accessMenu.accessControl.forEach((menuItem) => {
      if (menuItem?.menu?.submenus) {
        initialCheckedItems[menuItem.menu.menu] = true;
        menuItem.menu.submenus.forEach((subMenu) => {
          initialCheckedItems[subMenu.subMenu] = true;
        });
      }
    });
    setCheckedItems(initialCheckedItems);
  };

  const ensureHomeMenu = () => {
    setAccessMenu((prevAccessMenu) => {
      const { role, id, accessControl } = prevAccessMenu;

      const homeMenu = {
        menu: {
          id: 1,
          menu: 'Home',
          menuUrl: ' ',
          submenus: [],
        },
      };

      const hasHomeMenu = accessControl.some(
        (item) => item?.menu?.menu === 'Home',
      );

      if (!hasHomeMenu) {
        return {
          role,
          id,
          accessControl: [homeMenu, ...accessControl],
        };
      }

      return prevAccessMenu;
    });
  };

  const handleToggle = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Handle changes when clicking on checkboxes
  const handleCheckboxChange = (item, isSubmenu = false, parentMenu = null) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = { ...prevCheckedItems };

      if (!isSubmenu) {
        // Handle menu checkbox toggle
        const submenus =
          response.menuSubmenus.find((menu) => menu.menu.menu === item)?.menu
            ?.submenus || [];

        const allSubmenusSelected = submenus.every(
          (subMenu) => updatedCheckedItems[subMenu.subMenu],
        );

        const isChecked = !allSubmenusSelected; // Invert selection
        updatedCheckedItems[item] = isChecked;

        submenus.forEach((subMenu) => {
          updatedCheckedItems[subMenu.subMenu] = isChecked;
        });

        updateAccessMenu(
          {
            id: response.menuSubmenus.find((menu) => menu.menu.menu === item)
              ?.menu.id,
            menu: item,
          },
          isChecked,
          submenus,
          updatedCheckedItems,
        );
      } else {
        // Handle submenu checkbox toggle
        updatedCheckedItems[item] = !updatedCheckedItems[item];

        const submenus =
          response.menuSubmenus.find((menu) => menu.menu.menu === parentMenu)
            ?.menu?.submenus || [];

        const anySubmenuSelected = submenus.some(
          (subMenu) => updatedCheckedItems[subMenu.subMenu],
        );

        updatedCheckedItems[parentMenu] = anySubmenuSelected;

        updateAccessMenu(
          {
            id: response.menuSubmenus.find(
              (menu) => menu.menu.menu === parentMenu,
            )?.menu.id,
            menu: parentMenu,
          },
          anySubmenuSelected,
          submenus,
          updatedCheckedItems,
        );
      }

      return updatedCheckedItems;
    });
  };

  // Update accessMenu with the correct items and checked state
  const updateAccessMenu = (
    menuObject,
    isChecked,
    submenus = [],
    updatedCheckedItems,
  ) => {
    setAccessMenu((prevAccessMenu) => {
      const { role, id, accessControl } = prevAccessMenu; // Destructure role and id

      let updatedAccessMenu = [...(accessControl || [])];
      const menuIndex = updatedAccessMenu.findIndex(
        (item) => item?.menu?.menu === menuObject.menu,
      );

      if (isChecked) {
        if (menuIndex > -1) {
          updatedAccessMenu[menuIndex].menu.submenus = submenus.filter(
            (subMenu) => updatedCheckedItems[subMenu.subMenu],
          );
        } else {
          updatedAccessMenu.push({
            menu: {
              id: menuObject.id || null, // Ensure id is included
              menu: menuObject.menu,
              menuUrl: menuObject.menuUrl || '',
              submenus: submenus.filter(
                (subMenu) => updatedCheckedItems[subMenu.subMenu],
              ),
            },
          });
        }
      } else {
        if (menuIndex > -1) {
          if (
            submenus.some((subMenu) => updatedCheckedItems[subMenu.subMenu])
          ) {
            updatedAccessMenu[menuIndex].menu.submenus = submenus.filter(
              (subMenu) => updatedCheckedItems[subMenu.subMenu],
            );
          } else {
            updatedAccessMenu.splice(menuIndex, 1);
          }
        }
      }

      return { role, id, accessControl: updatedAccessMenu };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Filter out empty menu items and submenus
    const filteredAccessMenu = {
      ...accessMenu,
      accessControl: accessMenu.accessControl.filter((menuItem) => {
        if (!menuItem.menu.menu || menuItem.menu.menu === '') {
          return false;
        }
        menuItem.menu.submenus = menuItem.menu.submenus.filter(
          (subMenu) => subMenu.subMenu && subMenu.subMenu !== '',
        );
        return true;
      }),
    };

    saveAccess(filteredAccessMenu);
  };

  useEffect(() => {
    console.log('Acc Menu', accessMenu);
  }, [accessMenu]);

  if (loading) {
    return (
      <Container title={`Access & Privilege : ${role}`}>
        <div className="flex justify-center items-center ">
          <Loader />
        </div>
      </Container>
    );
  }

  return (
    <Container title={`Access & Privilege : ${role}`}>
      <div className="font-300 px-10 text-blue-800 font-bold">
        <NavLink to="/" className="underline">
          Home
        </NavLink>
        &nbsp;&nbsp;&nbsp; {'>'}&nbsp;&nbsp;&nbsp;
        <NavLink to="/user-access" className="underline">
          Roles
        </NavLink>
      </div>
      <section className="flex gap-10 m-5 items-center">
        <div className="basis-3/5">
          {response?.menuSubmenus
            ?.sort((a, b) => a.menu.id - b.menu.id) // Sort by menu id
            .map((menuItem, index) => {
              const { menu } = menuItem;
              return (
                <div key={index}>
                  <div
                    className="flex justify-between items-center px-5 my-2 bg-slate-50 hover:bg-slate-100 rounded-lg font-400 cursor-pointer"
                    onClick={() => handleToggle(menu.menu)}>
                    <div className="flex justify-center items-center gap-3">
                      <div>{iconMap[menu.menu] || <FaHome />}</div>
                      <div>{menu.menu}</div>
                    </div>
                    <div>
                      <Input
                        type="checkbox"
                        disabled={menu.menu === 'Home'}
                        checked={
                          menu.menu === 'Home' ||
                          checkedItems[menu.menu] ||
                          false
                        }
                        onChange={(e) => {
                          e.stopPropagation();
                          handleCheckboxChange(menu.menu);
                        }}
                      />
                    </div>
                  </div>

                  {/* Checking if submenus exist */}
                  {menu.submenus?.length > 0 && (
                    <div
                      className={`space-y-1 text-sm overflow-hidden transition-all duration-300 ease-in-out ${
                        activeSection === menu.menu ? 'max-h-screen' : 'max-h-0'
                      }`}>
                      {menu.submenus.map((subItem, subIndex) => (
                        <div
                          className="flex justify-between items-center px-5 bg-slate-50 hover:bg-slate-100 pl-20 font-400"
                          key={subIndex}>
                          <div className="flex justify-center items-center gap-2">
                            <div>{iconMap[subItem.subMenu] || <FaUsers />}</div>
                            <div>{subItem.subMenu}</div>
                          </div>
                          <Input
                            type="checkbox"
                            checked={checkedItems[subItem.subMenu] || false}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleCheckboxChange(
                                subItem.subMenu,
                                true,
                                menu.menu,
                              );
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        <div className="min-h-full mt-auto mb-auto">
          <FaArrowRightLong />
        </div>
        <div className="basis-2/5 shadow-2xl rounded-2xl items-center h-96 overflow-y-auto">
          <p className="font-800 text-xl text-balance text-center py-2 border-b">
            Selected Access
          </p>

          {/* Sort and map over the accessControl to display selected menus and submenus */}
          {accessMenu?.accessControl
            ?.sort((a, b) => a?.menu?.id - b?.menu?.id) // Sort by menu id
            .map((accessItem, index) => {
              const { menu } = accessItem; // Destructuring to get menu object
              const menuId = index + 1; // Assign sequential id starting from 1

              return (
                <div key={menuId}>
                  <div className="flex justify-start ml-5 items-center font-400 text-sm my-2 font-bold">
                    <div>
                      <IoIosArrowForward />
                    </div>
                    <div>{menu?.menu}</div>
                  </div>

                  {/* Check if submenus exist and render them */}
                  {menu?.submenus?.length > 0 && (
                    <div className="ml-10 space-y-1">
                      {menu?.submenus
                        .sort((a, b) => a.subMenu.localeCompare(b.subMenu)) // Sort submenus alphabetically
                        .map((subItem, subIndex) => (
                          <div
                            className="flex justify-start items-center font-400 text-xs"
                            key={`${menuId}-${subIndex + 1}`} // Ensure unique key for submenus
                          >
                            <div className="text-[5px] px-2">
                              <FaCircle />
                            </div>
                            <div>{subItem?.subMenu}</div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </section>
      <div className="flex justify-center mr-20 my-5 gap-5">
        <Button onClick={() => navigate('/user-access')}>
          <div>Cancel</div>
        </Button>
        <Button onClick={onSubmit}>
          <div>Save</div>
        </Button>
      </div>
    </Container>
  );
};

export default ManageAccess;
