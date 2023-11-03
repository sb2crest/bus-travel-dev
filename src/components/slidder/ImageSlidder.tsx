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

function Arrow(props: { className: any; style: any; onClick: any; }) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    />
  );
}

const ImageSlidder: React.FC<ImageSlidderProps> = ({ slides }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <Arrow className={undefined} style={undefined} onClick={undefined} />,
    prevArrow: <Arrow className={undefined} style={undefined} onClick={undefined} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="slider_container">
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="slider_container_index">
          <div className="slider_container_index_images">
            <img src={slide.url} alt="" width={250} height={150}/>
            <h4>{slide.title}</h4>
          </div>
        </div>
      ))}
    </Slider>
  </div>
  
  );
};

export default ImageSlidder;
