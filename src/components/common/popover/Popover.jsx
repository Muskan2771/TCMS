import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Popover.css';

const Popover = ({ content, children, position = 'right' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div
      className="popover-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {children}
      {isVisible && (
        <div className={`popover-content popover-${position} z-50`}>
          {content}
        </div>
      )}
    </div>
  );
};

Popover.propTypes = {
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'left-top']),
};

export default Popover;
