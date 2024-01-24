import React, { useState } from "react";
import "./ProgressBar.scss";
import BookingForm from "../booking form/BookingForm";
import footerImage from "../../assets/images/progressbar-footer-image.jpg";
import Checkout from "../summary/Checkout";
import { Link, useLocation, useHistory } from "react-router-dom";
import { styled } from "@mui/system";
import {
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  StepIconProps,
} from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import {
  DirectionsBus,
  Person,
  AttachMoney,
  ThumbUp,
} from "@mui/icons-material";
import Approval from "../approval/Approval";
interface LocationState {
  vehicleNumber: any;
  selectedDateRange: any;
  TotalAmount: number;
  AdvanceAmount: number;
  RemainingAmount: number;
  ACtype: string;
  Sleepertype: string;
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 20,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient( 95deg,#0f7bab 0%, #0f2454 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient( 95deg,#0f7bab 0%, #0f2454 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: "linear-gradient( 136deg,#0f7bab 0%, #0f2454 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage: "linear-gradient( 136deg,#0f7bab 0%, #0f2454 100%)",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <Person />,
    2: <DirectionsBus />,
    3: <AttachMoney />,
    4: <ThumbUp />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  "Details",
  "Review Booking",
  "Booking Payment",
  "Payment Confirmation",
];

const ProgressBar: React.FC = () => {
  const [firstStepCompleted, setFirstStepCompleted] = useState(false);
  const [secondStepCompleted, setSecondStepCompleted] = useState(false);
  const [thirdStepcompleted, setThirdStepCompleted] = useState(false);
  const [lastStepCompleted, setLastStepCompleted] = useState(false);
  const location = useLocation<LocationState>();
  const {
    vehicleNumber,
    selectedDateRange,
    TotalAmount,
    AdvanceAmount,
    RemainingAmount,
    ACtype,
    Sleepertype,
  } = location.state;
  const history = useHistory();

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
      <div className="progress_container">
        <div className="progress_container_content">
          <Link to="/booking">
            <abbr title="Close">
              {" "}
              <i
                className="fa-solid fa-xmark fa-xl back-icon"
                style={{ color: "#0f7bab" }}
                onClick={scrollToTop}
              ></i>
            </abbr>
          </Link>
          <Stack sx={{ width: "100%" }} spacing={4}>
            <Stepper
              alternativeLabel
              activeStep={(() => {
                if (lastStepCompleted) return 4;
                if (thirdStepcompleted) return 3;
                if (secondStepCompleted) return 2;
                if (firstStepCompleted) return 1;
                return 0;
              })()}
              connector={<ColorlibConnector />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
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
            TotalAmount={TotalAmount}
            AdvanceAmount={AdvanceAmount}
            RemainingAmount={RemainingAmount}
            ACtype={ACtype}
            Sleepertype={Sleepertype}
          />
        ) : (
          <BookingForm
            firstStepProp={handleFirstStep}
            onBookingIdUpdate={handlePropsUpdate}
            vehicleNumber={vehicleNumber}
            fromDate={fromDate as Date}
            toDate={toDate as Date}
            TotalAmount={TotalAmount}
          />
        )}
        {lastStepCompleted ? <Approval bookingid={bookingId} /> : null}
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
          <img src={footerImage} alt="footer-image" className="img1" />
          <img src={footerImage} alt="footer-image" className="img2" />
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
