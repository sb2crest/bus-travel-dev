import "./VehicleInfo.scss";
import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { useState, useEffect, FormEvent } from "react";
import "./form.scss";
import { FaExclamationTriangle } from "react-icons/fa";
import IVehicleData from "../../../types/vehicle.type";
import BookingCalendar from "../../booking-calendar/BookingCalendar";
import DatePicker from "react-datepicker";
import "../../booking-calendar/BookingCalendar.scss";
import "react-datepicker/dist/react-datepicker.css";
import Warning from "../../warning/Warning";
import Checkout from "../../booking/checkout/Checkout";
import dataService from "../../../services/data.service";
import { toDate } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useLocation } from "react-router-dom";

interface Image {
  url: string;
}
interface LocationState {
  images?: string[];
}
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

interface VehicleInfoProps {
  otpSent: boolean;
  otpVerified: boolean;
}

const VehicleInfo: React.FC<VehicleInfoProps> = () => {
  const location = useLocation<LocationState>();
  const initialImages = location.state?.images || [];
  // const [images, setImages] = useState(initialImages);
  const [state, setState] = useState<State>({
    vehicleData: initialVehicleData,
    vehicleAdded: false,
    phoneNumber: "",
    otp: "",
    otpVerified: false,
    sentOtp: null,
    isPopupOpen: false,
  });

  const [selectedImage, setSelectedImage] = useState(initialImages);

  //State Variables to show Booking form pop-up
  const [showModal, setShowModal] = useState(false);

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

  //Form Validation State Variables
  const [firstNameValid, setFirstNameValid] = useState<boolean>(true);
  const [lastNameValid, setLastNameValid] = useState<boolean>(true);
  const [phoneNumberValid, setPhoneNumberValid] = useState<boolean>(true);
  const [emailValid, setEmailValid] = useState<boolean>(true);

  // State Variables used in Checkout pop-up
  const [checkout, setCheckout] = useState(false);
  const [bookingId, setBookingId] = useState<string>("");

  //State Variable used in showing warning component
  const [showWarning, setShowWarning] = useState(false);

  //State Variables for Date
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  //State Variables for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [verifySnackbarOpen, setVerifySnackbarOpen] = useState(false);
  const [slotsBookedSnackbarOpen, setSlotsBookedSnackbarOpen] = useState(false);

  //State Variable for phone number change
  const [phoneNumberChange, setPhoneNumberChange] = useState(false);

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
    setStartDate(null);
    setEndDate(null);
  };

  /*-----------------------------------------------------------------API Integration-----------------------------------------------------*/

  {
    /*OTP Generation Function*/
  }
  const sendOTP = () => {
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
  };

  {
    /*OTP Verification Function*/
  }
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
        console.error("Error validating OTP:", error);
        setOtpVerified(false);
      });
  };

  {
    /*Resend OTP Function*/
  }
  const ResendOTP = (): void => {
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

  {
    /* Book Now Function */
  }
  const bookVehicle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !otp ||
      !email ||
      !startDate ||
      !endDate
    ) {
      setShowWarning(true);
    } else {
      let requestBody = {
        vehicleNumber: "KA09EQ1234",
        fromDate: startDate ? startDate.toISOString().split("T")[0] : "",
        toDate: endDate ? endDate.toISOString().split("T")[0] : "",
        user: {
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          mobile: phoneNumber,
          email: email,
        },
        slot: {
          vehicleNumber: "KA09EQ1234",
          fromDate: startDate ? startDate.toISOString().split("T")[0] : "",
          toDate: endDate ? endDate.toISOString().split("T")[0] : "",
        },
      };
      dataService
        .bookNow(requestBody)
        .then((response: { data: any }) => {
          if (response.data && response.data.bookingId) {
            const bookingId = response.data;
            setCheckout(true);
            setBookingId(response.data.bookingId);
            console.log("Booking successful! Booking ID: " + response.data);
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

  {
    /* Resend Timer  */
  }
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

  {
    /* Function to Close Warning  */
  }
  const closeWarning = () => {
    setShowWarning(false);
  };

  const handleImageClick = (index: number) => {
    const newImages = [...selectedImage];
    [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
    setSelectedImage(newImages);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

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

  {
    /* Phone Number Change */
  }
  const changePhoneNumber = () => {
    setOtpSent(false);
  };

  return (
    <>
      {/* Vehicle Info */}
      <div className="vehicleInfo">
        <div className="vehicleInfo_banner">
          <h1>Vehicle Details</h1>
          <ul>
            <li>
              <Router>
                <Link to={"/#"}>Home</Link>
              </Router>
            </li>
            <li>&#10095;</li>
            <li>Vehicle Details</li>
          </ul>
        </div>
        <div className="vehicleInfo_container">
          <div className="image-gallery">
            <h1>Bus Details</h1>
            <div className="parent-image">
              {selectedImage.length > 0 && (
                <img
                  key={0}
                  src={selectedImage[0]}
                  alt={`Image 0`}
                  width={700}
                  height={350}
                  onClick={() => handleImageClick(0)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            <div className="child-images">
              {selectedImage.slice(1).map((image, index) => (
                <img
                  key={index + 1}
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={150}
                  height={100}
                  onClick={() => handleImageClick(index + 1)}
                  style={{ cursor: "pointer" }}
                />
              ))}
              {selectedImage.length === 0 && <p>No images available.</p>}
            </div>
          </div>
          <div className="bus_details">
            <div className="inclusions">
              <p className="inclusion-01">Inclusions</p>
              <div className="operator-icon-and-text">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ color: "#0f7bab" }}
                />
                <p>Extra usage at Rs. 15/KM to be paid to the operator</p>
              </div>
            </div>
            <div className="exclusions">
              <p className="exclusion-01">Exclusions</p>
              <div className="exclusion-info">
                <div className="rupee-icon-and-text">
                  <FontAwesomeIcon
                    icon={faIndianRupeeSign}
                    style={{ color: "#0f7bab" }}
                  />
                  <p>Interstate taxes are excluded</p>
                </div>
                <div className="icon-and-text">
                  <FontAwesomeIcon
                    icon={faIndianRupeeSign}
                    style={{ color: "#0f7bab" }}
                  />
                  <p>Toll charges are excluded in base fare</p>
                </div>
              </div>
            </div>
            {/* <div className="driver-details">
              <h2 >Vehicle & Driver Details</h2>
              <p className="details">You will receive driver and vehicle details one day before your journey.</p>
            </div> */}
            <div className="amenities">
              <h3>Amenities</h3>
              <div className="facility_icons">
                <div className="facility_icons_one">
                  <p>
                    <i
                      className="fa-solid fa-tv fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    &nbsp;&nbsp;&nbsp;Television
                  </p>
                  <p>
                    {" "}
                    <i
                      className="fa-solid fa-plug fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    &nbsp;&nbsp;&nbsp;240V Socket{" "}
                  </p>
                  <p>
                    {" "}
                    <i
                      className="fa-solid fa-bed fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    &nbsp;&nbsp;&nbsp;Cushioned seats{" "}
                  </p>
                </div>
                <div className="facility_icons_two">
                  <p>
                    <i
                      className="fa-solid fa-music fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    &nbsp;&nbsp;&nbsp;Audio system
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-fan  fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    &nbsp;&nbsp;&nbsp;AC
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-compact-disc  fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    &nbsp;&nbsp;&nbsp;DVD player
                  </p>
                </div>
              </div>
            </div>
            <div className="containers">
              <>
                <button
                  className="button-53"
                  onClick={() => setShowModal(true)}
                >
                  Book Now
                </button>
                {/*  Checkout Component */}
                {checkout ? (
                  <Checkout
                    bookingId={bookingId}
                    phoneNumber={phoneNumber}
                    fromDate={startDate ?? new Date()}
                    toDate={endDate ?? new Date()}
                  />
                ) : (
                  <div
                    className={`modal ${showModal ? "show" : ""}`}
                    data-testid="loginModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden={!showModal}
                    style={{ display: showModal ? "block" : "none" }}
                  >
                    <div
                      className="modal-dialog modal-dialog-centered popup-content"
                      role="document"
                    >
                      <div className="modal-content">
                        {/* Cross Icon*/}
                        <div className="modal-header border-bottom-0">
                          <button
                            type="button"
                            className="closes"
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
                            <form>
                              {/* First Name*/}
                              <div
                                className={`form-group ${
                                  !firstNameValid ? "has-error" : ""
                                }`}
                              >
                                <input
                                  type="text"
                                  className={`form-control first-name ${
                                    !firstNameValid ? "error-border" : ""
                                  }`}
                                  id="firstname"
                                  value={firstName}
                                  placeholder="First Name"
                                  onChange={(e) => setFirstName(e.target.value)}
                                  onBlur={(e) =>
                                    setFirstNameValid(
                                      nameValidation(e.target.value)
                                    )
                                  }
                                />
                                {/* {(!firstNameValid ||
                                    !nameValidation(firstName)) && (
                                      <div className="error-message">
                                        {!firstNameValid &&
                                          firstName.trim() === "" ? (
                                          <>
                                            <FaExclamationTriangle className="error-icon" />
                                            This field is required
                                          </>
                                        ) : !firstNameValid ? (
                                          <>
                                            <FaExclamationTriangle className="error-icon" />
                                            Please enter a valid first name
                                          </>
                                        ) : null}
                                      </div>
                                    )} */}
                              </div>
                              {/* Middle Name*/}
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control middle-name"
                                  id="middlename"
                                  value={middleName}
                                  onChange={(e) =>
                                    setMiddleName(e.target.value)
                                  }
                                  placeholder="Middle Name"
                                />
                              </div>
                              {/* Last Name*/}
                              <div className="form-group">
                                <input
                                  type="text"
                                  className={`form-control last-name ${
                                    !lastNameValid ? "error-border" : ""
                                  }`}
                                  id="lastname"
                                  value={lastName}
                                  placeholder="Last Name"
                                  onChange={(e) => setLastName(e.target.value)}
                                  onBlur={(e) =>
                                    setLastNameValid(
                                      nameValidation(e.target.value)
                                    )
                                  }
                                />
                                {/* {(!lastNameValid ||
                                    !nameValidation(lastName)) && (
                                      <div className="error-message">
                                        {!lastNameValid &&
                                          lastName.trim() === "" ? (
                                          <>
                                            <FaExclamationTriangle className="error-icon" />
                                            This field is required
                                          </>
                                        ) : !lastNameValid ? (
                                          <>
                                            <FaExclamationTriangle className="error-icon" />
                                            Please enter a valid last name
                                          </>
                                        ) : null}
                                      </div>
                                    )
                                  } */}
                              </div>
                              {!otpVerified ? (
                                <div className="form-group">
                                  <div className="input-group d-flex">
                                    <select className="select-custom ">
                                      <option value="+91">+91</option>
                                    </select>
                                    {/* Phone Number */}
                                    <input
                                      type="tel"
                                      className={`form-control col-sm-10  ${
                                        !phoneNumberValid ? "error-border" : ""
                                      }`}
                                      id="phone-number"
                                      value={phoneNumber}
                                      onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                      }
                                      placeholder="Phone Number"
                                      onBlur={(e) =>
                                        setPhoneNumberValid(
                                          phoneNumberValidation(e.target.value)
                                        )
                                      }
                                    />
                                  </div>
                                  {(!phoneNumberValid ||
                                    !phoneNumberValidation(phoneNumber)) && (
                                    <div className="error-message">
                                      {/* {!phoneNumberValid &&
                                            phoneNumber.trim() === "" ? (
                                            <>
                                              <FaExclamationTriangle className="error-icon" />
                                              This field is required
                                            </>
                                          ) :  */}
                                      {!phoneNumberValid && (
                                        <>
                                          {/* <FaExclamationTriangle className="error-icon" /> */}
                                          <span className="phone-warning">
                                            Please enter a valid mobile number
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="calendar">
                                  <div className="from-to-date">
                                    <div className="date-picker">
                                      <DatePicker
                                        selected={startDate}
                                        onChange={(date: Date) =>
                                          setStartDate(date)
                                        }
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="MM/dd/yyyy"
                                        placeholderText="From-Date"
                                        className="start-date"
                                        minDate={new Date()}
                                      />
                                    </div>
                                    <div className="date-picker">
                                      <DatePicker
                                        selected={endDate}
                                        onChange={(date: Date) =>
                                          setEndDate(date)
                                        }
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        dateFormat="MM/dd/yyyy"
                                        placeholderText="To-Date"
                                        className="end-date"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                              {/* Change Phone Number */}
                              {otpSent && !otpVerified && (
                                <p
                                  onClick={changePhoneNumber}
                                  className="change-phone-number"
                                >
                                  Change Phone Number
                                </p>
                              )}
                              {/* Conditonal Rendering For Verify OTP and Send OTP*/}
                              {otpSent && !otpVerified && (
                                <div className="form-group otp-group">
                                  {/* OTP */}
                                  <div className="otp-container d-flex">
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
                                      className="btn btn-info btn-round verify-otp-button"
                                      onClick={verifyOTP}
                                      style={{ width: "50%" }}
                                    >
                                      Verify
                                    </button>
                                  </div>
                                  <div className="resend-container">
                                    <p className="header-5-custom">
                                      {resendDisabled ? (
                                        <span className="timer-custom">
                                          resend otp in{" "}
                                          <span className="min-sec">
                                            {minutes}:{seconds}
                                          </span>{" "}
                                        </span>
                                      ) : (
                                        <span className="not-received">
                                          Not received otp?
                                        </span>
                                      )}
                                      {!resendDisabled && (
                                        <a
                                          className="resend-link"
                                          onClick={ResendOTP}
                                        >
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
                                  className="btn btn-info send-otp-button"
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
                                  onBlur={(e) =>
                                    setEmailValid(
                                      emailValidation(e.target.value)
                                    )
                                  }
                                  placeholder="Email"
                                />
                                {/* {!emailValid && (
                                    <div className="error-message">
                                      <FaExclamationTriangle />
                                      Please enter a valid email address
                                    </div>
                                  )} */}
                              </div>
                              <div className="form-group">
                                <div className="form-group">
                                  {/* Submit */}
                                  <div className="row">
                                    <div className="col">
                                      <button
                                        type="submit"
                                        className="btn btn-secondary btn-block btn-round submit-button"
                                        onClick={bookVehicle}
                                      >
                                        Book Now
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
                              {/* Warning pop-up */}
                              {showWarning && (
                                <Warning onClose={closeWarning} />
                              )}
                            </form>
                            <Snackbar
                              open={snackbarOpen}
                              autoHideDuration={7000}
                              onClose={handleSnackbarClose}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              data-testid="my-snackbar"
                            >
                              <Alert
                                onClose={handleSnackbarClose}
                                severity="success"
                              >
                                OTP Sent successfully!
                              </Alert>
                            </Snackbar>
                            <Snackbar
                              open={verifySnackbarOpen}
                              autoHideDuration={7000}
                              onClose={handleVerifyClose}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                            >
                              <Alert
                                onClose={handleVerifyClose}
                                severity="success"
                              >
                                Validation successful!
                              </Alert>
                            </Snackbar>
                            <Snackbar
                              open={slotsBookedSnackbarOpen}
                              autoHideDuration={7000}
                              onClose={handleSlotsSnackbarClose}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                            >
                              <Alert
                                onClose={handleSlotsSnackbarClose}
                                severity="error"
                              >
                                Slots are Already Booked!
                              </Alert>
                            </Snackbar>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleInfo;
