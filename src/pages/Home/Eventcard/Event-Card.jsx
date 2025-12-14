import "./Event-Card.css";
import React, { useState, useEffect } from "react";
import goblen from '../../../assets/goblen5.jpg'
import { Link } from "react-router-dom";


function EventCard({ eventData }) { 
          
     const image = eventData?.image || goblen;

    return (

        <Link to={`/Calendar/${eventData.id}`} className = "EventCard">
                <img className="cardImage" src={image}></img>
                
                <div className = "cardOverlay">
                    <h2 className="cardTitle">{eventData.title}</h2>
                </div>

        </Link>

    );


}

export default EventCard