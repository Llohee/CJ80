import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import { IoChevronBackSharp } from 'react-icons/io5'
import { GrFormNext } from 'react-icons/gr'
import { getMonth } from '../../Calendar/ulti';
import './SmallCalendar.scss'

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(
    dayjs().month()
  );
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const {
    monthIndex,
    setSmallCalendarMonth,
    setDaySelected,
    daySelected,
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);



  
  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }



  function getDayClass(day) {
    const format = 'DD-MM-YY';
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return <div className="color-1"></div>;
    } else if (currDay === slcDay) {
      return 'bg-blue-100 rounded-full text-blue-600 font-bold';
    } else {
      return 'bg-blue-100 rounded-full text-green-600 font-bold';
    }
  }
  return (
    <div className="top">
      <header className="header">
        <p className="title-1">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
            'MMMM YYYY'
          )}
        </p>
        <div className="chevron">
          <button onClick={handlePrevMonth}>
            <span className="chevron-left">
              <IoChevronBackSharp
                color="black"
                size="18px"
              />
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="chevron-right">
              <GrFormNext
                color="black"
                size="23px"
              />
            </span>
          </button>
        </div>
      </header>
      <div className="rows">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text">
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={` ${getDayClass(day)}`}
              >
                <span className="day">{day.format('D')}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
