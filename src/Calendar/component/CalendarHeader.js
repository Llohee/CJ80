import dayjs from 'dayjs';
import React, { useContext, useEffect } from 'react';
import logo from '../assets/logo.png';
import GlobalContext from '../context/GlobalContext';
import { IoChevronBackSharp } from 'react-icons/io5'
import { GrFormNext } from 'react-icons/gr'
import './CalendarHeader.scss'

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  
  
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className="header-calendar">
      <img src={logo} alt="calendar" className="img-logo" />
      <h1 className="title">
        Calendar
      </h1>
      <button
        onClick={handleReset}
        className="today"
      >
        Today
      </button>
      <button onClick={handlePrevMonth} className="back-next">
        <span className="left-right">
          <IoChevronBackSharp
            color="black"
            size="20px"
          />
        </span>
      </button>
      <button onClick={handleNextMonth} className="back-next">
        <span className="left-right">
          <GrFormNext
            color="black"
            size="20px"
          />
        </span>
      </button>
      <h2 className="text">
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          'MMMM YYYY'
        )}
      </h2>
    </header>
  );
}
