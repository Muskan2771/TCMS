import { useState } from 'react';

const navModel = () => {
  const initialState = {
    menu: {
      id: 0,
      menu: '',
      menuUrl: null,
    },
    subMenu: [
      {
        id: 0,
        subMenu: '',
        subMenuUrl: '',
      },
    ],
  };

  const [navItem, setNavItems] = useState(initialState);

  return { navItem, setNavItems, initialState };
};

export default navModel;
