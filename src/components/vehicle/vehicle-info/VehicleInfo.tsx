import "./VehicleInfo.scss";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
interface LocationState {
  vehicleNumber: any;
  images?: string[];
}

const VehicleInfo: React.FC = () => {
  const location = useLocation<LocationState>();
  const initialImages = location.state?.images || [];
  const [selectedImage, setSelectedImage] = useState(initialImages);
  const [progressBar, setProgressBar] = useState(false);

  const handleImageClick = (index: number) => {
    const newImages = [...selectedImage];
    [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
    setSelectedImage(newImages);
  };

  const showProgressBar = () => {
    setProgressBar(true);
  }

  return (
    <>
      <div>
        {/* Vehicle Info */}
        <div className="vehicleInfo">
          <div className="vehicleInfo_banner">
            <h1>Vehicle Details</h1>
            <ul>
              <li>
                <Router>
                  <Link to={"/#"}>Home</Link>
                </Router>
              </li>
              <li>&#10095;</li>
              <li>Vehicle Details</li>
            </ul>
          </div>
          <div className="vehicleInfo_container">
            <div className="image-gallery">
              <h1>Bus Details</h1>
              <div className="parent-image">
                {selectedImage.length > 0 && (
                  <img
                    key={0}
                    src={selectedImage[0]}
                    alt={`Image 0`}
                    width={700}
                    height={350}
                    onClick={() => handleImageClick(0)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
              <div className="child-images">
                {selectedImage.slice(1).map((image, index) => (
                  <img
                    key={index + 1}
                    src={image}
                    alt={`Image ${index + 1}`}
                    width={150}
                    height={100}
                    onClick={() => handleImageClick(index + 1)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
                {selectedImage.length === 0 && <p>No images available.</p>}
              </div>
            </div>
            <div className="bus_details">
              <div className="inclusions">
                <p className="inclusion-01">Inclusions</p>
                <div className="operator-icon-and-text">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    style={{ color: "#0f7bab" }}
                  />
                  <p className="inclusion-02">Extra usage at Rs. 15/KM to be paid to the operator</p>
                </div>
              </div>
              <div className="exclusions">
                <p className="exclusion-01">Exclusions</p>
                <div className="exclusion-info">
                  <div className="rupee-icon-and-text">
                    <FontAwesomeIcon
                      icon={faIndianRupeeSign}
                      style={{ color: "#0f7bab" }}
                    />
                    <p>Interstate taxes are excluded</p>
                  </div>
                  <div className="icon-and-text">
                    <FontAwesomeIcon
                      icon={faIndianRupeeSign}
                      style={{ color: "#0f7bab" }}
                    />
                    <p>Toll charges are excluded in base fare</p>
                  </div>
                </div>
              </div>
              {/* <div className="driver-details">
              <h2 >Vehicle & Driver Details</h2>
              <p className="details">You will receive driver and vehicle details one day before your journey.</p>
            </div> */}
              <div className="amenities">
                <h3>Amenities</h3>
                <div className="facility_icons">
                  <div className="facility_icons_one">
                    <p>
                      <i
                        className="fa-solid fa-tv fa-lg"
                        style={{ color: "#0f7bab" }}
                      ></i>
                      &nbsp;&nbsp;&nbsp;Television
                    </p>
                    <p>
                      {" "}
                      <i
                        className="fa-solid fa-plug fa-lg"
                        style={{ color: "#0f7bab" }}
                      ></i>
                      &nbsp;&nbsp;&nbsp;240V Socket{" "}
                    </p>
                    <p>
                      {" "}
                      <i
                        className="fa-solid fa-bed fa-lg"
                        style={{ color: "#0f7bab" }}
                      ></i>
                      &nbsp;&nbsp;&nbsp;Cushioned seats{" "}
                    </p>
                  </div>
                  <div className="facility_icons_two">
                    <p>
                      <i
                        className="fa-solid fa-music fa-lg"
                        style={{ color: "#0f7bab" }}
                      ></i>
                      &nbsp;&nbsp;&nbsp;Audio system
                    </p>
                    <p>
                      <i
                        className="fa-solid fa-fan  fa-lg"
                        style={{ color: "#0f7bab" }}
                      ></i>
                      &nbsp;&nbsp;&nbsp;AC
                    </p>
                    <p>
                      <i
                        className="fa-solid fa-compact-disc  fa-lg"
                        style={{ color: "#0f7bab" }}
                      ></i>
                      &nbsp;&nbsp;&nbsp;DVD player
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <Link to='/progressbar'> Book Now</Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VehicleInfo;
