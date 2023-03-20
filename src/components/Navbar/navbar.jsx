import React, { useState } from 'react';
import './navbar.scss'

export default function Navbar({showNav, setShowNav}) {

  return (
    <>
    {showNav && <div className="navbar">
        <button className="button-navbar" onClick={() => setShowNav(false)}>X</button>       
        <button className="button-navbar">Boards</button>
        <button className="button-navbar">Calendar</button>
    </div>
    }
    </>
  )
}