import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {

  console.log("Rendering Sidebar");  // Debug log

  return (
    <div className="sidebar">
      
      <ul>
        <li>
          <NavLink to="/dashboard" activeClassName="active-link">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/overview" activeClassName="active-link">Overview</NavLink>
        </li>
        <li>
          <NavLink to="/reports" activeClassName="active-link">Reports</NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeClassName="active-link">Profile</NavLink>
        </li>
        
      </ul>
    </div>
  );
}

export default Sidebar;
