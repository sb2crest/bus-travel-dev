import React, { ChangeEvent, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { FaExclamationTriangle } from 'react-icons/fa';
import dataService from '../../services/data.service';
import IVehicleData from '../../types/vehicle.type';
import NewPopUp from './NewPopUp';

interface State {
    vehicleData: IVehicleData;
    vehicleAdded: boolean;
    phoneNumber: string;
    otp: string;
    sentOtp: string | null;
    otpVerified: boolean;
    isPopupOpen: boolean;
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
    published: false
};

const Login: React.FC = () => {
    const [state, setState] = useState<State>({
        vehicleData: initialVehicleData,
        vehicleAdded: false,
        phoneNumber: "",
        otp: "",
        otpVerified: false,
        sentOtp: null,
        isPopupOpen: false,
    });

    // For tracking information
    const [showModal, setShowModal] = useState(false);
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [otpVerified, setOtpVerified] = useState<boolean>(false);
    const [otpResend, setOtpResend] = useState<boolean>(false);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [showNewPopUp, setShowNewPopUp] = useState(false);
    const [resendDisabled, setResendDisabled] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(180); // 180 seconds = 3 minutes


    console.log("showNewPopUp:", showNewPopUp);

    //For Form Validation
    const [firstNameValid, setFirstNameValid] = useState<boolean>(true);
    const [lastNameValid, setLastNameValid] = useState<boolean>(true);
    const [phoneNumberValid, setPhoneNumberValid] = useState<boolean>(true);
    const [emailValid, setEmailValid] = useState<boolean>(true);

    // Function to handle phone number input change
    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, phoneNumber: e.target.value });
    };

    // OTP Generation Function
    const sendOTP = () => {
        const { phoneNumber } = state;
        dataService.sendOTP(phoneNumber)
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
        setOtpResend(true);
    };

    // OTP Verification Function
    const verifyOTP = () => {
        let requestBody = {
            "mobile": phoneNumber,
            "otp": otp
        }
        dataService.verifyOTP(requestBody)
            .then((response: { data: any; }) => {
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
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (resendDisabled) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);

            if (timer <= 0) {
                setResendDisabled(false);
                clearInterval(interval);
                setTimer(180); // Reset the timer to 3 minutes when it completes
            }
        }
        return () => {
            clearInterval(interval); // Cleanup interval on component unmount or timer completion
        };
    }, [resendDisabled, timer]);

    const formatDigits = (value: number): string => {
        return value.toString().padStart(2, '0');
    }

    const minutes: string = formatDigits(Math.floor(timer / 60));
    const seconds: string = formatDigits(timer % 60);

    const handleResendClick = (): void => {
        const { phoneNumber } = state;
        dataService.sendOTP(phoneNumber)
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
        setOtpResend(true);
        setResendDisabled(true);
    };

    //For Clearing Form
    const clearForm = () => {
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setPhoneNumber('');
        setEmail('');
        setOtp('');
    };

    //Email Validation
    const emailValidation = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);

    }

    //Name Validation
    const nameValidation = (name: string) => {
        return name.trim() !== '' && /^[A-Za-z\s]+$/.test(name);
    }

    //Phone Number Validation
    const phoneNumberValidation = (phone: string) => {
        return phone.trim() !== '' && /^[0-9]{10}/.test(phone);
    }

    // Function to show the new pop-up when the Submit button is clicked
    const showNewPopUpOnClick = () => {
        setState({ ...state, isPopupOpen: true }); // Open the popup
    };

    // Function to close the new pop-up
    const closeNewPopUp = () => {
        setState({ ...state, isPopupOpen: false }); // Close the popup
    };

    //Function to confirm the new pop-up
    const confirmNewPopUp = () => {
        setState({ ...state, isPopupOpen: false });// on Confirm open the popup and clear form
        clearForm();
    }
    return (
        <div className="container">
            {state.isPopupOpen ? ( // Conditionally render the NewPopUp component
                <NewPopUp onClose={closeNewPopUp} onConfirm={confirmNewPopUp} />
            ) : (
                <>
                    {/* Dummy Button*/}
                    <button
                        type="button"
                        className="btn btn-info btn-round"
                        onClick={() => setShowModal(true)}
                    >
                        Login
                    </button>
                    {/*Pop-Up Logic*/}
                    <div
                        className={`modal ${showModal ? 'show' : ''}`}
                        id="loginModal"
                        tabIndex={-1}
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden={!showModal}
                        style={{ display: showModal ? 'block' : 'none' }}
                    >
                        <div className="modal-dialog modal-dialog-centered popup-content" role="document">
                            <div className="modal-content">
                                {/* Cross Icon*/}
                                <div className="modal-header border-bottom-0">
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                {/* Pop-Up Form*/}
                                <div className="modal-body">
                                    <div className="d-flex flex-column text-center">
                                        <form >
                                            {/* First Name*/}
                                            <div className={`form-group ${!firstNameValid ? 'has-error' : ''}`}>
                                                <input
                                                    type="text"
                                                    className={`form-control first-name ${!firstNameValid ? 'error-border' : ''}`}
                                                    id="firstname"
                                                    value={firstName}
                                                    placeholder="First Name"
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    onBlur={(e) => setFirstNameValid(nameValidation(e.target.value))}
                                                />
                                                {(!firstNameValid || !nameValidation(firstName)) && (
                                                    <div className="error-message">
                                                        {(!firstNameValid && firstName.trim() === '') ?
                                                            <>
                                                                <FaExclamationTriangle className="error-icon" />
                                                                This field is required
                                                            </>
                                                            : (!firstNameValid ?
                                                                <>
                                                                    <FaExclamationTriangle className="error-icon" />
                                                                    Please enter a valid first name
                                                                </>
                                                                : null)}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Middle Name*/}
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control middle-name"
                                                    id="middlename"
                                                    value={middleName}
                                                    onChange={(e) => setMiddleName(e.target.value)}
                                                    placeholder="Middle Name"
                                                />
                                            </div>
                                            {/* Last Name*/}
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className={`form-control last-name ${!lastNameValid ? 'error-border' : ''}`}
                                                    id="lastname"
                                                    value={lastName}
                                                    placeholder="Last Name"
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    onBlur={(e) => setLastNameValid(nameValidation(e.target.value))}
                                                />
                                                {(!lastNameValid || !nameValidation(lastName)) && (
                                                    <div className="error-message">
                                                        {(!lastNameValid && lastName.trim() === '') ?
                                                            <>
                                                                <FaExclamationTriangle className="error-icon" />
                                                                This field is required
                                                            </>
                                                            : (!lastNameValid ?
                                                                <>
                                                                    <FaExclamationTriangle className="error-icon" />
                                                                    Please enter a valid last name
                                                                </>
                                                                : null)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    {/* Country Code */}
                                                    {/* <input
                                                        type="text"
                                                        className="form-control col-sm-2 country-code"
                                                        id="country-code"
                                                        value={countryCode}
                                                        placeholder="+91"
                                                        onChange={(e) => setCountryCode(e.target.value)}
                                                    /> */}
                                                    <select className='select-custom'>
                                                        <option value="+91">+91</option>
                                                    </select>
                                                    {/* Phone Number */}
                                                    <input
                                                        type="tel"
                                                        className={`form-control col-sm-10 phone ${!phoneNumberValid ? 'error-border' : ''}`}
                                                        id="phone-number"
                                                        value={state.phoneNumber}
                                                        onChange={handlePhoneNumberChange}
                                                        placeholder="Phone Number"
                                                        onBlur={(e) => setPhoneNumberValid(e.target.value.trim() !== '')}
                                                    />
                                                </div>
                                                {!phoneNumberValid &&
                                                    <div className="error-message">
                                                        <FaExclamationTriangle className="error-icon" />
                                                        Please enter a valid 10-digit phone number
                                                    </div>}
                                            </div>
                                            {/* Conditonal Rendering For Verify OTP and Send OTP*/}
                                            {otpSent && !otpVerified && (
                                                <div className="form-group otp-group">
                                                    {/* OTP */}
                                                    <div className="otp-container">
                                                        <input
                                                            type="password"
                                                            name="otp"
                                                            className="form-control otp"
                                                            placeholder="OTP"
                                                            value={otp}
                                                            onChange={(e) => setOtp(e.target.value)}
                                                            style={{ width: "60%" }}
                                                        />
                                                        {/*  Verify OTP */}
                                                        <button
                                                            type="button"
                                                            className="btn btn-info btn-block btn-round verify-otp-button"
                                                            onClick={verifyOTP}

                                                        >
                                                            Verify
                                                        </button>
                                                    </div>
                                                    <div className="resend-container">
                                                        <p className='header-5-custom'>
                                                            {resendDisabled ? <span className='timer-custom'>Resend OTP in <span className='min-sec'>{minutes}:{seconds}</span> </span> :
                                                                <span className='not-received'>Not Received OTP?</span>}
                                                            {!resendDisabled && (
                                                                <a className='resend-link' onClick={handleResendClick}>
                                                                    Resend
                                                                </a>
                                                            )}
                                                        </p>
                                                    </div>

                                                </div>
                                            )}
                                            {/* Send  OTP */}
                                            {!otpSent && (
                                                <button
                                                    type="button"
                                                    className="btn btn-info btn-block btn-round send-otp-button"
                                                    onClick={sendOTP}
                                                >
                                                    Send OTP
                                                </button>
                                            )}

                                            {/* Email */}
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control email"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    onBlur={(e) => setEmailValid(emailValidation(e.target.value))}
                                                    placeholder="Email"
                                                />
                                                {!emailValid && (
                                                    <div className="error-message">
                                                        <FaExclamationTriangle />
                                                        Please enter a valid email address
                                                    </div>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <div className="form-group">
                                                    {/* Submit */}
                                                    <div className="row">
                                                        <div className="col">
                                                            <button
                                                                type="button"
                                                                className='btn btn-secondary btn-block btn-round submit-button'
                                                                onClick={() => {
                                                                    // Show the new pop-up when the Submit button is clicked
                                                                    showNewPopUpOnClick();
                                                                }}
                                                            >
                                                                Submit
                                                            </button>

                                                        </div>
                                                        {/* Clear*/}
                                                        <div className="col">
                                                            <button
                                                                type="button"
                                                                className="btn btn-secondary btn-block btn-round clear-button"
                                                                onClick={clearForm}
                                                            >
                                                                Clear
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Conditionally render the new pop-up here */}
                                            {showNewPopUp && <NewPopUp onClose={closeNewPopUp} onConfirm={confirmNewPopUp} />}
                                        </form>
                                        {/* <div className="text-center text-muted delimiter">
                                    or use a social network
                                </div> */}
                                        <div className="d-flex justify-content-center social-buttons">
                                            {/* <button
                                        type="button"
                                        className="btn btn-secondary btn-round custom-icon-color"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Twitter"
                                    >
                                        <i className="fab fa-twitter"></i>
                                    </button> */}
                                            {/* <button
                                        type="button"
                                        className="btn btn-secondary btn-round custom-icon-color"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Facebook"
                                    >
                                        <i className="fab fa-facebook"></i>
                                    </button> */}
                                            {/* <button
                                        type="button"
                                        className="btn btn-secondary btn-round custom-icon-color"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Linkedin"
                                    >
                                        <i className="fab fa-linkedin"></i>
                                    </button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
export default Login;

