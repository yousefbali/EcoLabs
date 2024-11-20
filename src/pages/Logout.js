import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doSignOut } from '../auth'; // Ensure this function is correctly imported

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await doSignOut(); // Ensure this calls Firebase’s `signOut`
                navigate('/login');
            } catch (error) {
                console.error("Failed to log out:", error);
            }
        };

        handleLogout();
    }, [navigate]);

    return <h1>Logging out...</h1>; // Temporary loading message
}

export default Logout;
