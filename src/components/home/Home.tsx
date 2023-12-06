import React from "react";
import styled from "styled-components";
import img1 from "../../assets/images/aboutus_image.jpg";
import img2 from "../../assets/images/aboutus_image2.jpg";
import "./Home.scss";
import { Link } from "react-router-dom";
import Video from "../../assets/images/final.mp4";
import schooltrip from "../../assets/images/schooltrip.jpg";
import wedding from "../../assets/images/wedding.jpg";
import trips from "../../assets/images/trips.jpg";
import privatetrip from "../../assets/images/privatetrip.jpg";
import sportsevent from "../../assets/images/sportsevent.jpg";
import Cards from "../cards/Cards";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import ImageSliderParent from "../slider/ImageSliderParent";

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
export const scrollToTop = () => {
  const windowHeight = window.innerHeight;
  const scrollToPercentage = 50; 

  window.scrollTo({
    top: (windowHeight * scrollToPercentage) / 100,
    behavior: "smooth",
  });
};
const Home: React.FC = () => {
  return (
    <>
      <div className="video-container">
        <video autoPlay loop muted aria-label="video" playsInline>
          <source src={Video} type="video/mp4" />
        </video>
      </div>

      <Slide left>
        <div className="card_banner" data-testid="card-banner">
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
              <h3>Reserve now</h3>
              <p>Book your Bus.</p>
            </div>
            <div className="card_banner_content_four">
              <Icon className="fa-solid fa-star fa-2xl"></Icon>
              <h3>Trusted reviews</h3>
              <p>0 stars reviews</p>
            </div>
          </div>
        </div>
      </Slide>
      <div className="our_services">
        <div className="our_services_heading">
          <Fade bottom>
            <h1>
              We Provide <span className="underline">Best Services</span> For
              You
            </h1>
            <p>
              Explore our wide range of travel services designed to make your
              journey unforgettable. From hassle-free bookings to expert-guided
              tours, we offer it all.
            </p>
          </Fade>
        </div>
        <Cards />
      </div>
      <div className="aboutUs">
        <div className="aboutUs_container">
          <Slide left>
            <div className="aboutUs_container_content">
              <h4>About Us</h4>
              <h1>Unveiling Our Journey:</h1>
              <p>
                Founded on a passion for travel, our team is dedicated to
                curating exceptional experiences. With years of expertise, we
                offer personalized journeys, secure bookings, and expert
                guidance. Explore with confidence, knowing you're in the hands
                of passionate travelers
              </p>
              <div className="key_points">
                <div className="key_points_one">
                  <p>
                    <i
                      className="fa-solid fa-check fa-sm"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    &nbsp;&nbsp;Passionate about travel
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-check fa-sm"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    &nbsp;&nbsp;Years of expertise
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-check fa-sm"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    &nbsp;&nbsp;Personalized journeys
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-check fa-sm"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    &nbsp;&nbsp;Secure bookings
                  </p>
                </div>
                <div className="key_points_two">
                  <p>
                    <i
                      className="fa-solid fa-check fa-sm"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    &nbsp;&nbsp;Expert guidance
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-check fa-sm"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    &nbsp;&nbsp;Confidence in your travels
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-check fa-sm"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    &nbsp;&nbsp;Team of passionate travelers
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-check fa-sm"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    &nbsp;&nbsp;Unforgettable experiences
                  </p>
                </div>
              </div>
                {" "}
                <div className="btn-container">
              <Link to={"/aboutus"} onClick={scrollToTop}>
                  <button className="Knowmore">
                    <span className="text">Know more</span>
                    <div className="icon_container">
                      <div className="icon icon--left">
                        <svg>
                          <use href="#arrow-right"></use>
                        </svg>
                      </div>
                      <div className="icon icon--right">
                        <svg>
                          <use href="#arrow-right"></use>
                        </svg>
                      </div>
                    </div>
                  </button>
              </Link>

                </div>
                <svg style={{ display: "none" }}>
                  <symbol id="arrow-right" viewBox="0 0 20 10">
                    <path d="M14.84 0l-1.08 1.06 3.3 3.2H0v1.49h17.05l-3.3 3.2L14.84 10 20 5l-5.16-5z"></path>
                  </symbol>
                </svg>
            </div>
          </Slide>
          <Slide right>
            <div className="aboutUs_container_image">
              <img id="img1" src={img1} alt="" width={500} />
              <img id="img2" src={img2} alt="" width={42} />
            </div>
          </Slide>
        </div>
      </div>
      <div className="lastcontainer">
        <div className="aboutus_container_services">
          <div className="aboutus_container_services_section">
            <div className="aboutus_container_services_section_images">
              <Fade bottom>
                <div className="aboutus_container_services_section_images_heading">
                  <h1>Our Services</h1>
                  <p>
                    Facilitating memorable School & College Trips, elegant
                    Weddings, efficient Corporate Trips, exclusive Private
                    Trips, and hassle-free travel to Sports Events. Book with us
                    for unparalleled service and comfort.
                  </p>
                </div>
              </Fade>
              <div className="aboutus_container_services_section_images_one">
                <div className="services_img">
                  <img src={schooltrip} alt="" />
                  <h3>School & College Trips</h3>
                </div>
                <div className="services_img">
                  <img src={wedding} alt="" />
                  <h3>Weddings</h3>
                </div>
                <div className="services_img">
                  <img src={trips} alt="" />
                  <h3>Corporate Trips</h3>
                </div>
                <div className="services_img">
                  <img src={privatetrip} alt="" />
                  <h3>Private Trips</h3>
                </div>
                <div className="services_img">
                  <img src={sportsevent} alt="" />
                  <h3>Sports Events</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ImageSliderParent />
      </div>
    </>
  );
};

export default Home;
