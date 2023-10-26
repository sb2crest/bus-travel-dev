import React, { useState } from 'react';
import './NewPopUp.css'
import Confirmation from '../booking/Booking Confirmation/Confirmation';
interface NewPopUpProps {
    onClose: () => void;
    onConfirm: () => void;
}
console.log("NewPopUp component rendered");

const NewPopUp: React.FC<NewPopUpProps> = ({ onClose, onConfirm }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onConfirm();
        setShowConfirmation(true);
    };

    return (
        <div className="modal show" id="newPopUp">
            {showConfirmation ? <Confirmation/> :
                (
                    <>
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <p className='message-popup'>Are you sure you want to Book?</p>
                                    <button className="btn btn-secondary  btn-round popup-confirm d-inline" type='submit' onClick={handleConfirm}>Book</button>
                                    <button className="btn btn-secondary  btn-round  popup-close d-inline" onClick={onClose}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default NewPopUp;
