import "./Carousel.css";
import React, { useState, useEffect } from "react";
import { events } from "../../../data/events";
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

    
const Carousel = () => {
  const [slide, setSlide] = useState(0);
  const data = events.filter(events => events.featured); 

useEffect(() => {
        const interval = setInterval(() => { setSlide(prev =>
            prev === data.length -1 ? 0 : prev + 1 ); }, 5000);        //this is our slide interval variable, 1000 = 1sec
        
        return () => clearInterval(interval);}, [slide, data.length]);      
    

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <div className="carousel">

      <div className="arrow arrow-left" onClick={prevSlide}>
        <BsArrowLeftCircleFill className="arrow-icon" />
      </div>

      {data.map((item, idx) => (
      <Link to={'/Calendar'} className={slide === idx ? "cardOverlay" : "slide slide-hidden"} key={idx}>
        <h1 className ="title">{item.title}</h1>
        </Link>
      ))}

      {data.map((item, idx) => (
          <Link
              to="/Calendar"
              key={idx}
              className={slide === idx ? "slide" : "slide slide-hidden"}
          >
              <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="slide-image"
              />
          </Link>

        
      ))}

      <div className="arrow arrow-right" onClick={nextSlide}>
        <BsArrowRightCircleFill className="arrow-icon" />
      </div>

      <span className="indicators">
        {data.map((_, idx) => (
          <button
            key={idx}
            className={
              slide === idx ? "indicator" : "indicator indicator-inactive"
            }
            onClick={() => setSlide(idx)}
          ></button>
        ))}
      </span>
    </div>
  );
};

export default Carousel;