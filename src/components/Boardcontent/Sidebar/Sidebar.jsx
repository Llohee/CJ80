import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.scss'

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar-bar">
      <CDBSidebar className="cd-sidebar">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        </CDBSidebarHeader>
        <CDBSidebarFooter className="cdsidebar-footer">
          <div className="sidebar-title"> Workspace </div>
          <div className="board-calender">
            <button type="button" value='Boards' onClick={() => {
              navigate('/home/boards');
            }} > Board</button>
            <button type="button" value='Calendar' onClick={() => {
              navigate('/home/calendar');
            }} >Calendar</button>
          </div>
          <div className="sidebar-title"> Your tables </div>
          <div className="board-calender-tables">
          
            <button type="button" value='Boards' onClick={() => {
              navigate('');
            }} >    <div className="theme"></div> Nguyen Giang</button>
          </div>
        </CDBSidebarFooter>

      </CDBSidebar>
    </div>
  );
};

export default Sidebar;