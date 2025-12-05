import { useState, useEffect } from "react";
import "./Calendar.css";

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Events from API, stored by date string
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [editingEventId, setEditingEventId] = useState(null);

  // Fetch events from API on mount or when month/year changes
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        const mapped = mapEventsByDate(data);
        setEvents(mapped);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };
    fetchEvents();
  }, [currentMonth, currentYear]);

  const mapEventsByDate = (apiEvents) => {
    const mapped = {};
    apiEvents.forEach((ev) => {
      const dayKey = ev.start.split("T")[0];
      if (!mapped[dayKey]) mapped[dayKey] = [];
      mapped[dayKey].push(ev);
    });
    return mapped;
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

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

  const dateKey = (day) =>
    `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

  const openEventForm = (day, event = null) => {
    if (!day) return;
    const key = dateKey(day);
    setSelectedDate(key);

    if (event) {
      setEventTitle(event.title);
      setEventDesc(event.summary || "");
      setEditingEventId(event.id);
    } else {
      setEventTitle("");
      setEventDesc("");
      setEditingEventId(null);
    }
  };

  const saveEvent = async () => {
    if (!eventTitle.trim()) return;

    if (editingEventId) {
      // Edit existing event (PUT)
      try {
        const res = await fetch(`/api/events/${editingEventId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: eventTitle,
            summary: eventDesc,
          }),
        });
        const updatedEvent = await res.json();

        setEvents((prev) => {
          const updated = { ...prev };
          updated[selectedDate] = updated[selectedDate].map((ev) =>
            ev.id === editingEventId ? updatedEvent : ev
          );
          return updated;
        });

        setSelectedDate(null);
        setEditingEventId(null);
      } catch (err) {
        console.error("Failed to update event", err);
      }
    } else {
      // Create new event (POST)
      const payload = {
        title: eventTitle,
        summary: eventDesc,
        start: selectedDate + "T00:00:00.000Z",
        end: selectedDate + "T23:59:59.000Z",
        host: "Calendar App",
        contact: "calendar@app.com",
        location: "",
      };

      try {
        const res = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const newEvent = await res.json();

        setEvents((prev) => ({
          ...prev,
          [selectedDate]: [...(prev[selectedDate] || []), newEvent],
        }));
        setSelectedDate(null);
      } catch (err) {
        console.error("Failed to save event", err);
      }
    }
  };

  const deleteEvent = async (date, id) => {
    try {
      await fetch(`/api/events/${id}`, { method: "DELETE" });
      setEvents((prev) => {
        const updated = { ...prev };
        updated[date] = updated[date].filter((ev) => ev.id !== id);
        if (updated[date].length === 0) delete updated[date];
        return updated;
      });
    } catch (err) {
      console.error("Failed to delete event", err);
    }
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    { month: "long" }
  );

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={goPrev}>&larr;</button>
        <h2>
          {monthName} {currentYear}
        </h2>
        <button onClick={goNext}>&rarr;</button>
      </div>

      <div className="calendar-weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

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
              {hasEvents && <div className="event-dot"></div>}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="event-model">
          <div className="event-box">
            <h3>
              {editingEventId ? "Edit Event" : "Add Event"} for {selectedDate}
            </h3>

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

            <button onClick={saveEvent}>
              {editingEventId ? "Update Event" : "Save Event"}
            </button>
            <button
              onClick={() => {
                setSelectedDate(null);
                setEditingEventId(null);
              }}
            >
              Cancel
            </button>

            {events[selectedDate] && (
              <div className="event-list">
                <h4>Existing Events:</h4>
                {events[selectedDate].map((ev) => (
                  <div
                    key={ev.id}
                    className="event-item"
                    onClick={() => openEventForm(new Date(ev.start).getDate(), ev)}
                    style={{ cursor: "pointer" }}
                  >
                    <strong>{ev.title}</strong>
                    <p>{ev.summary}</p>
                    <button
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent modal reopening
                        deleteEvent(selectedDate, ev.id);
                      }}
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
