import React, { useState } from 'react';
import './Approval.scss';
import icon from '../../assets/images/blue-tick.jpg';

interface ApprovalProps {
    bookingid: string;
}

const Approval: React.FC<ApprovalProps> = ({ bookingid }) => {
    return (
        <div className='approval-container'>
            <div className='approval-body'>
                <div className='approval-summary'>
                    <div className='image-container'><img src={icon} /></div>
                    <p className='header'>Booking Confirmed!</p>
                    <div className='content'>
                        <p className='booking-number'>
                            Your Booking Number is
                            <span className='booking-id'>
                                {bookingid}
                            </span>
                        </p>
                        {/* <p className='driver-details'>Driver details will be mailed to your registered
                            Email
                        </p> */}
                        <p className='queries'>
                            Got any Queries?
                        </p>
                        <div className='contact'>
                            <p className='phone'>
                                <i className="fa-solid fa-square-phone icon-phone"></i>
                                7349368311
                            </p>
                            <p className='email'>
                                <i className="fa-solid fa-envelope icon-email"></i>
                                info@seabed2crest.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Approval