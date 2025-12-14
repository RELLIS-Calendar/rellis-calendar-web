import React, { useState, useEffect } from "react";
import "./Eventgallery.css";
import EventCard from "../Eventcard/Event-Card";
import { events } from "../../../data/events";

  function Eventgallery({ searchText }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const res = await fetch("/api/events");

          if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
          }

          const data = await res.json();
          setEvents(data);
        } catch (err) {
          setError(err.message || "Failed to load events");
        } finally {
          setLoading(false);
        }
      };

      fetchEvents();
    }, []);
  
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
    if (loading) return <div className="event-gallery">Loading events...</div>;
    if (error) return <div className="event-gallery">Error: {error}</div>;

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
