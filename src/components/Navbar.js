// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <h2>Welcome to the Dashboard</h2>
      <div className="user-info">
        <span>Username</span>
        <img src="https://via.placeholder.com/30" alt="user" />
      </div>
    </div>
  );
}

export default Navbar;
