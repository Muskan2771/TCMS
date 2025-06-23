import React, { createContext, useState, useContext, useEffect } from 'react';
import Modal from './Modal';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalCenter, setModalCenter] = useState(''); // New state for modal center

  // New state for modal title

  const openModal = (content, title = '', isCenter) => {
    // Accept title as an optional parameter
    setModalContent(content);
    setModalTitle(title); // Set the modal title
    setModalCenter(isCenter); // Set the modal center to false
    setModalOpen(true);

    return () => setModalOpen(false);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    // Add event listener for 'keydown' events
    window.addEventListener('keydown', handleEsc);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const closeModal = () => {
    setModalContent(null);
    setModalTitle(''); // Reset the modal title
    setModalCenter(''); // Reset the modal center to false
    setModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        isCenter={modalCenter}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};
