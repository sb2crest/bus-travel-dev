import React, { useState } from "react";
import './VehicleInfo.scss'
import {Link } from "react-router-dom";

interface Image {
  url: string;
}

interface VehicleInfoProps {
  images: Image[];
}

const VehicleInfo: React.FC<VehicleInfoProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<Image>(images[0]);

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
    <div className="vehicleInfo">
    <div className="vehicleInfo_banner">
            <h1>Vehicle Details</h1>
            <ul>
              <li>
                <Link to={"/#"}>Home</Link>
              </li>
              <li>&#10095;</li>
              <li>Vehicle Details</li>
            </ul>
          </div>
      <div className="vehicleInfo_container">
      
      <div className="image-gallery">
        <h1>Bus Details</h1>
        <div className="parent-image">
          <img
            src={selectedImage.url}
            alt="Selected"
            width={700}
            height={350}
          />
        </div>
        <div className="child-images">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`Image ${index + 1}`}
              onClick={() => handleImageClick(image)}
              width={150}
              height={100}
            />
          ))}
        </div>
      </div>
      <div className="bus_details">
        <h2>Vehicle Facility</h2>
        <div className="facility_icons">
          <div className="facility_icons_one">
            <p><i className="fa-solid fa-tv fa-lg" style={{color: "#0f7bab"}}></i>&nbsp;&nbsp;&nbsp;Television</p>
            <p> <i className="fa-solid fa-plug fa-lg" style={{color: "#0f7bab"}}></i>&nbsp;&nbsp;&nbsp;240V Socket </p>
            <p> <i className="fa-solid fa-bed fa-lg" style={{color: "#0f7bab"}}></i>&nbsp;&nbsp;&nbsp;Cushioned seats </p>
          </div>
          <div className="facility_icons_two">
            <p><i className="fa-solid fa-music fa-lg" style={{color: "#0f7bab"}}></i>&nbsp;&nbsp;&nbsp;Audio system</p>
            <p><i className="fa-solid fa-fan  fa-lg" style={{color: "#0f7bab"}}></i>&nbsp;&nbsp;&nbsp;AC</p>
            <p><i className="fa-solid fa-compact-disc  fa-lg" style={{color: "#0f7bab"}}></i>&nbsp;&nbsp;&nbsp;DVD player</p>
          </div>
        </div>
        <h2>Additional information</h2>

        <div className="additional_info">
        
        <div className="additional_info_one">
          <p>Seats :&nbsp;&nbsp;&nbsp;60</p>
          <p>Length :&nbsp;&nbsp;&nbsp;10.48 m</p>
          <p>Width :&nbsp;&nbsp;&nbsp;2.49 m</p>
          <p>Height :&nbsp;&nbsp;&nbsp;3.33 m</p>
        </div>
        <div className="additional_info_two">
        <p>Fuel Type :&nbsp;&nbsp;&nbsp;Diesel</p>
        <p>Tank Capacity :&nbsp;&nbsp;&nbsp;260L</p>
        <p>Transmission :&nbsp;&nbsp;&nbsp;Manual</p>
        <p>Year :&nbsp;&nbsp;&nbsp;2018</p>
        </div>
        
        </div>
        <Link to={"/login"}>
                    <button  className="button-53" onClick={scrollToTop}>Book Now</button>
                  </Link>
      </div>
      </div>
    </div>
     
    </>
  );
};

export default VehicleInfo;
