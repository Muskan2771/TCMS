import { useState } from 'react';
import navModel from '../nav/navItems.model';

const AccessMenuModel = () => {
  const initialState = {
    role: {
      id: 0,
      role: '',
    },
    accessControl: [navModel().initialState],
  };

  const [accessMenu, setAccessMenu] = useState(initialState);

  return {
    accessMenu,
    setAccessMenu,
    initialState,
  };
};

export default AccessMenuModel;
