import React from 'react';
import Modal from 'react-modal';
import './ConfirmationPopup.scss'; 

interface ConfirmationPopupProps {
  isOpen: boolean;
  content: React.ReactNode[]; 
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  isOpen,
  content,
}) => {
  const modalClass = `custom-modal-container ${isOpen ? 'show' : ''}`;
  return (
    
    <Modal
      isOpen={isOpen}
      contentLabel="Confirmation Popup"
      ariaHideApp={false}
      className={modalClass}
    >
      <div className="custom-modal">
      <div className="confirmation-popup">
          {content.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
    </Modal>
  
  );
};

export default ConfirmationPopup;
