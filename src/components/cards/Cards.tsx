import React from "react";
import "./Cards.scss";
import styled from "styled-components";
import Slide from "react-reveal/Slide";

const Icon = styled.i`
  font-size: 2rem; /* Set the initial size of the icon */
  color: #0f7bab;
  cursor: pointer;

  &:hover {
    font-size: 2.5rem; /* Set the size you want on hover */
    color: #72716f;
    transition: all 0.3s;
  }
`;
const Cards = () => {
  return (
    <div className="ag-format-container">
      <Slide bottom>
      <div className="ag-courses_box">
        <div className="ag-courses_item">
          <a href="#" className="ag-courses-item_link">
            <div className="ag-courses-item_bg"></div>
            
            <div className="ag-courses-item_title">
              <Icon
                className="fa-solid fa-regular fa-shield fa-2xl"
                style={{ color: "#0f7bab" }}
              ></Icon>
              <h3>Safety Guarantee</h3>
              <p>
                Your safety is our top priority. We implement rigorous safety
                measures and protocols to ensure a secure and worry-free travel
                experience for all our valued customers. Travel with peace of
                mind, knowing that your well-being is our commitment.
              </p>
            </div>
          </a>
        </div>
        <div className="ag-courses_item">
          <a href="#" className="ag-courses-item_link">
            <div className="ag-courses-item_bg"></div>

            <div className="ag-courses-item_title">
              <Icon
                className="fa-solid fa-clock fa-regular fa-2xl"
                style={{ color: "#0f7bab" }}
              ></Icon>
              <h3>Schedule On Time</h3>
              <p>
                We pride ourselves on punctuality. Our commitment to keeping
                schedules on time ensures that you'll have a reliable and
                efficient travel experience every step of the way. Your time is
                valuable, and we respect it.
              </p>
            </div>
          </a>
        </div>
        <div className="ag-courses_item">
          <a href="#" className="ag-courses-item_link">
            <div className="ag-courses-item_bg"></div>

            <div className="ag-courses-item_title">
              {" "}
              <Icon
                className="fa-solid fa-tag fa-2xl"
                style={{ color: "#0f7bab" }}
              ></Icon>
              <h3>Affordable Prices</h3>
              <p>
                Enjoy quality travel experiences at budget-friendly prices. We
                strive to offer competitive and affordable rates, making your
                dream vacation accessible without compromising on quality. Your
                adventure awaits without breaking the bank.
              </p>
            </div>
          </a>
        </div>
        <div className="ag-courses_item">
          <a href="#" className="ag-courses-item_link">
            <div className="ag-courses-item_bg"></div>

            <div className="ag-courses-item_title">
              {" "}
              <Icon
                className="fa-solid fa-mobile-screen-button fa-2xl"
                style={{ color: "#0f7bab" }}
              ></Icon>
              <h3>Online Booking</h3>
              <p>
                Streamline your travel planning with our convenient online
                booking platform. Accessible from anywhere, it simplifies the
                reservation process, putting your travel arrangements at your
                fingertips. Book with ease and confidence.
              </p>
            </div>
          </a>
        </div>
        <div className="ag-courses_item">
          <a href="#" className="ag-courses-item_link">
            <div className="ag-courses-item_bg"></div>

            <div className="ag-courses-item_title">
              <Icon
                className="fa-solid fa-user-tie fa-2xl"
                style={{ color: "#0f7bab" }}
              ></Icon>
              <h3>Professional Staff</h3>
              <p>
                Our dedicated team of experienced professionals is here to
                assist you throughout your journey. From expert guides to
                attentive customer support, our staff ensures a seamless and
                memorable travel experience.
              </p>
            </div>
          </a>
        </div>
        <div className="ag-courses_item">
          <a href="#" className="ag-courses-item_link">
            <div className="ag-courses-item_bg"></div>
            <div className="ag-courses-item_title">
              {" "}
              <Icon
                className="fa-solid fa-headset fa-2xl"
                style={{ color: "#0f7bab" }}
              ></Icon>
              <h3>24/7 Support</h3>
              <p>
                We provide round-the-clock support to address your travel needs
                at any time. Our 24/7 customer service ensures that assistance
                is just a call or message away, guaranteeing peace of mind
                during your travels.
              </p>
            </div>
          </a>
        </div>
      </div>
      </Slide>
    </div>
  );
};

export default Cards;
