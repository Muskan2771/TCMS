import React from 'react';
import { motion } from 'framer-motion';

const Container = ({ children, title }) => {
  return (
    <motion.div
      className="flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <div className="w-full mx-[4%] my-[2%] border shadow-xl rounded-2xl ">
        {title && (
          <div className="font-700 text-2xl lg:text-4xl px-10 py-5">
            {title}
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
};

export default Container;
