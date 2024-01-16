import React, { useState } from "react";
import "./ProgressBar.scss";
import BookingForm from "../booking form/BookingForm";
import footerImage from "../../assets/images/progressbar-footer-image.jpg";
import Checkout from "../summary/Checkout";
import Approval from "../approval/Approval";
import { Link, useLocation } from "react-router-dom";

interface LocationState {
  vehicleNumber: any;
  selectedDateRange: any;
}

const ProgressBar: React.FC = () => {
  const [firstStepCompleted, setFirstStepCompleted] = useState(false);
  const [secondStepCompleted, setSecondStepCompleted] = useState(false);
  const [thirdStepcompleted, setThirdStepCompleted] = useState(false);
  const [lastStepCompleted, setLastStepCompleted] = useState(false);
  const location = useLocation<LocationState>();
  const { vehicleNumber, selectedDateRange } = location.state;

  const scrollToTop = () => {
    window.scrollTo({ top: -1000, behavior: "smooth" });
  };

  console.log("vehicle number:" + vehicleNumber);

  /* Steps in Progress Bar */
  const handleFirstStep = (value: boolean) => {
    console.log("value of first step:" + value);
    setFirstStepCompleted(value);
  };

  const handleSecondStep = (value: boolean) => {
    console.log("value of second step:" + value);
    setSecondStepCompleted(value);
  };

  const handleThirdStep = (value: boolean) => {
    console.log("value of third step:" + value);
    setThirdStepCompleted(value);
  };

  const handleLastStep = (value: boolean) => {
    console.log("value of last step:" + value);
    setLastStepCompleted(value);
  };

  const [bookingId, setBookingId] = useState<string>("");
  const [fromDate, setFromDate] = useState<Date | null>(
    selectedDateRange ? selectedDateRange.startDate : null
  );
  const [toDate, setToDate] = useState<Date | null>(
    selectedDateRange ? selectedDateRange.endDate : null
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // Callback function to receive the bookingId from BookingForm
  const handlePropsUpdate = (bookingId: string, phoneNumber: string) => {
    setBookingId(bookingId);
    setPhoneNumber(phoneNumber);
  };
  console.log("selected dates from progressbar", selectedDateRange);
  return (
    <>
      <div className="progress-container">
        <div className="progress-content">
          <Link to="/home">
            <i
              className="fa fa-arrow-circle-left back-icon"
              onClick={scrollToTop}
            ></i>
          </Link>
          <ul>
            <li>
              <i className="icons awesome fa-solid fa-user"></i>
              <div
                className={`first-round   ${
                  firstStepCompleted ? "firststepcompleted" : ""
                }`}
              >
                <i className="awesome fa-solid fa-check"></i>
              </div>
              <p className="label">Details</p>
            </li>
            <li>
              <i className="icons awesome fa-solid fa-bus"></i>
              <div
                className={`second-round ${
                  secondStepCompleted ? "secondstepcompleted" : ""
                }`}
              >
                <i className="awesome fa-solid fa-check"></i>
              </div>
              <p className="label">Review Booking</p>
            </li>
            <li>
              <i className="icons awesome fa-solid fa-indian-rupee-sign"></i>
              <div
                className={`third-round ${
                  thirdStepcompleted ? "thirdstepcompleted" : ""
                }`}
              >
                <i className="awesome fa-solid fa-check"></i>
              </div>
              <p className="label">Payment</p>
            </li>
            <li>
              <i className="icons awesome fa-solid fa-thumbs-up"></i>
              <div
                className={`last-round ${
                  lastStepCompleted ? "laststepcompleted" : ""
                }`}
              >
                <i className="awesome fa-solid fa-check"></i>
              </div>
              <p className="label">Approval</p>
            </li>
          </ul>
        </div>
        {firstStepCompleted ? (
          <Checkout
            fromDate={fromDate as Date}
            toDate={toDate as Date}
            bookingId={bookingId}
            phoneNumber={phoneNumber}
            secondStepProp={handleSecondStep}
            thirdStepProp={handleThirdStep}
            lastStepProp={handleLastStep}
          />
        ) : (
          <BookingForm
            firstStepProp={handleFirstStep}
            onBookingIdUpdate={handlePropsUpdate}
            vehicleNumber={vehicleNumber}
            fromDate={fromDate as Date}
            toDate={toDate as Date}
          />
        )}
        <div
          className="image-container"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 999,
          }}
        >
          <img
            src={footerImage}
            alt="footer-image"
            style={{ height: "100px", width: "650px" }}
          />
          <img
            src={footerImage}
            alt="footer-image"
            style={{ height: "100px", width: "650px" }}
          />
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
