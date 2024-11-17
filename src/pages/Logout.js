import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doSignOut } from '../auth';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Log out the user and redirect to the login page
    const handleLogout = async () => {
      await doSignOut();
      navigate('/login');
    };

    handleLogout();
  }, [navigate]);

  return <h1>Logging out...</h1>; // Display a message while logging out
}

export default Logout;
