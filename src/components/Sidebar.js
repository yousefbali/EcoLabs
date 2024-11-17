// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>Overview</li>
        <li>Reports</li>
        <li>Settings</li>
        <li>Profile</li>
        <li>Logout</li>
      </ul>
    </div>
  );
}

export default Sidebar;
