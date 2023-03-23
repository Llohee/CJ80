import React, { useContext, useEffect, useState } from 'react'
import Appbar from '../components/Appbar/Appbar'
import Boardbar from '../components/Boardbar/Boardbar'
import SidebarCalendar from './component/Sidebar'
import Sidebar from '../components/Boardcontent/Sidebar/Sidebar'
import { getMonth } from './ulti'
import GlobalContext from './context/GlobalContext'
import Month from './component/Month'
import CalendarHeader from './component/CalendarHeader'
import './Calendar.scss'


const Calendar = () => {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <Appbar />
      <Boardbar />
      <div className="calendar">
        <div className="col-sidebar">
          <div className="calendar-content">
          <Sidebar />
          <SidebarCalendar />
          {/* <CalendarHeader /> */}
          <Month month={currenMonth} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Calendar