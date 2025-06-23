import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  className,
  type,
  style,
  onClick,
  disabled,
  onMouseEnter,
}) => {
  const baseClass =
    'px-4 py-2 text-lg rounded-3xl font-400 flex justify-center items-center gap-2';
  const classes = disabled
    ? `btn-disabled ${baseClass} pointer-events-none`
    : className === 'primary'
      ? `btn-primary ${baseClass}`
      : className === 'secondary'
        ? `btn-secondary ${baseClass}`
        : `btn-primary ${baseClass}`;

  return (
    <motion.button
      type={type}
      className={classes}
      style={style}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
      {children}
    </motion.button>
  );
};

export default Button;
