import React, { useState } from "react";
import "./BookingInfo.scss";
import asideImage from "../../assets/images/Aside Image.png";
import dataService from "../../services/data.service";
import Warning from "../warning/Warning";
import BookingDetails from "./booking-details/BookingDetails";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";

interface State {
  phoneNumber: string;
  otp: string;
  sentOtp: string | null;
  otpVerified: boolean;
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
  });
  const [otpSent, setOtpSent] = useState(false);
  const [verify, setVerify] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [ShowDetailsButton, setShowDetailsButton] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [verifySnackbarOpen, setVerifySnackbarOpen] = useState(false);

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^[0-9]*$/, "Phone number must contain only digits")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    otp: Yup.lazy((value) => {
      return value?.otpSent
        ? Yup.string().required("OTP is required")
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
        // verifyOTP();
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
        setState({ ...state, otpVerified: true });
        setShowDetailsButton(true);
        setVerifySnackbarOpen(true);
        setVerify(false);
        setOtpVerified(true);

        console.log("OTP Verified!");
      } else {
        console.log("OTP Verification Failed!");
        setOtpVerified(false);
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      setOtpVerified(false);
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

    setSnackbarOpen(false);
    setVerifySnackbarOpen(false);
  };

  const resendOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let mobile = values.phoneNumber;
    dataService
      .sendOTP(mobile)
      .then((response) => {
        if (response.status == 200) {
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
    formik.setFieldValue("otpSent", true);
  };

  const bookingInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!values.phoneNumber || (!values.otpSent && !values.otp)) {
      setShowWarning(true);
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

  const closeWarning = () => {
    setShowWarning(false);
  };

  return (
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
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <div className="error" style={{ color: "red" }}>
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
                    />
                    {touched.otp && errors.otp && (
                      <div className="error" style={{ color: "red" }}>
                        {errors.otp}
                      </div>
                    )}
                  </div>
                  <div className="verify-resend">
                    <div className="verify-resend-01">
                      <button className="verify" onClick={verifyOTP}>
                        Verify OTP
                      </button>
                      <button className="resend" onClick={resendOTP}>
                        Resend
                      </button>
                    </div>
                  </div>
                </>
             ) : !verify && !otpVerified ? (
              // Render "Send OTP" button only if OTP verification is not successful
              <button className="button-send-otp" onClick={sendOTP}>
                Send OTP
              </button>
            ) : null}
            </div>
            {ShowDetailsButton && (
              <div className="show-details">
                <div className="show-details-01">
                  <button className="button-show-details" onClick={bookingInfo}>
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
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert onClose={handleSnackbarClose} severity="success">
              OTP Sent successfully!
            </Alert>
          </Snackbar>
          <Snackbar
            open={verifySnackbarOpen}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert onClose={handleSnackbarClose} severity="success">
              Verification Successful
            </Alert>
          </Snackbar>
        </div>
      ) : (
        bookingDetails && <BookingDetails bookingDetails={bookingDetails} />
      )}
      {showWarning && <Warning onClose={closeWarning} />}
    </div>
  );
};

export default BookingInfo;
