import React, { useEffect, useRef } from 'react';
import './Sidebar.css';

function Sidebar() {
  // Create refs for each button
  const dashboardRef = useRef(null);
  const overviewRef = useRef(null);
  const reportsRef = useRef(null);
  const profileRef = useRef(null);
  const logoutRef = useRef(null);

  useEffect(() => {
    // Define individual click handlers to navigate to different URLs
    const handleDashboardClick = () => (window.location.href = '/dashboard');
    const handleOverviewClick = () => (window.location.href = '/overview');
    const handleReportsClick = () => (window.location.href = '/reports');
    const handleProfileClick = () => (window.location.href = '/profile');
    const handleLogoutClick = () => (window.location.href = '/logout');

    // Add event listeners
    dashboardRef.current?.addEventListener('click', handleDashboardClick);
    overviewRef.current?.addEventListener('click', handleOverviewClick);
    reportsRef.current?.addEventListener('click', handleReportsClick);
    profileRef.current?.addEventListener('click', handleProfileClick);
    logoutRef.current?.addEventListener('click', handleLogoutClick);

    // Cleanup event listeners
    return () => {
      dashboardRef.current?.removeEventListener('click', handleDashboardClick);
      overviewRef.current?.removeEventListener('click', handleOverviewClick);
      reportsRef.current?.removeEventListener('click', handleReportsClick);
      profileRef.current?.removeEventListener('click', handleProfileClick);
      logoutRef.current?.removeEventListener('click', handleLogoutClick);
    };
  }, []);

  return (
    <div className="sidebar">
      <h2>
        <button ref={dashboardRef} id="DButton">Dashboard</button>
      </h2>
      <ul>
        <li><button ref={overviewRef} id="OButton">Overview</button></li>
        <li><button ref={reportsRef} id="RButton">Reports</button></li>
        <li><button ref={profileRef} id="PButton">Profile</button></li>
        <li><button ref={logoutRef} id="LButton">Logout</button></li>
      </ul>
    </div>
  );
}

export default Sidebar;
