import React from 'react';
import { Popover } from '../index';

const ActionButtons = ({ actions }) => {
  return (
    <div className="">
      {actions.map((action, index) => (
        <>
          <Popover key={index} content={action.tooltip} position="left-top">
            <button
              className={action.className}
              onClick={action.onClick}
              disabled={action.disabled}>
              {action.icon}
            </button>
          </Popover>
        </>
      ))}
    </div>
  );
};

export default ActionButtons;
