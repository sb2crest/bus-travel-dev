import React, { useState, ChangeEvent } from 'react'
import './BookingInfo.scss';
import asideImage from './Booking Info Images/Aside Image.png';
import { Link } from 'react-router-dom';
import dataService from '../../services/data.service';
import IVehicleData from '../../types/vehicle.type';

interface State {
    vehicleData: IVehicleData;
    phoneNumber: string;
    otp: string;
    sentOtp: string | null;
    otpVerified: boolean;
}

const initialVehicleData: IVehicleData = {
    vid: null,
    seatCapacity: 0,
    vehicleNumber: "",
    image: "",
    s3ImageUrl: "",
    isVehicleAC: false,
    isVehicleSleeper: false,
    sentOtp: null,
    published: false,
};


const BookingInfo = () => {
    const [state, setState] = useState<State>({
        vehicleData: initialVehicleData,
        phoneNumber: "",
        otp: "",
        otpVerified: false,
        sentOtp: null,
    });
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [verify, setVerify] = useState(false);
    const [otpResend, setOtpResend] = useState(false);
    const [showDetails, setShowDetails] = useState(false);


    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, phoneNumber: e.target.value });
    };

    const sendOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { phoneNumber } = state;
        dataService
            .sendOTP(phoneNumber)
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
        console.log("OTP sent!");
    }

    const verifyOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let requestBody = {
            mobile: phoneNumber,
            otp: otp,
        };
        dataService
            .verifyOTP(requestBody)
            .then((response: { data: any }) => {
                if (response.data) {
                    setState({ ...state, otpVerified: true });
                    console.log("OTP Verified!");
                } else {
                    console.log("OTP Verification Failed!");
                }
            })
            .catch((error: any) => {
                console.error("Error validating OTP:", error);
            });
        setVerify(true);
        setShowDetails(true);
        setOtpSent(false);
    }

    const resendOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { phoneNumber } = state;
        dataService
            .sendOTP(phoneNumber)
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
                            value={state.phoneNumber}
                            onChange={handlePhoneNumberChange}
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
                            !showDetails ? (
                                <button className='button-send-otp' onClick={sendOTP}>
                                    Send OTP
                                </button>
                            )
                                : null}
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