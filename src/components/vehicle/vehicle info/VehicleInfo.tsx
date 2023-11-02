import "./VehicleInfo.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect, FormEvent } from "react";
import './form.scss';
import { FaExclamationTriangle } from "react-icons/fa";
import dataService from "../../../services/data.service";
import IVehicleData from "../../../types/vehicle.type";
import Warning from '../../warning component/Warning';
import Checkout from "../../booking/checkout/Checkout";

interface Image {
  url: string;
}

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
  images: Image[];
}

const VehicleInfo: React.FC<VehicleInfoProps> = ({ images }) => {
  const [state, setState] = useState<State>({
    vehicleData: initialVehicleData,
    vehicleAdded: false,
    phoneNumber: "",
    otp: "",
    otpVerified: false,
    sentOtp: null,
    isPopupOpen: false,
  });

  const [selectedImage, setSelectedImage] = useState<Image>(images[0]);

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

  // State Variables used in showing Empty Field Warning 
  const [showConfirmationpop, setShowConfirmationpop] = useState(false);

  // State Variables used in Checkout pop-up 
  const [checkout, setCheckout] = useState(false);
  const [bookingId, setBookingId] = useState<string>("");

  //State Variables used in showing Booking Confirmation pop-up
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    return phone.trim() !== "" && /^[0-9]{10}/.test(phone);
  };


  //Clear Form
  const clearForm = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setOtp("");
  };

  //Function to Check All fields are filled
  const isFormFilled = () => {
    const firstNameValid = nameValidation(firstName);
    const lastNameValid = nameValidation(lastName);
    const emailValid = emailValidation(email);
    const phoneNumberValid = phoneNumberValidation(phoneNumber);
    return firstNameValid && lastNameValid && emailValid && phoneNumberValid;
  };

  // Function to Submit the form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otpSent && otpVerified) {
      if (isFormFilled()) {
        console.log("Form submitted successfully!");
      } else {
        setShowConfirmationpop(!showConfirmationpop);
        console.log("Please fill out all fields in the form correctly");
      }
    }
  };

  /*-----------------------------------------------------------------API Integration-----------------------------------------------------*/

  { /*OTP Generation Function*/ }
  const sendOTP = () => {
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
  };

  { /*OTP Verification Function*/ }
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

  { /*Resend OTP Function*/ }
  const ResendOTP = (): void => {
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
    setOtpResend(true);
    setResendDisabled(true);
  };

  {/* Book Now Function */ }
  const bookVehicle = () => {
    let requestBody = {
      vehicleNumber: "KA09EQ1234",
      fromDate: '2023-11-30',
      toDate: '2023-11-05',
      user: {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        mobile: phoneNumber,
        email: email
      },
      slot: {
        vehicleNumber: "KA09EQ1234",
        fromDate: '2023-11-30',
        toDate: '2023-11-05'
      }
    }
    dataService
      .bookNow(requestBody)
      .then((response: { data: any }) => {
        if (response.data && response.data.bookingId) {
          const bookingId = response.data;
          setCheckout(true);
          setBookingId(response.data.bookingId);
          console.log("Booking successful! Booking ID: " + response.data);
        }
        else {
          console.log(" Booking failed");
        }
      })
      .catch((error: any) => {
        console.error("Error in sending Request:", error);
      })
  }
  /*-----------------------------------------------------------------------------------------------------------------------*/

  {/* Resend Timer  */ }
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (resendDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      if (timer <= 0) {
        setResendDisabled(false);
        clearInterval(interval);
        setTimer(180);
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


  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  return (
    <>
      <div className="vehicleInfo">
        <div className="vehicleInfo_banner">
          <h1>Vehicle Details</h1>
          <ul>
            <li>
              <Link to={"/#"}>Home</Link>
            </li>
            <li>&#10095;</li>
            <li>Vehicle Details</li>
          </ul>
        </div>
        <div className="vehicleInfo_container">
          <div className="image-gallery">
            <h1>Bus Details</h1>
            <div className="parent-image">
              <img
                src={selectedImage.url}
                alt="Selected"
                width={700}
                height={350}
              />
            </div>
            <div className="child-images">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  onClick={() => handleImageClick(image)}
                  width={150}
                  height={100}
                />
              ))}
            </div>
          </div>

          <div className="bus_details">
            <h2>Vehicle Facility</h2>
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

            <h2>Additional information</h2>

            <div className="additional_info">
              <div className="additional_info_one">
                <p>Seats :&nbsp;&nbsp;&nbsp;60</p>
                <p>Length :&nbsp;&nbsp;&nbsp;10.48 m</p>
                <p>Width :&nbsp;&nbsp;&nbsp;2.49 m</p>
                <p>Height :&nbsp;&nbsp;&nbsp;3.33 m</p>
              </div>
              <div className="additional_info_two">
                <p>Fuel Type :&nbsp;&nbsp;&nbsp;Diesel</p>
                <p>Tank Capacity :&nbsp;&nbsp;&nbsp;260L</p>
                <p>Transmission :&nbsp;&nbsp;&nbsp;Manual</p>
                <p>Year :&nbsp;&nbsp;&nbsp;2018</p>
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
                {/*Pop-Up Logic*/}
                <div
                  className={`modal ${showModal ? "show" : ""}`}
                  id="loginModal"
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
                          <form onSubmit={handleSubmit} >
                            {/* First Name*/}
                            <div
                              className={`form-group ${!firstNameValid ? "has-error" : ""
                                }`}
                            >
                              <input
                                type="text"
                                className={`form-control first-name ${!firstNameValid ? "error-border" : ''
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
                              {(!firstNameValid ||
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
                                )}
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
                                className={`form-control last-name ${!lastNameValid ? "error-border" : ""
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
                              {(!lastNameValid ||
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
                              }
                            </div>
                            <div className="form-group">
                              <div className="input-group d-flex">
                                <select className="select-custom ">
                                  <option value="+91">+91</option>
                                </select>
                                {/* Phone Number */}
                                <input
                                  type="tel"
                                  className={`form-control col-sm-10  ${!phoneNumberValid ? "error-border" : ""
                                    }`}
                                  id="phone-number"
                                  value={phoneNumber}
                                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                                    {!phoneNumberValid &&
                                      phoneNumber.trim() === "" ? (
                                      <>
                                        <FaExclamationTriangle className="error-icon" />
                                        This field is required
                                      </>
                                    ) : !phoneNumberValid ? (
                                      <>
                                        <FaExclamationTriangle className="error-icon" />
                                        Please enter a valid mobile number
                                      </>
                                    ) : null}
                                  </div>
                                )
                              }
                            </div>
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
                            {showConfirmationpop && <Warning />}
                            {/* Checkout pop-up */}
                            {checkout && <Checkout bookingId={bookingId} phoneNumber={phoneNumber} />}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleInfo;
