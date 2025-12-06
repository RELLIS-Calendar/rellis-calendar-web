import "./Carousel.css";
import React, { useState, useEffect } from "react";
import { events } from "../../../data/events";
import goblen from '../../../assets/goblen5.jpg'
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";


    
  const Carousel = () => {
    const [events, setEvents] = useState([]);
    const [slide, setSlide] = useState(0);
    const [loading, setLoading] = useState(true);

     

    useEffect(() => {
      const loadEvents = async () => {
        try {
          const res = await fetch("/api/events"); 
          const data = await res.json();

          console.log("API events:", data);

          const featuredEvents = data.filter(e => e.featured);

          setEvents(featuredEvents);
          setLoading(false);
        } catch (err) {
          console.error("Failed to load events:", err);
          setLoading(false);
        }
      };

      loadEvents();
    }, []); 



useEffect(() => {
        const interval = setInterval(() => { setSlide(prev =>
            prev === events.length -1 ? 0 : prev + 1 ); }, 5000);        //this is our slide interval variable, 1000 = 1sec
        
        return () => clearInterval(interval);}, [slide, events.length]);      
    

  const nextSlide = () => {
    setSlide(slide === events.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? events.length - 1 : slide - 1);
  };

  if (loading) return <div className="carousel">Loading...</div>;
  if (events.length === 0) return <div className="carousel">No featured events</div>;

  

  return (
    <div className="carousel">

      <div className="arrow arrow-left" onClick={prevSlide}>
        <BsArrowLeftCircleFill className="arrow-icon" />
      </div>

      {events.map((item, idx) => (
      <Link to={`/Calendar/${item.id}`} key={`title-${idx}`} className={slide === idx ? "cardOverlay" : "slide slide-hidden"}>
        <h1 className ="title">{item.title}</h1>
        </Link>
      ))}

       {events.map((item, idx) => {
        const image = item?.image || goblen; 

        return (
          <Link
            to={`/Calendar/${item.id}`}             
            key={`img-${idx}`}
            className={slide === idx ? "slide" : "slide slide-hidden"}
          >
            <img
              src={image}
              alt={item.title}
              className="slide-image"
            />
          </Link>
        );
      })}

      <div className="arrow arrow-right" onClick={nextSlide}>
        <BsArrowRightCircleFill className="arrow-icon" />
      </div>

      <span className="indicators">
        {events.map((item, idx) => (
          <button
            key={`indicator-${item.id}`}
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