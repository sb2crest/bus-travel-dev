import React from 'react';
import './NewPopUp.css'
interface NewPopUpProps {
    onClose: () => void;
    onConfirm:()=>void;
}
console.log("NewPopUp component rendered");

const onConfirm=()=>{
    console.log("Form is being submitted");
}
const NewPopUp: React.FC<NewPopUpProps> = ({ onClose , onConfirm }) => {
    return (
        <div className="modal show" id="newPopUp">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <p className='message-popup'>Are you sure you want to Book?</p>
                        <button className="btn btn-secondary  btn-round popup-confirm d-inline" type='submit' onClick={onConfirm}>Book</button>
                        <button className="btn btn-secondary  btn-round  popup-close d-inline" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPopUp;
