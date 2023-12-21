import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "./Contact.scss";
import Fade from "react-reveal/Fade";

const Contact = () => {
  const blueIconStyle = {
    color: "#0f7bab",
  };
  return (
    <div className="container mt-5">
      <h1>Contact Details</h1>
      <div className="row">
        <Fade top>
          <div className="col-md-4">
            <div className="card text-center border-secondary d-flex flex-column h-100 ">
              <div className="card-body  ">
                <i
                  className="fas fa-envelope fa-2xl"
                  style={{ ...blueIconStyle, marginTop: "1px" }}
                ></i>
                <h5 className="card-title mt-3">Email</h5>
                <a href="mailto: info@seabed2crest.com" className="card-text">
                  info@seabed2crest.com
                </a>
              </div>
            </div>
          </div>
        </Fade>
        <Fade top>
          <div className="col-md-4">
            <div className="card text-center border-secondary d-flex flex-column h-100">
              <div className="card-body">
                <i
                  className="fas fa-phone fa-2xl "
                  style={{ ...blueIconStyle, marginBottom: "1px" }}
                ></i>
                <h5 className="card-title mt-3">Phone</h5>
                <p className="card-text">
                  <a href="tel:+91 7349368311">+91 7349368311</a>
                </p>
                <p className="card-text">
                  <a href="tel:+91 7979699428">+91 7979699428</a>
                </p>
              </div>
            </div>
          </div>
        </Fade>
        <Fade top>
          <div className="col-md-4">
            <div className="card text-center border-secondary d-flex flex-column h-100">
              <div className="card-body">
                <i
                  className="fas fa-map-marker-alt fa-2xl "
                  style={{ ...blueIconStyle, marginBottom: "1px" }}
                ></i>
                <h5 className="card-title mt-3">Address</h5>
                <p>
                  <a href="https://maps.app.goo.gl/QUzokAf5EQ1aUYip8" target="_blank">
                    ⇢ #584 (Seabed2crest Pvt Ltd) near Suryodaya School,
                    Hesaraghatta hobli, Rajanukunte, Yelahanka Taluk Bangalore
                    North, Karnataka - 560064
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Contact;
