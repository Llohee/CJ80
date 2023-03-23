import React, { useContext } from 'react';
import plusImg from '../assets/plus.svg';
import GlobalContext from '../context/GlobalContext';
import './CreateEventButton.scss'

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="button"
    >
      <img src={plusImg} alt="create_event" className="img" />
      <span className="create"> Create</span>
    </button>
  );
}
