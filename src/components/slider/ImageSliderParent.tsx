import React from "react";
import ImageSlider from "./ImageSlider";
import image1 from "../../assets/images/img_1.jpg";
import image2 from "../../assets/images/img_2.jpg";
import image3 from "../../assets/images/img_3.jpg";
import image4 from "../../assets/images/img_4.jpg";
import image5 from "../../assets/images/img_5.jpeg";
import image6 from "../../assets/images/img_6.jpg";
import image7 from "../../assets/images/img_7.jpg";
import image8 from "../../assets/images/img_8.jpg";
import image9 from "../../assets/images/img_9.jpg";
import "./ImageSlider.scss";
import Flash from "react-reveal/Flash";
interface Slide {
  url: string;
  title: string;
}

const slides: Slide[] = [
  { url: image1, title: "Jog Falls" },
  { url: image2, title: "Mysore Palace" },
  { url: image3, title: "Dudhsagar" },
  { url: image4, title: "Murdeshwara" },
  { url: image5, title: "Varanasi" },
  { url: image6, title: "India Gate" },
  { url: image7, title: "Kanyakumari" },
  { url: image8, title: "Taj Mahal" },
  { url: image9, title: "Tirumala Tirupati" },
];
const ImageSliderParent: React.FC = () => {
  return (
    <div className="parent_container">
      <div className="parent_container_heading">
        <Flash>
          <h1>Top Destinations</h1>
        </Flash>
        <p>
          Embark on a journey through India's gems. Explore iconic landmarks,
          cultural richness, and breathtaking landscapes in our top
          destinations. Unforgettable adventures await!
        </p>
      </div>
      <div className="parent_container_Styles">
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default ImageSliderParent;
