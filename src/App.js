import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Overview from './pages/Overview';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Login from './pages/login';
import Register from './pages/register';
import { useAuth } from './authContext';
import './App.css';

// PrivateRoute component to protect routes
function PrivateRoute({ children }) {
  const { userLoggedIn } = useAuth();
  return userLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  const { userLoggedIn } = useAuth();

  return (
    <Router>
      <div className="app">
        {/* Render Navbar and Sidebar only if the user is logged in */}
        {userLoggedIn && (
          <>
            <Navbar />
            <Sidebar />
          </>
        )}
        
        <div className="content">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={userLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />} />
            <Route path="/register" element={userLoggedIn ? <Navigate to="/dashboard" replace /> : <Register />} />

            {/* Private Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/overview" element={<PrivateRoute><Overview /></PrivateRoute>} />
            <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />

            {/* Redirect all other routes to login or dashboard based on login status */}
            <Route path="*" element={userLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
