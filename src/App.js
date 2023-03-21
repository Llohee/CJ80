import './App.scss';
import React from 'react'
import Appbar from './components/Appbar/Appbar';
import Boardbar from './components/Boardbar/Boardbar';
import Boardcontent from './components/Boardcontent/Boardcontent';
import Calendar from './components/Calendar/Calendar';

function App() {
  return (
    <div className="App">
      
        <Appbar />
        <Boardbar />
        <Boardcontent />
        <Calendar />
    </div>
  );
}

export default App;
