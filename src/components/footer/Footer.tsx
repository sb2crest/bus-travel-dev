import React from "react";
import logo from "../../assets/images/Logo.png";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 550, behavior: "smooth" });
  };

  return (
    <div>
      <footer>
        {/* <img src={star1} alt="" className="star1" />
        <img src={star2} alt="" className="star2" /> */}
        <div className="footer_pic">
          <img src={logo} alt="" width={130} height={80} />
        </div>

        <div className="footer_content_width">
          <div className="footer_content">
            <p>
              Founded on a passion for travel, our team is dedicated to curating
              exceptional experiences. With years of expertise, we offer
              personalized journeys, secure bookings, and expert guidance.
            </p>
          </div>
        </div>
        <span className="footer_line">{/* <img src={line} alt="" /> */}</span>
        <div className="footer_container">
          <div className="footer_container__">
            <div className="footer_container_left">
              <div className="footer_container_left_corporates">
                <span>
                  <i
                    className="fa-solid fa-location-dot fa-lg"
                    style={{ color: "#0f7bab" }}
                  ></i>
                </span>
                <span>Corporates Office</span>
                <p>
                  <a href="https://maps.app.goo.gl/QUzokAf5EQ1aUYip8" target="_blank">
                    ⇢ #584 (Seabed2crest Pvt Ltd) near Suryodaya School,
                    Hesaraghatta hobli, Rajanukunte, Yelahanka Taluk Bangalore
                    North, Karnataka - 560064
                  </a>
                </p>
              </div>
              <div className="footer_container_left_email">
                <span>
                  {" "}
                  <i
                    className="fa-solid fa-envelope fa-lg"
                    style={{ color: "#0f7bab" }}
                  ></i>
                </span>
                <span>Email</span>
                <p>
                  <a href="mailto: info@seabed2crest.com">
                    info@seabed2crest.com
                  </a>
                </p>
              </div>
              <div className="footer_container_left_number">
                <span>
                  <i
                    className="fa-solid fa-phone fa-lg"
                    style={{ color: "#0f7bab" }}
                  ></i>
                </span>
                <span>Phone Number</span>
                <p>
                  {" "}
                  <a href="tel:+91 7349368311">+91 7349368311</a>
                </p>
                <p>
                  {" "}
                  <a href="tel:+91 7979699428">+91 7979699428</a>
                </p>
              </div>
            </div>
            <div className="footer_container_right">
              <div className="footer_container_right_one">
                <div className="footer_container_right_one_services">
                  <p id="heading">Quick Links</p>
                  <Link to={"/"} onClick={scrollToTop}>
                    <p>Home</p>
                  </Link>
                  <Link to={"/aboutus"} onClick={scrollToTop}>
                    <p>About Us</p>
                  </Link>
                  <Link to={"/booking"} onClick={scrollToTop}>
                    <p>Booking</p>
                  </Link>
                  <Link to={"/bookinginfo"} onClick={scrollToTop}>
                    <p>Booking Info</p>
                  </Link>
                  <Link to={"/contactus"} onClick={scrollToTop}>
                    <p>Contact Us</p>
                  </Link>
                </div>
              </div>
              <div className="footer_container_right_technologies">
                <p id="heading">Keep in touch</p>
                <a href="https://www.facebook.com/profile.php?id=61553225352683">
                  <span>
                    <i
                      className="fa-brands fa-facebook fa-2xl"
                      style={{ color: "#0f7bab", marginRight: "1.7vw" }}
                    ></i>
                  </span>
                </a>
                <a href="https://www.instagram.com/nandu_bus/">
                  <span>
                    <i
                      className="fa-brands fa-instagram fa-2xl"
                      style={{ color: "#0f7bab", marginRight: "1.7vw" }}
                    ></i>
                  </span>
                </a>
                <a href="https://www.instagram.com/nandu_bus/">
                  <span>
                    <i
                      className="fa-brands fa-linkedin-in fa-2xl"
                      style={{ color: "#0f7bab", marginRight: "1.7vw" }}
                    ></i>
                  </span>
                </a>
                <a href="https://twitter.com/NanduBus">
                  <span>
                    <i
                      className="fa-brands fa-x-twitter fa-2xl"
                      style={{ color: "#0f7bab" }}
                    ></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
