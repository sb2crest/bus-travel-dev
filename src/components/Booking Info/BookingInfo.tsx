import React, { useState, useEffect } from 'react'
import './BookingInfo.scss';
import asideImage from './Booking Info Images/Aside Image.png';
import { Link } from 'react-router-dom';
import BookingDetails from './Booking Details/BookingDetails';
import dataService from '../../services/data.service';

const BookingInfo = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [verify, setVerify] = useState(false);
    const [otpResend, setOtpResend] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showSendOTP, setShowSendOTP] = useState(false);

    const sendOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOtpSent(true);
        console.log("OTP sent!");
    }

    const verifyOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setVerify(true);
        setShowDetails(true);
        setOtpSent(false);
        // setShowSendOTP(true);
    }

    const resendOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOtpSent(true);
        setOtpResend(true);
    }

    return (
        <div className='booking-info'>
            <div className='booking-info-container'>
                <form className='form'>
                    <div className='header-custom'>
                        <p className='header'>Booking Details</p>
                    </div>
                    <div className='booking-id'>
                        <input
                            placeholder='Booking ID'
                            type='text'
                            className='input-booking-id' />
                    </div>
                    <div className='phone'>
                        <input
                            placeholder='Phone Number'
                            type='text'
                            className='input-phone' />
                    </div>
                    <div className='send-otp'>
                        {otpSent ? (
                            <>
                                <div className='otp'>
                                    <input
                                        placeholder='OTP'
                                        type='password'
                                        className='input-otp' />
                                </div>
                                <div className='verify-resend'>
                                    <div className='verify-resend-01'>
                                        <button className='verify' onClick={verifyOTP}>Verify OTP</button>
                                        <button className='resend'>Resend</button>
                                    </div>
                                </div>
                            </>
                        ) :
                            <button className='button-send-otp' onClick={sendOTP}>Send OTP</button>
                        }
                    </div>
                    {showDetails && (
                        <>
                            <div className='show-details'>
                                <div className='show-details-01'>
                                    <Link to='/booking-details' className='anchor-custom'>
                                        <button className='button-show-details'>Show Details</button>
                                    </Link>
                                </div>

                            </div>
                        </>
                    )}
                </form>
                <div className='image-container'>
                    <div className='image-wrapper'>
                        <img src={asideImage} alt='Image' className='image-class' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingInfo