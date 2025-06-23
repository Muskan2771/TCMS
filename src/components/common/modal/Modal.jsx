import React, { memo } from 'react';

const Modal = memo(({ isOpen, onClose, title, children, isCenter }) => {
  if (!isOpen) return null;

  const modalClass = `fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-[9999]`; // Ensure modal backdrop is on top
  const modalContentClass = `absolute bg-white px-10 py-10 my-10 rounded-xl shadow-2xl min-w-screen max-h-screen overflow-auto z-[10000]`; // Use absolute positioning for modal content
  const modalHeaderClass = 'flex justify-between items-center mb-5';
  const modalTitleClass = 'font-600 text-2xl';
  const modalCloseButtonClass = 'text-3xl font-600 text-black';
  const modalContentWrapperStyle = {
    maxHeight: 'calc(100vh - 200px)',
    overflowY: 'auto',
  };

  return (
    <div className={modalClass}>
      <div className={modalContentClass}>
        <div className={modalHeaderClass}>
          <div>{title && <h2 className={modalTitleClass}>{title}</h2>}</div>
          <div>
            <button className={modalCloseButtonClass} onClick={onClose}>
              &times;
            </button>
          </div>
        </div>
        <div
          className="modal-content-wrapper overflow-x-clip"
          style={modalContentWrapperStyle}>
          {children}
        </div>
      </div>
    </div>
  );
});

export default Modal;
