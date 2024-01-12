import React, { useEffect, useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import "./Booking.scss";
import dataService from "../../services/data.service";
import ListVehicles from "../../types/list.type";
import Fade from "react-reveal/Fade";
import Filter from "./Filter/Filter";
import divimg from "../../assets/images/divimage.svg";
import { styled } from "@mui/system";
import bus from "../../assets/images/busImage_1.jpg";
import {
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  StepIconProps,
} from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import { DirectionsBus, Note, AttachMoney, Map } from "@mui/icons-material";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
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
  width: 50,
  height: 50,
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
    1: <DirectionsBus />,
    2: <Note />,
    3: <AttachMoney />,
    4: <Map />,
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
  "Step 1: Select Your Bus",
  "Step 2: Booking Details",
  "Step 3: Booking Payment",
  "Step 4: Start Your Roadtrip",
];

const Booking: React.FC = () => {
  const [vehicles, setVehicles] = useState<ListVehicles[]>([]);

  const scrollToTop = () => {
    window.scrollTo({ top: 550, behavior: "smooth" });
  };

  // const listVehicles = () => {
  //   dataService
  //     .listVehicles()
  //     .then((response) => {
  //       const vehicles: ListVehicles[] = response.data;
  //       setVehicles(vehicles);
  //       // vehicles.forEach((vehicle, index) => {
  //       //   const vehicleNumber = vehicle.vehicleNumber;
  //       //   console.log(`Vehicle ${index + 1} - Vehicle Number: ${vehicleNumber}`);
  //       // });
  //       console.log("Fetched vehicles:", vehicles);
  //     })
  //     .catch((error) => {
  //       console.error("Error in fetching data:", error);
  //     });
  // };
  // useEffect(() => {
  //   listVehicles();
  // }, []);

  useEffect(() => {
    const listVehicles = async () => {
      try {
        const response = await dataService.listVehicles();
        const fetchedVehicles: ListVehicles[] = response.data;
        setVehicles(fetchedVehicles);
        console.log("Fetched vehicles:", fetchedVehicles);
      } catch (error) {
        console.error("Error in fetching data:", error);
      }
    };
    if (vehicles.length === 0) {
      listVehicles();
    }
  }, [vehicles]);

  return (
    <>
      <div className="booking">
        <div className="booking_container">
          <div className="booking_container_banner">
            <h1>Booking</h1>
            <h3>Book your next trip</h3>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>&#10095;</li>
              <li>Booking</li>
            </ul>
          </div>
          <div className="booking_container_busDetails">
            <Fade top>
              <h3>our buses</h3>
              <h1 className="header_content">Our Bus Collection</h1>
              <p className="content">
                Discover affordable and reliable bus travel services with
                comfortable amenities, expert drivers, and convenient booking
                options for a safe and enjoyable journey to your desired
                destinations.
              </p>
            </Fade>
            <img src={divimg} alt="curvedimg" className="curvedimg" />
            <div className="curvedimgsection">
              <div data-testid="filter-component" className="filterAlign">
                <Filter setVehicles={setVehicles} />
              </div>
              <div className="booking_container_busDetails_section">
                {vehicles.map((vehicle, index) => (
                  <div className="buses" key={index}>
                    <img
                      src={bus}
                      alt={`Bus ${index}`}
                      className="busOne_img"
                    />
                    {/* Render vehicle details here */}
                    <div className="busOne_details">
                      <h2>
                        ({vehicle.vehicleAC} {vehicle.sleeper})
                      </h2>
                      <p>
                        <span className="material-symbols-outlined">
                          airline_seat_recline_extra
                        </span>
                        Seat Capacity: {vehicle.seatCapacity}
                      </p>
                      {/* Render other vehicle details */}
                      <Link
                        to={{
                          pathname: "/vehicleinfo",
                          state: { vehicleNumber: vehicle.vehicleNumber, images: [] },
                        }}
                      >
                        <button className="button-53" onClick={scrollToTop}>
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="howitworks">
          <Fade top>
            <div className="howitworks_header">
              <h2>How It Works</h2>
              <h1>4 Steps To Booking a Bus On NandhuBus</h1>
            </div>
          </Fade>
          <Stack sx={{ width: "100%" }} spacing={4}>
            <Stepper
              alternativeLabel
              activeStep={3}
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
          <div className="howitworks_cards">
            <Fade left>
              <div className="howitworks_cards_one">
                <i
                  className="fa-solid fa-bus fa-2xl"
                  style={{
                    color: "#0f7bab",
                  }}
                ></i>
                <h3>Select Your Bus</h3>
                <p>
                  Choose from a range of available buses, considering factors
                  like destination, departure time, and seating preferences.
                </p>
              </div>
            </Fade>
            <Fade top>
              <div className="howitworks_cards_two">
                <i
                  className="fa-solid fa-file fa-2xl"
                  style={{ color: "#0f7bab" }}
                ></i>
                <h3>Booking Details</h3>
                <p>
                  {" "}
                  Enter your trip details, personal information, and review
                  booking before confirming your reservation.
                </p>
              </div>
            </Fade>
            <Fade bottom>
              <div className="howitworks_cards_three">
                <i
                  className="fa-solid fa-money-check-dollar fa-2xl"
                  style={{ color: "#0f7bab" }}
                ></i>
                <h3>Booking Payment</h3>
                <p>
                  {" "}
                  Complete the payment process securely, ensuring your bus is
                  reserved for the upcoming journey.
                </p>
              </div>
            </Fade>
            <Fade right>
              <div className="howitworks_cards_four">
                <i
                  className="fa-solid fa-map-location-dot fa-2xl"
                  style={{ color: "#0f7bab" }}
                ></i>
                <h3>Start Your Roadtrip</h3>
                <p>
                  {" "}
                  Embark on your adventure, boarding the selected bus at the
                  designated departure point, ready for your road trip.
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
