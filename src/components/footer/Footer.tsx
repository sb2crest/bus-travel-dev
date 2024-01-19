import logo from "../../assets/images/Logo.png";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = (isHome = false, isBooking = false) => {
    let scrollToPercentage;
    if (isHome) {
      scrollToPercentage = 0;
    } else if (isBooking) {
      scrollToPercentage = 20;
    } else if (window.innerWidth >= 1200) {
      scrollToPercentage = 76;
    } else if (window.innerWidth >= 768) {
      scrollToPercentage = 68;
    } else {
      scrollToPercentage = 51;
    }
    const windowHeight = window.innerHeight;
    window.scrollTo({ top: (windowHeight * scrollToPercentage) / 100, behavior: "smooth" });
  };

  return (
    <div>
      <footer>
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
                  <a
                    href="https://maps.app.goo.gl/QUzokAf5EQ1aUYip8"
                    target="_blank"
                  >
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
                  <a href="tel:+91 7979699428">+91 7204641716</a>
                </p>
              </div>
            </div>
            <div className="footer_container_right">
              <div className="footer_container_right_one">
                <div className="footer_container_right_one_services">
                  <p id="heading">Quick Links</p>
                  <Link to={"/"} onClick={() => scrollToTop(true)}>
                    <p>Home</p>
                  </Link>
                  <Link
                    to={"/booking"}
                    onClick={() => scrollToTop(false, true)}
                  >
                    <p>Booking</p>
                  </Link>
                  <Link to={"/bookinginfo"} onClick={() => scrollToTop()}>
                    <p>Booking Info</p>
                  </Link>
                  <Link to={"/aboutus"} onClick={() => scrollToTop()}>
                    <p>About Us</p>
                  </Link>
                  <Link to={"/contactus"} onClick={() => scrollToTop()}>
                    <p>Contact Us</p>
                  </Link>
                </div>
              </div>
              <div className="footer_container_right_technologies">
                <p id="heading">Keep in touch</p>
                <a
                  href="https://www.facebook.com/profile.php?id=61553225352683"
                  target="_blank"
                >
                  <span>
                    <i
                      className="fa-brands fa-facebook fa-2xl"
                      style={{ color: "#0f7bab", marginRight: "1.7vw" }}
                    ></i>
                  </span>
                </a>
                <a href="https://www.instagram.com/nandu_bus/" target="_blank">
                  <span>
                    <i
                      className="fa-brands fa-instagram fa-2xl"
                      style={{ color: "#0f7bab", marginRight: "1.7vw" }}
                    ></i>
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/nandu-bus-2755622aa/"
                  target="_blank"
                >
                  <span>
                    <i
                      className="fa-brands fa-linkedin-in fa-2xl"
                      style={{ color: "#0f7bab", marginRight: "1.7vw" }}
                    ></i>
                  </span>
                </a>
                <a href="https://twitter.com/NanduBus" target="_blank">
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
        <div className="footer_tnc">
          <div className="footer_tnc_section">
            <div className="copyright">
              <p>© 2023 NanduBus All Rights Reserved.</p>
            </div>
            <div className="tnc">
              <Link to={"/termsConditions"} onClick={() => scrollToTop()}>
                <p>Terms and Conditions.</p>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
