import React from 'react';
import CalendarHeader from './CalendarHeader';
import Day from './Day';
import './Month.scss'
export default function Month({ month }) {
  return (
    <div className="month-content">
        <CalendarHeader />
      <div className="month">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day day={day} key={idx} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
      </div>

    </div>
  );
}
