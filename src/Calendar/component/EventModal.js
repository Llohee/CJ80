import React, { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import { AiOutlineCloseCircle, AiOutlineClockCircle } from 'react-icons/ai'
import { HiMenuAlt4, HiOutlineMenuAlt3 } from 'react-icons/hi'
import { BsBookmarks } from 'react-icons/bs'
import {MdDeleteOutline} from 'react-icons/md'
import './EventModal.scss'
const labelsClasses = [
  'indigo',
  'gray',
  'green',
  'blue',
  'red',
  'purple',
];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ''
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ''
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: 'update', payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: 'push', payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  return (
    <div className="event">
      <form className="form">
        <header className="header">
          <span className="span">
            <HiMenuAlt4
              size="25px"
              color="rgba(156,163,175)"
            />
          </span>
          <div className="select">
            {selectedEvent && (
              <button
                onClick={() => {
                  dispatchCalEvent({
                    type: 'delete',
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="delete-1"
              >
                <MdDeleteOutline 
                size="25px"
                color="rgba(156,163,175)"
                />
              </button>
            )}
            <button onClick={() => setShowEventModal(false)} >
              <span className="close">
                <AiOutlineCloseCircle
                  size="25px"
                  color="rgba(156,163,175)"
                />
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="title-1">
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="border"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="time-title">
              <span className="schedule">
                <AiOutlineClockCircle
                  size="25px"
                  color="rgba(156,163,175)"
                />
              </span>
              <p>{daySelected.format("dddd, MMMM DD")}</p>
            </div>
            <div className="time-title">
              <span className="schedule">
                <HiOutlineMenuAlt3
                  size="25px"
                  color="rgba(156,163,175)"
                />
              </span>
              <input
                type="text"
                name="description"
                placeholder="Add a description"
                value={description}
                required
                className="border-2"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="time-title">
              <span className="schedule">
                <BsBookmarks
                  size="25px"
                  color="rgba(156,163,175)"
                />
              </span>
              <div className="label">
                {labelsClasses.map((lblClass, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedLabel(lblClass)}
                    className={`${lblClass}`}
                  >
                    {selectedLabel === lblClass && (
                      <span className="label-1">
                        check
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <button
            type="submit"
            onClick={handleSubmit}
            className="button"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
