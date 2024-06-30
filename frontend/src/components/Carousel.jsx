import React, { useState, useEffect } from 'react';

const images = [
  "https://res.cloudinary.com/dyylkrsak/image/upload/v1719768824/Online_E_Learning_Platforms_7d5b4f77c8_dexpyd.webp",
  "https://res.cloudinary.com/dyylkrsak/image/upload/v1719768830/How_to_Build_a_Website_Like_Udemy_or_Coursera_a_Complete_Guide-1700x880.png_ijb02o.webp",
  "https://res.cloudinary.com/dyylkrsak/image/upload/v1719768836/How-to-Build-an-Elearning-Website-like-Udemy-and-Coursera_mhtvu2.jpg",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return; // Skip interval if no images

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]); // Only update on image changes

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full mx-auto">
      <div className="relative h-96 overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-96 object-cover transition-transform duration-700 ${
              index === currentIndex ? 'transform translate-x-0' : 'transform translate-x-full'
            }`}
          />
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg focus:outline-none"
        onClick={handlePrev}
        aria-label="Previous Slide" 
      >
        Prev
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg focus:outline-none"
        onClick={handleNext}
        aria-label="Next Slide" 
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
