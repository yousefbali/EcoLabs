import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  console.log("Rendering Navbar");  // Debug log
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
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="navbar">
      <h2>{getPageName()}</h2>
      <div className="user-info">
        <span>EcoLabs</span>
        
      </div>

      {/* Navigation Links */}
      <nav className="navbar-links">
        
        <NavLink to="/logout" activeClassName="active-link">Logout</NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
