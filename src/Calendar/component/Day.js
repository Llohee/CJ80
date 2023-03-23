import dayjs from 'dayjs';
import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import './Day.scss'


export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY')
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';
  }
  return (
    <div className="container-day">
      <header className="header">
        {rowIdx === 0 && (
          <p className="text-1">
            {day.format('ddd').toUpperCase()}
          </p>
        )}
        <p
          className={` ${getCurrentDayClass()}`}
        >
          {day.format('DD')}
        </p>
      </header>
      <div
        className="footer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div 
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className="days-row"
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
