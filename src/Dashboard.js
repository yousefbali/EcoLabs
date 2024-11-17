// src/Dashboard.js
import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Overview from './pages/Overview';
import Reports from './pages/Reports';
import './Dashboard.css';

function Dashboard() {
  const [activePage, setActivePage] = React.useState('Overview');

  const renderContent = () => {
    switch (activePage) {
      case 'Overview':
        return <Overview />;
      case 'Reports':
        return <Reports />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
