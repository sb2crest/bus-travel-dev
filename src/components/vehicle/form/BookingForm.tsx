import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import React, { useState, useEffect, FormEvent } from "react";
import './form.scss';
import IVehicleData from "../../../types/vehicle.type";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Warning from "../../warning/Warning";
import dataService from "../../../services/data.service";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { toDate } from "date-fns";
import Checkout from "../summary/Checkout";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    published: false,
};

interface BookingFormProps {
    firstStepProp: (step: boolean) => void;
    onBookingIdUpdate: (bookingId: string, fromDate: string, toDate: string, phoneNumber: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ firstStepProp, onBookingIdUpdate }) => {
    const location = useLocation<LocationState>();
    const [state, setState] = useState<State>({
        vehicleData: initialVehicleData,
        vehicleAdded: false,
        phoneNumber: "",
        otp: "",
        otpVerified: false,
        sentOtp: null,
        isPopupOpen: false,
    });


    /* First Step Callback to Progress Bar */
    const [firstStepCompleted, setFirstStepCompleted] = useState(false);

    const handleBookNowClick = () => {
        setFirstStepCompleted(true);
        firstStepProp(true);
    };

    useEffect(() => {
        console.log("firstStepCompleted updated:", firstStepCompleted);
    }, [firstStepCompleted]);


    //Form input State Variables
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    //OTP State Variables
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [otpVerified, setOtpVerified] = useState<boolean>(false);
    const [otpResend, setOtpResend] = useState<boolean>(false);
    const [resendDisabled, setResendDisabled] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(180); // 180 seconds = 3 minutes;
    const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(false);

    //Form Validation State Variables
    const [firstNameValid, setFirstNameValid] = useState<boolean>(true);
    const [lastNameValid, setLastNameValid] = useState<boolean>(true);
    const [phoneNumberValid, setPhoneNumberValid] = useState<boolean>(true);
    const [emailValid, setEmailValid] = useState<boolean>(true);

    //State Variable for continue button
    const [showContinue, setShowContinue] = useState<boolean>(false);

    //State Variable used in showing warning component
    const [showWarning, setShowWarning] = useState(false);

    const [bookingId, setBookingId] = useState<string>("");


    //State Variables for Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [verifySnackbarOpen, setVerifySnackbarOpen] = useState(false);
    const [slotsBookedSnackbarOpen, setSlotsBookedSnackbarOpen] = useState(false);
    const [validationFailureSnackbarOpen, setValidationFailureSnackbarOpen] = useState(false);

    //Date Picker
    const [checkout, setCheckout] = useState(false);

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    /*------------------------------------------------------ Form Validation------------------------------------------------------------*/

    //Email Validation
    const emailValidation = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    //Name Validation
    const nameValidation = (name: string) => {
        return name.trim() !== "" && /^[A-Za-z\s]+$/.test(name);
    };

    //Phone Number Validation
    const phoneNumberValidation = (phone: string) => {
        return /^\d{10}$/.test(phone);
    };

    //Clear Form
    const clearForm = () => {
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setPhoneNumber("");
        setEmail("");
        setFromDate("");
        setToDate("");
    };
    /*-----------------------------------------------------------------API Integration-----------------------------------------------------*/
    /*OTP Generation Function*/
    const sendOTP = () => {
        const isValidPhoneNumber = validatePhoneNumber(phoneNumber);
        if (isValidPhoneNumber) {
            dataService
                .sendOTP(phoneNumber)
                .then((response: any) => {
                    if (response.data) {
                        setState({ ...state, sentOtp: response.data.sentOtp });
                        console.log("OTP Sent!");
                        setOtpSent(true);
                        setSnackbarOpen(true);
                    } else {
                        console.log("Failed to send OTP.");
                    }
                })
                .catch((error: any) => {
                    console.error("Error sending OTP:", error);
                    console.log("An error occurred while sending OTP.");
                });
        } else {
            console.log("Invalid phone number. Please enter a valid phone number.");
        }
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        const phoneRegex = /^[0-9]*$/;
        return phoneRegex.test(phoneNumber);
    };

    useEffect(() => {
        if (otp.length === 6) {
            verifyOTP();
        }
    }, [otp]);

    const handleOtpChange = (e: { target: { value: any; }; }) => {
        const enteredOtp = e.target.value;
        if (enteredOtp.length <= 6) {
            setOtp(enteredOtp);
        }
    };

    /*OTP Verification Function*/
    const verifyOTP = () => {
        if (otp.trim() === "") {
            return;
        }
        let requestBody = {
            mobile: phoneNumber,
            otp: otp,
        };
        dataService
            .verifyOTP(requestBody)
            .then((response: { data: any }) => {
                if (response.data) {
                    setState({ ...state });
                    console.log("OTP Verified!");
                    setOtpVerified(true);
                    setVerifySnackbarOpen(true);
                } else {
                    console.log("OTP Verification Failed!");
                    setOtpVerified(false);
                }
            })
            .catch((error: any) => {
                if (error == "Error: Request failed with status code 400") {
                    setValidationFailureSnackbarOpen(true);
                }
                console.error("Error validating OTP:", error);
                setOtpVerified(false);
            });
    };

    /* Resend OTP Function */
    const resendOTP = (): void => {
        dataService
            .sendOTP(phoneNumber)
            .then((response: any) => {
                if (response.data) {
                    setState({ ...state, sentOtp: response.data.sentOtp });
                    console.log("OTP Sent!");
                    setSnackbarOpen(true);
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

    interface LocationState {
        vehicleNumber: any;
        images?: string[];
    }

    /* Book Now Function */
    const bookVehicle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const vehicleNumber = location.state?.vehicleNumber;
        if (
            !firstName ||
            !lastName ||
            !phoneNumber ||
            !otp ||
            !email ||
            !fromDate ||
            !toDate
        ) {
            setShowWarning(true);
        } else {
            let requestBody = {
                vehicleNumber: vehicleNumber,
                fromDate: fromDate,
                toDate: toDate,
                // fromDate: startDate ? startDate.toISOString().split("T")[0] : "",
                // toDate: endDate ? endDate.toISOString().split("T")[0] : "",
                user: {
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    mobile: phoneNumber,
                    email: email,
                },
                slot: {
                    vehicleNumber: vehicleNumber,
                    fromDate: fromDate,
                    toDate: toDate,
                },
            };
            dataService
                .bookNow(requestBody)
                .then((response: { data: any }) => {
                    if (response.data && response.data.bookingId) {
                        handleBookNowClick();
                        setBookingId(response.data.bookingId);
                        const bookingId = response.data.bookingId;
                        console.log("Props from bookingform:" + " " + "bookingid:" + bookingId + " " + "from-date:" + fromDate
                            + " " + "to-date:" + toDate + " " + "phonenumber:" + phoneNumber);
                        onBookingIdUpdate(bookingId, fromDate, toDate, phoneNumber);
                        setCheckout(true);
                    } else {
                        console.log(" Booking failed");
                        if (response.data.message === "Slots already Booked") {
                            setSlotsBookedSnackbarOpen(true);
                        }
                    }
                })
                .catch((error: any) => {
                    console.error("Error in sending Request:", error);
                });
        }
    };
    /*-----------------------------------------------------------------------------------------------------------------------*/
    /* Resend Timer  */
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (resendDisabled) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            if (timer <= 0) {
                setResendDisabled(false);
                clearInterval(interval);
                setTimer(60);
            }
        }
        return () => {
            clearInterval(interval);
        };
    }, [resendDisabled, timer]);
    const formatDigits = (value: number): string => {
        return value.toString().padStart(2, "0");
    };
    const minutes: string = formatDigits(Math.floor(timer / 60));
    const seconds: string = formatDigits(timer % 60);

    const clearAll = () => {
        setFirstName(" ");
        setMiddleName(" ");
        setLastName(" ");
        setFromDate("");
        setToDate(" ");
        setPhoneNumber(" ");
        setOtp(" ");
        setEmail(" ");
        setShowContinue(false);
    }

    /* Function to Close Warning  */
    const closeWarning = () => {
        setShowWarning(false);
    };

    /* OTP successfully sent */
    const handleSnackbarClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    /* OTP Validation success  */
    const handleVerifyClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setVerifySnackbarOpen(false);
    };

    const handleSlotsSnackbarClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSlotsBookedSnackbarOpen(false);
    };

    const handleValidationFailure = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setValidationFailureSnackbarOpen(false);
    };

    /* Phone Number Change */
    const changePhoneNumber = () => {
        setOtpSent(false);
    };

    return (
        <div className='form-main-container'>
            <form>
                {showContinue ? (
                    <>
                        <div>
                            {/* {!otpSent && ( */}
                            <>
                                < input id="input"
                                    type="text" required
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <label placeholder="Phone Number"></label>
                                <button className='send-otp' onClick={sendOTP} type="button">
                                    Send OTP
                                </button>
                            </>
                            {/* )} */}
                        </div>
                        {/* {otpSent && ( */}
                        <>
                            {/* <div className="verify-otp-container"> */}
                            <input id="input"
                                type="text" required
                                value={otp}
                                onChange={handleOtpChange}
                            // maxLength="6"
                            />
                            <label placeholder="OTP"></label>
                            {/* <button className='verify-otp' onClick={verifyOTP} type="button">
                                        Verify OTP
                                    </button> */}

                            {/* </div> */}
                            {resendDisabled ? (
                                <span className="timer-custom">
                                    Resend OTP in{" "}
                                    <span className="min-sec">
                                        {minutes}:{seconds}
                                    </span>{" "}
                                </span>
                            ) : (
                                <button className='resend-otp' onClick={resendOTP} type="button">
                                    Not received OTP ? <span className="resend-link">Resend OTP</span>
                                </button>
                            )
                            }
                        </>
                        {/* )} */}
                        <div>
                            < input id="input"
                                type="text" required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label placeholder="Email"></label>
                        </div>
                        {!isChecked &&
                            <div className="terms-container">
                                <input
                                    type="checkbox"
                                    onChange={handleCheckboxChange}
                                    checked={isChecked}
                                />
                                <p>I agree to all the
                                    <span className="conditions">
                                        Terms and Conditions
                                    </span>
                                    {/* mentioned */}
                                </p>
                            </div>
                        }
                        {isChecked && (
                            <div>
                                <button className="book-now" onClick={bookVehicle}>Book Now</button>
                                <button className="clear-all" onClick={clearAll}>Clear All</button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <input id="input"
                            type="text" required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label placeholder="First Name"></label>
                        <input id="input"
                            type="text" required
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                        />
                        <label placeholder="Middle Name"></label>
                        <input id="input"
                            type="text" required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label placeholder="Last Name"></label>
                        {/* {!otpVerified && !otpSent && (
                    <>
                        < input id="input"
                            type="text" required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <label placeholder="Phone Number"></label>
                        <button className='send-otp' onClick={sendOTP} type="button">
                            Send OTP
                        </button>
                    </>
                )} */}
                        {/* {otpSent && !otpVerified && (
                    <>
                        <input id="input"
                            type="text" required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <label placeholder="OTP"></label>
                        <button className='verify-otp' onClick={verifyOTP} type="button">
                            Verify OTP
                        </button>
                    </>
                )} */}
                        <input id="input"
                            type="date" required
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                        <label placeholder="From Date"></label>
                        <input id="input"
                            type="date" required
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                        <label placeholder="To Date"></label>
                        <button className="cssbuttons-io-button" onClick={(e: React.MouseEvent<HTMLButtonElement>
                        ) => {
                            e.preventDefault();
                            setShowContinue(true);
                        }}>
                            Continue
                            <div className="icon">
                                <svg
                                    height="24"
                                    width="24"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="svg-icon"
                                >
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>
                        </button>
                    </>
                )}
            </form>
        </div>
    )
}

export default BookingForm