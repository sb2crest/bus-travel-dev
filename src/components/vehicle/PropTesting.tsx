import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

interface LocationState {
  images?: string[];
}

interface PropTestingProps {}

const PropTesting: React.FC<PropTestingProps> = () => {
  const location = useLocation<LocationState>();
  const initialImages = location.state?.images || [];
  const [images, setImages] = useState(initialImages);

  const handleImageClick = (index: number) => {
    // Swap the clicked image with the parent image (index 0)
    const newImages = [...images];
    [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
    setImages(newImages);
  };

  return (
    <div>
      <h2>PropTesting</h2>
      {/* Display the parent image */}
      {images.length > 0 && (
        <img
          key={0}
          src={images[0]}
          alt={`Image 0`}
          width={700}
          height={350}
          onClick={() => handleImageClick(0)}
          style={{ cursor: 'pointer' }}
        />
      )}

      {/* Check if images is defined before mapping for child images */}
      {images.slice(1).map((image, index) => (
        <img
          key={index + 1}
          src={image}
          alt={`Image ${index + 1}`}
          width={150}
          height={100}
          onClick={() => handleImageClick(index + 1)}
          style={{ cursor: 'pointer' }}
        />
      ))}

      {/* Display a message if no images are available */}
      {images.length === 0 && <p>No images available.</p>}
    </div>
  );
};

export default PropTesting;
