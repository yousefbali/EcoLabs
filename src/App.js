import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/Dashboard';
import Overview from './pages/Overview';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import { useAuth } from './authContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
    const { userLoggedIn, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <div className="app">
                {userLoggedIn && <Navbar />}

                <div className="main-container">
                    {userLoggedIn && <Sidebar />}
                    
                    <div className="content">
                        <Routes>
                            <Route path="/login" element={userLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />} />
                            <Route path="/register" element={userLoggedIn ? <Navigate to="/dashboard" replace /> : <Register />} />
                            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                            <Route path="/overview" element={<PrivateRoute><Overview /></PrivateRoute>} />
                            <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
                            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                            <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
                            <Route path="*" element={<Navigate to="/login" replace />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
