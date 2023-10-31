import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import "./Booking.scss";
import busImage_1 from "../../assets/images/busImage_1.jpg";
import busImage_2 from "../../assets/images/busImage_2.jpg";
import busImage_3 from "../../assets/images/busImage_3.jpg";
import arrow from "../../assets/images/arrow.png";
import arrow2 from "../../assets/images/arrow2.png";
import dataService from "../../services/data.service";
import ListVehicles from "../../types/list.type";
import Filter from './Filter/Filter';
import Fade from 'react-reveal/Fade';

const Booking: React.FC = () => {
  const [vehicles, setVehicles] = useState<ListVehicles[]>([]);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 550, behavior: "smooth" });
  };

  const listVehicles = () => {
    dataService.listVehicles().then((response) => {
      const vehicles:ListVehicles[] = response.data;
      setVehicles(vehicles);
      console.log("Fetched vehicles:", vehicles);
    }).catch((error) => {
      console.error("Error in fetching data:", error);
    })
  }

  useEffect(() => {
    listVehicles();
  }, []);

  return (
    <>
      <div className="booking">
        <div className="booking_container">
          <div className="booking_container_banner">
            <h1>Booking</h1>
            <h3>Book your next trip</h3>
            <ul>
              <li>
                <Link to={"/#"}>Home</Link>
              </li>
              <li>&#10095;</li>
              <li>Booking</li>
            </ul>
          </div>
          <div className="booking_container_busDetails">
          <Fade top>
            <h2>our buses</h2>
            <h1 className="header_content">Our Bus Collection</h1>
            <p className="content">
              Discover affordable and reliable bus travel services with
              comfortable amenities, expert drivers, and convenient booking
              options for a safe and enjoyable journey to your desired
              destinations.
            </p>
            </Fade>
            <Filter/>
            <div className="booking_container_busDetails_section">
              {vehicles.map((vehicle, index)=>(
          <div className="buses" key={index}>
         {/* Render vehicle details here */}
            <h2>{vehicle.vehicleNumber}</h2>
            <p>Seat Capacity: {vehicle.seatCapacity}</p>
            <p>AC: {vehicle.isVehicleAC ? "Yes" : "No"}</p>
            <p>Sleeper: {vehicle.isVehicleSleeper ? "Yes" : "No"}</p>
            {/* Render other vehicle details */}
            <Link to={"/vehicleinfo"}>
              <button className="button-53" onClick={scrollToTop}>
                View Details
              </button>
            </Link>
          </div>
        ))}
         <Fade left>
              <div className="buses">
                <div className="busOne_img">
                  <img
                    src={busImage_1}
                    alt=""
                  />
                </div>
                <div className="busOne_details">
                  <h2>Bus Name1</h2>
                  <p>
                    <i
                      className="fa-solid fa-user-group fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    60 Seat
                  </p>
                  <br />
                  <p>
                    <i
                      className="fa-solid fa-bed fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    2 driver staff
                  </p>
                  <br />
                  <p>
                    <i
                      className="fa-solid fa-gears fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    Manual
                  </p>
                  <br />
                  <p>
                    {" "}
                    <i
                      className="fa-solid fa-fan fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    Ac/Non Ac
                  </p>
                  <Link to={"/vehicleinfo"}>
                    <button className="button-53" onClick={scrollToTop}>View Details</button>
                  </Link>
                </div>
              </div>
              </Fade>
              <Fade bottom>
              <div className="buses">
                <div className="busTwo_img">
                  <img
                    src={busImage_2}
                    alt=""
                  />
                </div>
                <div className="busTwo_details">
                  <h2>Bus Name2</h2>
                  <p>
                    <i
                      className="fa-solid fa-user-group fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    60 Seat
                  </p>
                  <br />
                  <p>
                    <i
                      className="fa-solid fa-bed fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    2 driver staff
                  </p>
                  <br />
                  <p>
                    <i
                      className="fa-solid fa-gears fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    Manual
                  </p>
                  <br />
                  <p>
                    {" "}
                    <i
                      className="fa-solid fa-fan fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    Ac/Non Ac
                  </p>
                  <Link to={"/vehicleinfo"}>
                    <button className="button-53" onClick={scrollToTop}>View Details</button>
                  </Link>
                </div>
              </div>
              </Fade>
              <Fade right>
              <div className="buses">
                <div className="busThree_img">
                  <img
                    src={busImage_3}
                    alt=""
                  />
                </div>
                <div className="busThree_details">
                  <h2>Bus Name3</h2>
                  <p>
                    <i
                      className="fa-solid fa-user-group fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    60 Seat
                  </p>
                  <br />
                  <p>
                    <i
                      className="fa-solid fa-bed fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    2 driver staff
                  </p>
                  <br />
                  <p>
                    <i
                      className="fa-solid fa-gears fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    Manual
                  </p>
                  <br />
                  <p>
                    {" "}
                    <i
                      className="fa-solid fa-fan fa-lg"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    Ac/Non Ac
                  </p>
                  <Link to={"/vehicleinfo"}>
                    <button className="button-53" onClick={scrollToTop}>View Details</button>
                  </Link>
                </div>
              </div>
              </Fade>
            </div>
          </div>
        </div>
        <div className="howitworks">
        <Fade top>
          <div className="howitworks_header">
            <h2>How It Works</h2>
            <h1>3 Steps To Booking a Bus On NandhuBus</h1>
          </div>
          </Fade>
          <div className="howitworks_cards">
            <img
              className="img1"
              src={arrow}
              width={70}
              alt=""
            />
            {/* <img
              className="img3"
              src={arrow}
              width={70}
              alt=""
            /> */}
            <img
              className="img2"
              src={arrow2}
              width={60}
              alt=""
            />
        <Fade left>
            <div className="howitworks_cards_one">
              <i
                className="fa-solid fa-bus fa-2xl"
                style={{ color: "#0f7bab" }}
              ></i>
              <h3>Select Your Bus</h3>
              <p>
                Choose from a range of available buses, considering factors like
                destination, departure time, and seating preferences.
              </p>
            </div>
          </Fade>
        <Fade top>
            <div className="howitworks_cards_two">
              <i
                className="fa-solid fa-file fa-2xl"
                style={{ color: "#0f7bab" }}
              ></i>
              <h3>Booking & Confirm</h3>
              <p>
                {" "}
                Enter your trip details, personal information, and review
                booking before confirming your reservation.
              </p>
            </div>
          </Fade>
            {/* <div className="howitworks_cards_three">
              <i
                className="fa-solid fa-money-check-dollar fa-2xl"
                style={{ color: "#0f7bab" }}
              ></i>
              <h3>Booking Payment</h3>
              <p>
                {" "}
                Complete the payment process securely, ensuring your seat is
                reserved for the upcoming journey.
              </p>
            </div> */}
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
}

export default Booking;
