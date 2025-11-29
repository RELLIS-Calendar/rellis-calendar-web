import React, { useState } from "react";
import "./Eventgallery.css";
import EventCard from "../Eventcard/Event-Card";
import { events } from "../../../data/events";

function Eventgallery({ searchText }) {
  const normalized = searchText.toLowerCase().trim();

  //this is the searchbar functionalty
  
  let visibleEvents;

  if (normalized) {
    const exactMatch = events.find(
      (evt) => evt.title.toLowerCase() === normalized
    );

    if (exactMatch) {
      visibleEvents = [exactMatch];
    } else {
      visibleEvents = events.filter((evt) =>
        evt.title.toLowerCase().includes(normalized)
      );
    }
  } else {
    visibleEvents = events;
  }

  const galleryClass =
    visibleEvents.length === 1 ? "event-gallery single" : "event-gallery";

  //gallery body

  return (
    <div className={galleryClass}>
      {visibleEvents.map((evt) => (
        <EventCard key={evt.id} eventData={evt} />
      ))}
    </div>
  );
}

export default Eventgallery;
