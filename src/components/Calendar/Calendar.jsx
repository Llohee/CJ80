import './Calendar.scss'

import React from 'react'
import Appbar from '../Appbar/Appbar'
import Boardbar from '../Boardbar/Boardbar'
import Sidebar from '../Boardcontent/Sidebar/Sidebar'
const Calendar = () => {
  return (
    <div className="calendar">
      <Appbar />
      <Boardbar />
      <Sidebar />
    </div>
  )
}

export default Calendar