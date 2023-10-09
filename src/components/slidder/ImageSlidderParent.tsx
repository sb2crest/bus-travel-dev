import React from "react";
import ImageSlider from "./ImageSlidder";
import image1 from '../../assets/images/img_1.jpg';
import image2 from '../../assets/images/img_2.jpg';
import image3 from '../../assets/images/img_3.jpg';
import image4 from '../../assets/images/img_4.jpg';
import image5 from '../../assets/images/img_5.jpg';
import image6 from '../../assets/images/img_6.jpg';
import image7 from '../../assets/images/img_7.jpg';
import "./ImageSlider.scss"
interface Slide {
  url: string;
  title: string;
}

const slides: Slide[] = [
  { url: image1, title: 'beach' },
  { url: image2, title: 'boat' },
  { url: image3, title: 'forest' },
  { url: image4, title: 'city' },
  { url: image5, title: 'italy' },
  { url: image6, title: 'france' },
  { url: image7, title: 'london' },
];
const ImageSliderParent: React.FC = () => {
  return (
    <div className="parent_container">
      <h1>Top Destinations</h1>
      <div className="parent_container_Styles">
        <ImageSlider slides={slides}  />
      </div>
    </div>
  );
};

export default ImageSliderParent; 
