import React from 'react';
import CreateEventButton from './CreateEventButton';
import SmallCalendar from './SmallCalendar';
import Labels from './Labels';
import './Sidebar.scss'

export default function SidebarCalendar() {
  return (
    <div className="sidebar">
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </div>
  );
}
