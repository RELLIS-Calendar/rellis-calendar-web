import { useState, useEffect } from 'react'
import './Calendar.css'

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Events stored by date string
  
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("calendarEvents");
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const monthName = new Date(currentYear, currentMonth).toLocaleString("default", {
    month: "long",
  });

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  // Build calendar array
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const goPrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  // Convert a day number into "YYYY-MM-DD"
  const dateKey = (day) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2,"0")}-${String(
      day
      ).padStart(2, "0")}`;
  };

  // Handle clicking on a day
  const openEventForm = (day) => {
    if (!day) return;
    setSelectedDate(dateKey(day));
    setEventTitle("");
    setEventDesc("");
  };

  // Save a new event
  const saveEvent = () => {
    if (!eventTitle.trim()) return;

    setEvents((prev) => ({
      ...prev,
      [selectedDate]: [
        ...(prev[selectedDate] || []),
        { title: eventTitle, description: eventDesc },
      ],
    }));

    setSelectedDate(null);
  };

  // Delete an event for the selected date
  const deleteEvent = (selectedDate, index) => {
    setEvents((prev) => {
      const updated = { ...prev };
      updated[selectedDate] = updated[selectedDate].filter((_, i) => i !== index);

      if (updated[selectedDate].length === 0) {
        delete updated[selectedDate];
      }

      // Save to localStorage
      localStorage.setItem("events", JSON.stringify(updated));

      return updated;
    });
  };

  return (
    <div className="calendar-container">
      
      {/* Header */}
      <div className="calendar-header">
        <button onClick={goPrev}>&larr;</button>
        <h2>{monthName} {currentYear}</h2>
        <button onClick={goNext}>&rarr;</button>
      </div>

      {/* Weekdays */}
      <div className="calendar-weekdays">
      <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div>
      <div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      {/* Days/Events*/}
      <div className="calendar-grid">
        {calendarDays.map((day, idx) => {
          const key = day ? dateKey(day) : null;
          const hasEvents = key && events[key] && events[key].length > 0;

          return (
            <div
              key={idx}
              className={`calendar-day ${isToday(day) ? "today" : ""}`}
              onClick={() => openEventForm(day)}
            >
              {day}
              {hasEvents && (
                <div className="event-dot"></div>
              )}
            </div>
          );  
        })}
      </div>

      {/* Event form model */}
      {selectedDate && (
        <div className="event-model">
          <div className="event-box">
            <h3>Add Event for {selectedDate}</h3>

            <input
              type="text"
              placeholder="Event title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />

            <textarea
              placeholder="Description (optional)"
              value={eventDesc}
              onChange={(e) => setEventDesc(e.target.value)}
            />

            <button onClick={saveEvent}>Save Event</button>
            <button onClick={() => setSelectedDate(null)}>Cancel</button>

            {/* Show existing events */}
            {events[selectedDate] && (
              <div className="event-list">
                <h4>Existing Events:</h4>
                {events[selectedDate].map((ev, i) => (
                  <div key={i} className="event-item">
                    <strong>{ev.title}</strong>
                    <p>{ev.description}</p>

                    <button
                      className="delete-button"
                      onClick={() => deleteEvent(selectedDate, i)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
