import React from 'react';
import './Confirmation.scss';
import { Link } from 'react-router-dom';

const Confirmation: React.FC = () => {
    return (
        <div className="modal show" id="newPopUp">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content-confirmation">
                    <div className="modal-body-confirmation">
                        <div className='tick-mark'>
                            <i className="fa-regular fa-circle-check"></i>
                        </div>
                        <div className='info'>
                            <p className='set'>Booking Complete!</p>
                            <p className='info-message'>
                                Your Booking ID is
                                <span className='booking-id'>NB123478</span> <br />
                                <br />
                                Your booking details has been sent to your email, <br />
                                navigate to Booking Info Page to review  Booking Information
                            </p>
                        </div>
                        <div className='return-button'>
                            <Link to='/home'>
                                <button className='return-button'>Done</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirmation