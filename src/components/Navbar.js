import React from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  // Function to determine the page name based on the current path
  const getPageName = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/overview':
        return 'Overview';
      case '/reports':
        return 'Reports';
      case '/profile':
        return 'Profile';
      case '/logout':
        return 'Logout';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="navbar">
      <h2>Welcome to the {getPageName()}</h2>
      <div className="user-info">
        <span>Username</span>
        <img src="https://via.placeholder.com/30" alt="user" />
      </div>
    </div>
  );
}

export default Navbar;
