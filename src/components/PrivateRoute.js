// PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../authContext';

function PrivateRoute({ children }) {
    const { userLoggedIn } = useAuth();
    const location = useLocation();

    return userLoggedIn ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
