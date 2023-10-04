import React from "react";
import { Link } from "react-router-dom";
import "./AboutUs.scss";
import aboutUsImage from "../../assets/images/aboutusimg.jpg";
import schooltrip from "../../assets/images/schooltrip.jpg";
import wedding from "../../assets/images/wedding.jpg";
import trips from "../../assets/images/trips.jpg";
import privatetrip from "../../assets/images/privatetrip.jpg";
import sportsevent from "../../assets/images/sportsevent.jpg";
import whatsets from "../../assets/images/whatsets.jpeg";
import whatsets2 from "../../assets/images/whatsets2.jpeg";
const AboutUs = () => {
  return (
    <div className="aboutus">
      <div className="aboutus_container">
        <div className="aboutus_container_banner">
          <h1>About Us</h1>
          <h3>We help you find your dream vacation</h3>
          <ul>
            <li>
              <Link to={"/#"}>Home</Link>
            </li>
            <li>&#10095;</li>
            <li>About Us</li>
          </ul>
        </div>
        <div className="aboutus_container_intro">
          <div className="aboutus_container_intro_section">
            <div className="aboutus_container_intro_section_content">
              <h5>About Us</h5>
              <p>
                Welcome to our premier bus rental service! We offer a diverse
                fleet of top-quality buses for all your transportation needs.
                Whether it's a corporate event, school trip, wedding, or any
                special occasion, we provide safe, comfortable, and reliable
                transportation solutions.Explore our extensive range of buses,
                from luxurious coaches to compact shuttles. Our professional
                drivers and exceptional service ensure a seamless travel
                experience. Book your bus today for an unforgettable ride!
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
            </div>
            <div className="aboutus_container_intro_section_img">
              <img
                src={aboutUsImage}
                height={350}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="aboutus_container_values">
          <div className="aboutus_container_values_section">
            <div className="aboutus_container_values_section_mission">
              <h4>
                <b>Our Mission</b>
              </h4>
              <p>
                Our mission is to provide safe, reliable, and comfortable bus
                rental services that cater to the diverse needs of our
                customers. We aim to exceed expectations by delivering
                exceptional transportation solutions, backed by a commitment to
                punctuality, professionalism, and affordability.We aim to
                simplify the process of renting a bus, making group travel
                stress-free and enjoyable. Our focus on affordability and
                sustainability ensures that everyone can access our services,
                fostering strong connections among communities, businesses, and
                travelers.
              </p>
            </div>
            <div className="aboutus_container_values_section_vision">
              <h4>
                <b>Our Vision</b>
              </h4>
              <p>
                {" "}
                Our vision is to be the preferred choice for bus rentals,
                setting industry standards for excellence. We aspire to expand
                our fleet, reach new destinations, and continuously enhance our
                services. By fostering strong client relationships and embracing
                innovation, we strive to be a driving force in the
                transportation sector, connecting people and places seamlessly
                while promoting sustainability and convenience. With a
                commitment to environmental responsibility and convenience, we
                envision a future where travel is efficient, enjoyable, and
                accessible to all.
              </p>
            </div>
          </div>
        </div>
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
        <div className="aboutus_container_apart">
          <div className="aboutus_container_apart_section">
            <div className="aboutus_container_apart_section_left">
              <img id="img12" src={whatsets} alt="" />
              <img id="img13" src={whatsets2} alt="" />
            </div>
            <div className="aboutus_container_apart_section_right">
              <h2>What sets us apart</h2>
              <p>
                At <h4>Nandu Tours & Travels</h4> , our commitment to excellence goes
                beyond transportation. We take pride in offering a wide range of
                meticulously maintained vehicles, from luxurious coaches to
                versatile shuttles, ensuring there's a perfect option for every
                occasion. Our experienced drivers not only ensure a smooth
                journey but also provide expert guidance and local insights.
                <br />
                What truly distinguishes us is our unwavering dedication to
                safety, We embrace innovation and technology to make your
                booking experience seamless. and reliable arrivals our top
                priorities. We're not just a transportation provider, we're a
                team of passionate travelers, committed to delivering
                unforgettable experiences for our customers. Trust us to make
                your journey comfortable, memorable, and hassle-free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
