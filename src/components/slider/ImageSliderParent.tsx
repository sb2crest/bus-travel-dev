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
  content: string;
}

const slides: Slide[] = [
  {
    url: image1,
    title: "Jog Falls",
    content:
      "Jog Falls, Karnataka, India. Second-highest waterfall. Sharavathi River, 829 feet drop. Natural marvel, captivating cascades, a paradise for nature enthusiasts.",
  },
  {
    url: image2,
    title: "Mysore Palace",
    content:
      "Mysore Palace, Karnataka, India. Built 1912, Indo-Saracenic style. Opulent interiors, Durbar Hall grandeur. Dasara festival lights highlight cultural heritage.",
  },
  {
    url: image3,
    title: "Dudhsagar",
    content:
      "Dudhsagar Falls, Goa, India. Four-tiered beauty in Bhagwan Mahavir Wildlife Sanctuary. 'Sea of Milk' cascade. Accessible by trek or train. Breathtaking nature.",
  },
  {
    url: image4,
    title: "Murdeshwara",
    content:
      "Murdeshwara, Karnataka, India. Famous for Lord Shiva statue, beach, and temple. Spiritual significance, stunning coastal views. Tourist and pilgrimage attraction.",
  },
  {
    url: image5,
    title: "Varanasi",
    content:
      "Varanasi, Uttar Pradesh, India. Ancient spiritual city on Ganges banks. Ghats, Kashi Vishwanath Temple, rich culture, sacred rituals, pilgrimage allure.",
  },
  {
    url: image6,
    title: "India Gate",
    content:
      "India Gate, New Delhi, India. Iconic war memorial, Amar Jawan Jyoti flame. Commemorates soldiers, symbolizes sacrifice. Popular landmark, patriotic attraction.",
  },
  {
    url: image7,
    title: "Kanyakumari",
    content:
      "Kanyakumari, Tamil Nadu, India. Southernmost tip. Confluence of three oceans. Vivekananda Rock, Thiruvalluvar Statue. Spiritual, scenic, cultural significance. Popular tourist destination.",
  },
  {
    url: image8,
    title: "Taj Mahal",
    content:
      "Taj Mahal, Agra, India. Built by Shah Jahan for his wife. Iconic marble mausoleum, UNESCO site, symbol of eternal love.",
  },
  {
    url: image9,
    title: "Tirumala Tirupati",
    content:
      "Tirumala Tirupati, Andhra Pradesh, India. Sacred hill town. Sri Venkateswara Temple, world's richest. Pilgrimage destination, religious significance, vibrant culture.",
  },
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
