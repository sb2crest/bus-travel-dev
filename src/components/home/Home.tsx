import React from 'react'
import styled from "styled-components";
import img1 from '../../assets/images/aboutus_image.jpg'
import img2 from '../../assets/images/aboutus_image2.jpg'
import './Home.scss'
import ImageSlidderParent from '../../components/slidder/ImageSlidderParent';
import { Link } from "react-router-dom";
import Video from "../../assets/images/final.mp4";
import schooltrip from "../../assets/images/schooltrip.jpg";
import wedding from "../../assets/images/wedding.jpg";
import trips from "../../assets/images/trips.jpg";
import privatetrip from "../../assets/images/privatetrip.jpg";
import sportsevent from "../../assets/images/sportsevent.jpg";

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
const Home: React.FC  = () => {
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'auto', 
        });
      };
  return (
    <><div className="video-container">
    <video autoPlay loop muted>
      <source src={Video} type="video/mp4"/>
    </video>
  </div>
  <div className="card_banner">
              <div className="card_banner_content">
                  <div className="card_banner_content_one">
                      <Icon className="fa-solid fa-code-compare fa-2xl"></Icon>
                      <h3>Free cancellation</h3>
                      <p>Stay flexible on your trip.</p>
                  </div>
                  <div className="card_banner_content_two">
                      <Icon className="fa-solid fa-award fa-2xl"></Icon>
                      <h3>1000+ experiences</h3>
                      <p>Make memories around the world.</p>
                  </div>
                  <div className="card_banner_content_three">
                      <Icon className="fa-regular fa-calendar fa-2xl"></Icon>
                      <h3>Reserve now, pay later</h3>
                      <p>Book your spot.</p>
                  </div>
                  <div className="card_banner_content_four">
                      <Icon className="fa-solid fa-star fa-2xl"></Icon>
                      <h3>Trusted reviews</h3>
                      <p>0 stars reviews</p>
                  </div>
              </div>
          </div><div className="our_services">
              <div className="our_services_heading">
                  <h4>Our Services</h4>
                  <h1>
                      We Provide <span className="underline">Best Services</span> For
                      You
                  </h1>
                  <p>
                      Explore our wide range of travel services designed to make your
                      journey unforgettable. From hassle-free bookings to expert-guided
                      tours, we offer it all.
                  </p>
              </div>
              <div className="our_services_cards">
                  <div className="our_services_cards_container">
                      <div className="our_services_cards_container_one">
                          <div className="card_elements">
                              <Icon
                                  className="fa-solid fa-regular fa-shield fa-2xl"
                                  style={{ color: "#0f7bab" }}
                              ></Icon>
                              <h3>Safety Guarantee</h3>
                              <p>
                                  Your safety is our top priority. We implement rigorous
                                  safety measures and protocols to ensure a secure and
                                  worry-free travel experience for all our valued customers.
                                  Travel with peace of mind, knowing that your well-being is
                                  our commitment.
                              </p>
                          </div>
                          <div className="card_elements">
                              <Icon
                                  className="fa-solid fa-clock fa-regular fa-2xl"
                                  style={{ color: "#0f7bab" }}
                              ></Icon>
                              <h3>Schedule On Time</h3>
                              <p>
                                  We pride ourselves on punctuality. Our commitment to keeping
                                  schedules on time ensures that you'll have a reliable and
                                  efficient travel experience every step of the way. Your time
                                  is valuable, and we respect it.
                              </p>
                          </div>
                      </div>
                      <div className="our_services_cards_container_two">
                          <div className="card_elements">
                              <Icon
                                  className="fa-solid fa-tag fa-2xl"
                                  style={{ color: "#0f7bab" }}
                              ></Icon>
                              <h3>Affordable Prices</h3>
                              <p>
                                  Enjoy quality travel experiences at budget-friendly prices.
                                  We strive to offer competitive and affordable rates, making
                                  your dream vacation accessible without compromising on
                                  quality. Your adventure awaits without breaking the bank.
                              </p>
                          </div>
                          <div className="card_elements">
                              <Icon
                                  className="fa-solid fa-mobile-screen-button fa-2xl"
                                  style={{ color: "#0f7bab" }}
                              ></Icon>
                              <h3>Online Booking</h3>
                              <p>
                                  Streamline your travel planning with our convenient online
                                  booking platform. Accessible from anywhere, it simplifies
                                  the reservation process, putting your travel arrangements at
                                  your fingertips. Book with ease and confidence.
                              </p>
                          </div>
                      </div>
                      <div className="our_services_cards_container_three">
                          <div className="card_elements">
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
                          <div className="card_elements">
                              <Icon
                                  className="fa-solid fa-headset fa-2xl"
                                  style={{ color: "#0f7bab" }}
                              ></Icon>
                              <h3>24/7 Support</h3>
                              <p>
                                  We provide round-the-clock support to address your travel
                                  needs at any time. Our 24/7 customer service ensures that
                                  assistance is just a call or message away, guaranteeing
                                  peace of mind during your travels.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div><div className="aboutUs">
              <div className="aboutUs_container">
                  <div className="aboutUs_container_content">
                      <h4>About Us</h4>
                      <h1>
                          Unveiling Our Journey:
                      </h1>
                      <p>
                          Founded on a passion for travel, our team is dedicated to
                          curating exceptional experiences. With years of expertise, we
                          offer personalized journeys, secure bookings, and expert
                          guidance. Explore with confidence, knowing you're in the hands
                          of passionate travelers
                      </p>
                      <div className="key_points">
                          <div className="key_points_one">
                              <p><i className="fa-solid fa-check fa-sm" style={{ color: "#0f7bab" }}></i>&nbsp;&nbsp;Passionate about travel</p>
                              <p><i className="fa-solid fa-check fa-sm" style={{ color: "#0f7bab" }}></i>&nbsp;&nbsp;Years of expertise</p>
                              <p><i className="fa-solid fa-check fa-sm" style={{ color: "#0f7bab" }}></i>&nbsp;&nbsp;Personalized journeys</p>
                              <p><i className="fa-solid fa-check fa-sm" style={{ color: "#0f7bab" }}></i>&nbsp;&nbsp;Secure bookings</p>
                          </div>
                          <div className="key_points_two">
                              <p><i className="fa-solid fa-check fa-sm" style={{ color: "#0f7bab" }}></i>&nbsp;&nbsp;Expert guidance</p>
                              <p><i className="fa-solid fa-check fa-sm" style={{ color: "#0f7bab" }}></i>&nbsp;&nbsp;Confidence in your travels</p>
                              <p><i className="fa-solid fa-check fa-sm" style={{ color: "#0f7bab" }}></i>&nbsp;&nbsp;Team of passionate travelers</p>
                              <p><i className="fa-solid fa-check fa-sm" style={{ color: "#0f7bab" }}></i>&nbsp;&nbsp;Unforgettable experiences</p>
                          </div>


                      </div>
                      <Link to={"/aboutus"} onClick={scrollToTop}> <button className="button-71" role="button">Know more</button></Link>
                  </div>
                  <div className="aboutUs_container_image">
                      <img id="img1" src={img1} alt="" width={500} />
                      <img id="img2" src={img2} alt="" width={42} />
                  </div>
              </div>
          </div>
          <div className="lastcontainer">
          <div className="aboutus_container_services">
          <div className="aboutus_container_services_section">
            <div className="aboutus_container_services_section_images">
              <h1>Our Services</h1>
              <div className="aboutus_container_services_section_images_one">
                <div className="services_img">
                  <img
                    src={schooltrip}
                    alt=""
                  />
                  <h3>School & College Trips</h3>
                </div>
                <div className="services_img">
                  <img
                    src={wedding}
                    alt=""
                  />
                  <h3>Weddings</h3>
                </div>
                <div className="services_img">
                  <img src={trips} alt="" />
                  <h3>Corporate Trips</h3>
                </div>
                <div className="services_img">
                  <img
                    src={privatetrip}
                    alt=""
                  />
                  <h3>Private Trips</h3>
                </div>
                
                <div className="services_img">
                  <img
                    src={sportsevent}
                    alt=""
                  />
                  <h3>Sports Events</h3>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <ImageSlidderParent/>  
          </div>
          
         
          </>

    )
}

export default Home