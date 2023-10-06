import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Slide {
  url: string;
  title: string;
}

interface ImageSlidderProps {
  slides: Slide[]; 
}

const ImageSlidder: React.FC<ImageSlidderProps> = ({ slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <Slider {...settings}>
        {slides.map((slide, index) => ( 
          <div key={index}>
            <img src={slide.url} alt={slide.title} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlidder;
