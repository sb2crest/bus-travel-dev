import React, { useState, ChangeEvent } from 'react'
import './BookingInfo.scss';
import asideImage from '../../assets/images/Aside Image.png';
import dataService from '../../services/data.service';
import BookingDetails from './booking details/BookingDetails';
import Warning from '../warning component/Warning';

interface State {
    phoneNumber: string;
    otp: string;
    sentOtp: string | null;
    otpVerified: boolean;
    bookingID: string
}

const BookingInfo = () => {
    const [state, setState] = useState<State>({
        bookingID: "",
        phoneNumber: "",
        otp: "",
        otpVerified: false,
        sentOtp: null,
    });
    const [bookingID, setBookingID] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [verify, setVerify] = useState(false);
    const [otpResend, setOtpResend] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [bookingDetails, setBookingDetails] = useState<any>(null);
    const [ShowDetailsButton, setShowDetailsButton] = useState(false);
    const [showSendButton, setShowSendButton] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const sendOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let mobile = phoneNumber;
        dataService
            .sendOTP(mobile)
            .then((response) => {
                if (response.data) {
                    setState({ ...state, sentOtp: response.data.sentOtp });
                    console.log("OTP Sent!");
                } else {
                    console.log("Failed to send OTP.");
                }
            })
            .catch((error: any) => {
                console.error("Error sending OTP:", error);
                console.log("An error occurred while sending OTP.");
            });
        setOtpSent(true);
    }

    const resendOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let mobile = phoneNumber;
        dataService
            .sendOTP(mobile)
            .then((response) => {
                if (response.data) {
                    setState({ ...state, sentOtp: response.data.sentOtp });
                    console.log("OTP Resent!");
                } else {
                    console.log("Failed to send OTP.");
                }
            })
            .catch((error: any) => {
                console.error("Error sending OTP:", error);
                console.log("An error occurred while sending OTP.");
            });
        setOtpSent(true);
        setOtpResend(true);
    }

    const verifyOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let requestBody = {
            mobile: phoneNumber,
            otp: otp,
        };
        dataService
            .verifyOTP(requestBody)
            .then((response) => {
                if (response.data) {
                    setState({ ...state, otpVerified: true });
                    setShowDetailsButton(true);
                    console.log("OTP Verified!");
                } else {
                    console.log("OTP Verification Failed!");
                }
            })
            .catch((error: any) => {
                console.error("Error validating OTP:", error);
            });
        setVerify(true);
        setOtpSent(false);
    }

    const bookingInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!bookingID || !phoneNumber || (!otpSent && !otp)) {
            setShowWarning(true);
        }
        else {
            let bookingNumber = bookingID;
            dataService
                .bookingInfo(bookingNumber)
                .then((response) => {
                    if (response.data) {
                        console.log("Booking Info Retrieved:", response.data);
                        setBookingDetails(response.data);
                        setShowDetails(true);
                    } else {
                        console.log("Failed to retrieve booking info.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching booking info:", error);
                    console.log("An error occurred while retrieving booking info.");
                });
        }
    };

    const closeWarning = () => {
        setShowWarning(false);
    };

    return (
        <div className='booking-info'>
            {!showDetails ? (
                <div className='booking-info-container'>
                    <form className='form'>
                        <div className='header-custom'>
                            <p className='header'>Booking Details</p>
                        </div>
                        <div className='booking-id'>
                            <input
                                placeholder='Booking ID'
                                type='text'
                                value={bookingID}
                                onChange={(e) => setBookingID(e.target.value)}
                                className='input-booking-id' />
                        </div>
                        <div className='phone'>
                            <input
                                placeholder='Phone Number'
                                type='text'
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className='input-phone' />
                        </div>
                        <div className='send-otp'>
                            {otpSent ? (
                                <>
                                    <div className='otp'>
                                        <input
                                            placeholder='OTP'
                                            type='password'
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className='input-otp' />
                                    </div>
                                    <div className='verify-resend'>
                                        <div className='verify-resend-01'>
                                            <button className='verify' onClick={verifyOTP}>Verify OTP</button>
                                            <button className='resend' onClick={resendOTP}>Resend</button>
                                        </div>
                                    </div>
                                </>
                            ) :
                                !verify ? (
                                    <button className='button-send-otp' onClick={sendOTP}>
                                        Send OTP
                                    </button>
                                )
                                    : null}
                        </div>
                        {ShowDetailsButton && (
                            <div className='show-details'>
                                <div className='show-details-01'>
                                    <button className='button-show-details' onClick={bookingInfo}>Show Details</button>
                                </div>
                            </div>
                        )}
                    </form>
                    <div className='image-container'>
                        <div className='image-wrapper'>
                            <img src={asideImage} alt='Image' className='image-class' />
                        </div>
                    </div>
                </div>
            ) : (
                bookingDetails && <BookingDetails bookingDetails={bookingDetails} bookingID={bookingID} />
            )}
            {showWarning && <Warning onClose={closeWarning} />}
        </div>
    )
}
export default BookingInfo