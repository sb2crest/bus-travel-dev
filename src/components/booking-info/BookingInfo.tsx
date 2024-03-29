import React, { useState } from "react";
import "./BookingInfo.scss";
import asideImage from "../../assets/images/Aside.png";
import dataService from "../../services/data.service";
import BookingDetails from "./booking-details/BookingDetails";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { IBookingList } from "../../types/BookingInfo/response.type";

interface State {
  phoneNumber: string;
  otp: string;
  sentOtp: string | null;
  otpVerified: boolean;
  phoneNumberLocked: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BookingInfo = () => {
  const [state, setState] = useState<State>({
    phoneNumber: "",
    otp: "",
    otpVerified: false,
    sentOtp: null,
    phoneNumberLocked: false,
  });
  const [otpSent, setOtpSent] = useState(false);
  const [verify, setVerify] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<IBookingList>();
  const [ShowDetailsButton, setShowDetailsButton] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [verifySnackbarOpen, setVerifySnackbarOpen] = useState(false);
  const [failedSnackbarOpen, setFailedSnackbarOpen] = useState(false);
  const [failedtosend, setFailedtosend] = useState(false);

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^[0-9]*$/, "Phone number must contain only digits")
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    otp: Yup.lazy((value) => {
      return value?.otpSent
        ? Yup.string()
            .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
            .required("OTP is required")
        : Yup.string();
    }),
  });

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      otp: "",
      otpSent: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.otpSent) {
      } else {
        console.log(values);
      }
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
  /*--------------------------------- API Integration------------------------------------------ */

  const sendOTP = async () => {
    let mobile = values.phoneNumber;
    dataService
      .sendOTP(mobile)
      .then((response: any) => {
        if (response.data) {
          setState({ ...state, sentOtp: response.data.sentOtp });
          console.log("OTP Sent!");
          setOtpSent(true);
          setSnackbarOpen(true);
          setVerify(true);
        } else {
          console.log("Failed to send OTP.");
        }
      })
      .catch((error: any) => {
        console.error("Error sending OTP:", error);
        console.log("An error occurred while sending OTP.");
        setFailedtosend(true);
      });
  };

  const verifyOTP = async () => {
    try {
      let requestBody = {
        mobile: values.phoneNumber,
        otp: values.otp,
      };
      const response = await dataService.verifyOTP(requestBody);

      if (response.data) {
        setState({ ...state, otpVerified: true, phoneNumberLocked: true });
        setShowDetailsButton(true);
        setVerifySnackbarOpen(true);
        setVerify(false);
        setOtpVerified(true);
        console.log("OTP Verified!");
      } else {
        console.log("OTP Verification Failed!");
        setOtpVerified(false);
        setFailedSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      setOtpVerified(false);
      setFailedSnackbarOpen(true);
    } finally {
      formik.setFieldValue("otpSent", false);
    }
  };
  /*--------------------------------------------------------------------------------------------- */

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setFailedSnackbarOpen(false);
    setSnackbarOpen(false);
    setVerifySnackbarOpen(false);
    setFailedtosend(false)
  };

  const resendOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let mobile = values.phoneNumber;
    dataService
      .sendOTP(mobile)
      .then((response) => {
        if (response.status == 200) {
          setState({ ...state, sentOtp: response.data.sentOtp });
          setSnackbarOpen(true);
          console.log("OTP Resent!");
        } else {
          console.log("Failed to send OTP.");
        }
      })
      .catch((error: any) => {
        console.error("Error sending OTP:", error);
        console.log("An error occurred while sending OTP.");
      });
    formik.setFieldValue("otpSent", true);
  };

  const bookingInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!values.phoneNumber || (!values.otpSent && !values.otp)) {
    } else {
      let mobile = values.phoneNumber;
      dataService
        .bookingInfo(mobile)
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

  return (
    <>
      <div className="booking-details-main">
        <div className="booking-details-container">
          <div className="booking_container_banner">
            <h1>Booking Info</h1>
            <h3>Check Your Booking Details here...</h3>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>&#10095;</li>
              <li>Booking Info</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="booking-info">
        {!showDetails ? (
          <div className="booking-info-container">
            <form className="form" onSubmit={handleSubmit}>
              <div className="header-custom">
                <p className="header">Booking Details</p>
              </div>
              <div className="phone">
                <input
                  placeholder="Phone Number"
                  type="number"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={() => setFieldTouched("phoneNumber", true)}
                  className="input-phone"
                  disabled={state.phoneNumberLocked}
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <div
                    className="error"
                    style={{ color: "red", textAlign: "left" }}
                  >
                    {errors.phoneNumber}
                  </div>
                )}
              </div>
              <div className="send-otp">
                {values.otpSent || verify ? (
                  <>
                    <div className="otp">
                      <input
                        placeholder="OTP"
                        type="password"
                        name="otp"
                        value={values.otp}
                        onChange={handleChange}
                        onBlur={() => setFieldTouched("otp", true)}
                        className="input-otp"
                        maxLength={6}
                      />
                      {touched.otp && errors.otp && (
                        <div
                          className="error"
                          style={{ color: "red", textAlign: "left" }}
                        >
                          {errors.otp}
                        </div>
                      )}
                    </div>
                    <div className="verify-resend">
                      <div className="verify-resend-01">
                        <button
                          className="verify"
                          type="button"
                          role="button"
                          onClick={verifyOTP}
                        >
                          Verify OTP
                        </button>
                          
                        <button className="resend" onClick={resendOTP} type="button">
                          Resend
                        </button>
                      </div>
                    </div>
                  </>
                ) : !verify && !otpVerified ? (
                  // Render "Send OTP" button only if OTP verification is not successful
                  <button className="button-send-otp" onClick={sendOTP} type="button">
                    Send OTP
                  </button>
                ) : null}
              </div>
              {ShowDetailsButton && (
                <div className="show-details">
                  <div className="show-details-01">
                    <button
                      className="button-show-details"
                      onClick={bookingInfo}
                    >
                      Show Details
                    </button>
                  </div>
                </div>
              )}
            </form>
            <div className="image-container">
              <div className="image-wrapper">
                <img src={asideImage} alt="Image" className="image-class" />
              </div>
            </div>
            <div data-testid="snackbar">
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert onClose={handleSnackbarClose} severity="success">
                  OTP Sent successfully!
                </Alert>
              </Snackbar>
              <Snackbar
                open={failedtosend}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert onClose={handleSnackbarClose} severity="error">
                  Failed to send OTP!
                </Alert>
              </Snackbar>
            </div>
            <Snackbar
              open={verifySnackbarOpen}
              autoHideDuration={2000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={handleSnackbarClose} severity="success">
                Verification Successful
              </Alert>
            </Snackbar>
            <Snackbar
              open={failedSnackbarOpen}
              autoHideDuration={2000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={handleSnackbarClose} severity="error">
                Verification failed!!
              </Alert>
            </Snackbar>
          </div>
        ) : (
          bookingDetails && <BookingDetails bookingDetails={bookingDetails} />
        )}
      </div>
    </>
  );
};

export default BookingInfo;
