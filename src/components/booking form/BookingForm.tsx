import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import React, { useState, useEffect, FormEvent } from "react";
import "./form.scss";
import IVehicleData from "../../types/vehicle.type";
import DatePicker from "react-datepicker";
import dataService from "../../services/data.service";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
// import ISlotsBooked from "../../types/slots/slots.request.type";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
  onBookingIdUpdate: (bookingId: string, phoneNumber: string) => void;
  vehicleNumber: string;
  fromDate: Date;
  toDate: Date;
}

const BookingForm: React.FC<BookingFormProps> = ({
  firstStepProp,
  onBookingIdUpdate,
  vehicleNumber,
  fromDate,
  toDate,
}) => {
  const [state, setState] = useState<State>({
    vehicleData: initialVehicleData,
    vehicleAdded: false,
    phoneNumber: "",
    otp: "",
    otpVerified: false,
    sentOtp: null,
    isPopupOpen: false,
  });

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string().required("Middle Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string()
      .min(10, "Phone Number must be 10 digits")
      .required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const [OTPMessage, setOTPMessage] = useState(false);

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
  const [validationFailureSnackbarOpen, setValidationFailureSnackbarOpen] =
    useState(false);

  //Date Picker
  const [checkout, setCheckout] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const initialValues = {
    phoneNumber: "",
    otp: "",
    email: "",
    isChecked: false,
  };

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
            setOTPMessage(true);
            setTimeout(() => {
              setOTPMessage(false);
            }, 2000);
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

  const handleOtpChange = (e: { target: { value: any } }) => {
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
  console.log("dates in bookingform", fromDate, toDate);
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

  /* Book Now Function */
  const bookVehicle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
        fromDate: fromDate ? fromDate.toISOString().split("T")[0] : "",
        toDate: toDate ? toDate.toISOString().split("T")[0] : "",
        user: {
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          mobile: phoneNumber,
          email: email,
        },
        slot: {
          vehicleNumber: vehicleNumber,
          fromDate: fromDate ? fromDate.toISOString().split("T")[0] : "",
          toDate: toDate ? toDate.toISOString().split("T")[0] : "",
        },
      };
      dataService
        .bookNow(requestBody)
        .then((response: { data: any }) => {
          if (response.data && response.data.bookingId) {
            handleBookNowClick();
            setBookingId(response.data.bookingId);
            const bookingId = response.data.bookingId;
            console.log(
              "Props from bookingform:" +
                " " +
                "bookingid:" +
                bookingId +
                " " +
                "from-date:" +
                fromDate +
                " " +
                "to-date:" +
                toDate +
                " " +
                "phonenumber:" +
                phoneNumber
            );
            console.log("vehicle number:" + vehicleNumber);
            onBookingIdUpdate(bookingId, phoneNumber);
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
  /* Slots Function */
  // useEffect(() => {
  //     const fetchSlotsData = async () => {
  //         try {
  //             const response = await dataService.slotsBooked(vehicleNumber);
  //             // response.slots.dates.forEach((dateElement, index) => {
  //             //     console.log(`Date ${index + 1}:`);
  //             //     console.log(`  Date: ${dateElement.date}`);
  //             //     console.log(`  isBooked: ${dateElement.isBooked}`);
  //             // });
  //         } catch (error) {
  //             console.error('Error fetching booking data:', error);
  //         }
  //     };

  //     fetchSlotsData();
  // }, [vehicleNumber]);

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
    setShowContinue(false);
  };

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
    <div className="form-main-container">
      <Formik
        initialValues={{ firstName: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        <form>
          {showContinue ? (
            <>
              {!otpSent ? (
                <div>
                  <>
                    <input
                      id="input"
                      type="text"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <label placeholder="Phone Number"></label>
                    <button
                      className="send-otp"
                      onClick={sendOTP}
                      type="button"
                    >
                      Send OTP
                    </button>
                  </>
                </div>
              ) : (
                <>
                  {OTPMessage && (
                    <p className="sent-message">OTP Sent Successfully!</p>
                  )}
                  <input
                    id="input"
                    type="password"
                    required
                    value={otp}
                    onChange={handleOtpChange}
                  />
                  <label placeholder="OTP"></label>
                  {otpVerified && (
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 130.2 130.2"
                    >
                      <circle
                        className="path circle"
                        fill="none"
                        stroke="#73AF55"
                        stroke-width="6"
                        stroke-miterlimit="10"
                        cx="65.1"
                        cy="65.1"
                        r="62.1"
                      />
                      <polyline
                        className="path check"
                        fill="none"
                        stroke="#73AF55"
                        stroke-width="6"
                        stroke-linecap="round"
                        stroke-miterlimit="10"
                        points="100.2,40.2 51.5,88.8 29.8,67.5 "
                      />
                    </svg>
                  )}
                  {resendDisabled ? (
                    <span className="timer-custom">
                      Resend OTP in{" "}
                      <span className="min-sec" style={{ marginLeft: "0.2em" }}>
                        {minutes}:{seconds}
                      </span>{" "}
                    </span>
                  ) : (
                    <button
                      className="resend-otp"
                      onClick={resendOTP}
                      type="button"
                    >
                      Not received OTP ?{" "}
                      <span className="resend-link">Resend OTP</span>
                    </button>
                  )}
                </>
              )}
              <div>
                <input
                  id="input"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label placeholder="Email"></label>
              </div>
              <div className="terms-container">
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  checked={isChecked}
                />
                <p>
                  I agree to all the
                  <Link to="/termsConditions">
                    <span className="conditions">Terms and Conditions</span>
                  </Link>
                </p>
              </div>
              <div>
                <button
                  className="book-now"
                  onClick={bookVehicle}
                  disabled={!isChecked}
                >
                  Book Now
                </button>
                <button className="clear-all" onClick={clearAll}>
                  Clear All
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                id="input"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label placeholder="First Name"></label>
              <input
                id="input"
                type="text"
                required
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
              <label placeholder="Middle Name"></label>
              <input
                id="input"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label placeholder="Last Name"></label>
              <button
                className="cssbuttons-io-button"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  setShowContinue(true);
                }}
              >
                Continue
              </button>
            </>
          )}
        </form>
      </Formik>
    </div>
  );
};

export default BookingForm;
