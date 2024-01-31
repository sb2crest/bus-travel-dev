import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./form.scss";
import IVehicleData from "../../types/vehicle.type";
import dataService from "../../services/data.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";

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
  TotalAmount: number;
}

const BookingForm: React.FC<BookingFormProps> = ({
  firstStepProp,
  onBookingIdUpdate,
  vehicleNumber,
  fromDate,
  toDate,
  TotalAmount,
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
    middleName: Yup.string(),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]*$/, "Phone number must contain only digits")
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    email: Yup.string().email("Invalid email"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    setFieldTouched,
  } = formik;

  const { enqueueSnackbar } = useSnackbar();

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
  const [otp, setOtp] = useState("");

  //OTP State Variables
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [otpResend, setOtpResend] = useState<boolean>(false);
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(180); // 180 seconds = 3 minutes;

  //State Variable for continue button
  const [showContinue, setShowContinue] = useState<boolean>(false);

  const [bookingId, setBookingId] = useState<string>("");

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  /*OTP Generation Function*/
  const sendOTP = () => {
    const isValidPhoneNumber = values.phoneNumber;
    if (isValidPhoneNumber) {
      dataService
        .sendOTP(values.phoneNumber)
        .then((response: any) => {
          if (response.data) {
            setState({ ...state, sentOtp: response.data.sentOtp });
            console.log("OTP Sent!");
            setOtpSent(true);
            setOTPMessage(true);
            setTimeout(() => {
              setOTPMessage(false);
            }, 1000);
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
  useEffect(() => {
    if (otp.length === 6 && state.isPopupOpen) {
      verifyOTP();
    }
  }, [otp, state.isPopupOpen]);

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
      mobile: values.phoneNumber,
      otp: otp,
    };
    dataService
      .verifyOTP(requestBody)
      .then((response: { data: any }) => {
        if (response.data) {
          setState({ ...state });
          console.log("OTP Verified!");
          setOtpVerified(true);
        } else {
          console.log("OTP Verification Failed!");
          setOtpVerified(false);
        }
      })
      .catch((error: any) => {
        if (error == "Error: Request failed with status code 400") {
        }
        console.error("Error validating OTP:", error);
        setOtpVerified(false);
      });
  };
  /* Resend OTP Function */
  const resendOTP = (): void => {
    let mobile = values.phoneNumber;
    dataService
      .sendOTP(mobile)
      .then((response: any) => {
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

  /* Book Now Function */
  const bookVehicle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      !values.firstName ||
      !values.lastName ||
      !values.phoneNumber ||
      !otpVerified ||
      !fromDate ||
      !toDate ||
      !isChecked
    ) {
      enqueueSnackbar("Please fill in all the required fields.", {
        variant: "error",
      });
    } else {
      let requestBody = {
        vehicleNumber: vehicleNumber,
        fromDate: fromDate ? fromDate.toISOString().split("T")[0] : "",
        toDate: toDate ? toDate.toISOString().split("T")[0] : "",
        user: {
          firstName: values.firstName,
          middleName: values.middleName,
          lastName: values.lastName,
          mobile: values.phoneNumber,
          email: values.email,
        },
        slot: {
          vehicleNumber: vehicleNumber,
          fromDate: fromDate ? fromDate.toISOString().split("T")[0] : "",
          toDate: toDate ? toDate.toISOString().split("T")[0] : "",
        },
        totalAmount: TotalAmount,
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
                values.phoneNumber
            );
            console.log("vehicle number:" + vehicleNumber);
            onBookingIdUpdate(bookingId, values.phoneNumber);
          } else {
            console.log(" Booking failed");
            if (response.data.message === "Slots already Booked") {
            }
          }
        })
        .catch((error: any) => {
          console.error("Error in sending Request:", error);
        });
    }
  };
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

  const handleContinueClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    Object.keys(values).forEach((field) => {
      setFieldTouched(field, true);
    });

    if (!values.firstName) {
      formik.setFieldError("firstName", "First Name is required");
    }

    if (!values.lastName) {
      formik.setFieldError("lastName", "Last Name is required");
    } else {
      setShowContinue(true);
    }
  };

  const clearAll = () => {
    setShowContinue(false);
    setOtp("");
    setIsChecked(false);
    setResendDisabled(false);
    setOtpSent(false);
    formik.resetForm();
  };
  return (
    <div className="form-main-container">
      <form onSubmit={handleSubmit}>
        {showContinue ? (
          <>
            <button
              className="back_button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowContinue(false);
              }}
            >
              &#10918; Back
            </button>
            <p className="line"></p>
            <div>
              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone Number *"
                required
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={() => setFieldTouched("phoneNumber", true)}
                className="input-phone"
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <div className="error-message">{errors.phoneNumber}</div>
              )}
              {!otpSent && (
                <button className="send-otp" onClick={sendOTP} type="button">
                  Send OTP
                </button>
              )}
            </div>
            {OTPMessage && (
              <span className="sent-message">OTP Sent Successfully!</span>
            )}
            {otpSent && (
              <div className="otp">
                <input
                  id="otp"
                  type="password"
                  placeholder="OTP *"
                  required
                  value={otp}
                  onChange={handleOtpChange}
                />
                <button
                  className="verify-otp"
                  type="button"
                  onClick={verifyOTP}
                >
                  Verify OTP
                </button>
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
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      cx="65.1"
                      cy="65.1"
                      r="62.1"
                    />
                    <polyline
                      className="path check"
                      fill="none"
                      stroke="#73AF55"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      points="100.2,40.2 51.5,88.8 29.8,67.5 "
                    />
                  </svg>
                )}
              </div>
            )}
            {otpSent && (
              <>
                {!resendDisabled ? (
                  <button
                    className="resend-otp"
                    onClick={resendOTP}
                    type="button"
                  >
                    Not received OTP?{" "}
                    <span className="resend-link">Resend OTP</span>
                  </button>
                ) : (
                  <span className="timer-custom">
                    Resend OTP in{" "}
                    <span className="min-sec" style={{ marginLeft: "0.2em" }}>
                      {minutes}:{seconds}
                    </span>{" "}
                  </span>
                )}
              </>
            )}
            <div>
              <input
                id="email"
                type="text"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={() => setFieldTouched("email", true)}
              />
              {touched.email && errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>
            <div className="terms-container">
              <input
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={isChecked}
              />
              <p>
                &nbsp; I agree to all the
                <Link to="/termsConditions">
                  <span className="conditions">Terms and Conditions</span>
                </Link>
              </p>
            </div>
            <div>
              <button className="clear-all" onClick={clearAll}>
                Clear All
              </button>
              <button className="book-now" onClick={bookVehicle}>
                Book Now
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="form_heading">Enter the Details</h2>
            <input
              id="firstName"
              type="text"
              placeholder="First name*"
              required
              defaultValue={values.firstName}
              onChange={handleChange}
              onBlur={() => setFieldTouched("firstName", true)}
            />
            {touched.firstName && errors.firstName && (
              <div className="error-message">{errors.firstName}</div>
            )}
            <input
              id="middleName"
              type="text"
              placeholder="Middle name"
              required
              value={values.middleName}
              onChange={handleChange}
              onBlur={() => setFieldTouched("middleName", true)}
            />
            {touched.middleName && errors.middleName && (
              <div className="error-message">{errors.middleName}</div>
            )}
            <input
              id="lastName"
              type="text"
              placeholder="Last Name *"
              required
              value={values.lastName}
              onChange={handleChange}
              onBlur={() => setFieldTouched("lastName", true)}
            />
            {touched.lastName && errors.lastName && (
              <div className="error-message">{errors.lastName}</div>
            )}
            <button
              className="cssbuttons-io-button"
              onClick={handleContinueClick}
            >
              Continue
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
