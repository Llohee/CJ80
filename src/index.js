import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Boardcontent from './components/Boardcontent/Boardcontent';
import Calendar from './components/Calendar/Calendar';
import { MainLayout } from './components/layout/main';
import LayoutAuth from './components/layout/auth';
import Cal from './components/layout/calendar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route>
        <Route path='/' element={<MainLayout />} >
          <Route path='home' element={<App />}>
            <Route path='boards' element={< Boardcontent />}></Route>
            {/* <Route path='calendar' element={<Calendar />}></Route> */}
          </Route>
          <Route path='home' element={<Calendar />}>
            {/* <Route path='boards' element={< Boardcontent />}></Route> */}
            <Route path='calendar' element={<Calendar />}></Route>
          </Route>
        </Route>
      </Route>
      <Route path='/auth' element={<LayoutAuth />}>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
