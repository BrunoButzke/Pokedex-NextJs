"use client"

import { useRef, useEffect, useState } from 'react';

const items = ["", "Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10"];

const IndexPage = (items) => {
  const [currentIndex, setCurrentIndex] = useState(1); 
  const containerRef = useRef(null);
  const itemHeight = 40; // Altura estimada do item em pixels

  useEffect(() => {

  }, [currentIndex, itemHeight]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 1 : prevIndex + 1)); 
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 1 ? items.length - 1 : prevIndex - 1)); 
  };

  const renderItems = () => {
    return items.slice(currentIndex - 1, currentIndex + 2).map((item, index) => {
      let sizeClass = "text-sm";
      if (index === 1) {
        sizeClass = "text-lg";
      } else {
        sizeClass = "text-xs";
      }
      return (
        <div key={index + currentIndex - 1} id={`item-${index + currentIndex - 1}`} className={`my-4 ${sizeClass}`}>
          {item}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div ref={containerRef} className="h-120">
        <div className="flex flex-col justify-center items-center">
          {renderItems()}
        </div>
      </div>
      <div className="flex mt-4">
        <button className="btn btn-secondary mr-4" onClick={handlePrevious}>
          Anterior
        </button>
        <button className="btn" onClick={handleNext}>
          Próximo
        </button>
      </div>
    </div>
  );
};

export default IndexPage;
