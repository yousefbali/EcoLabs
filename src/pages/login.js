import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../auth';
import { useAuth } from '../authContext';
import './login.css';

const Login = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (error) {
                setErrorMessage('Failed to log in. Check your credentials.');
            } finally {
                setIsSigningIn(false);
            }
        }
    };

    // Redirect to the dashboard if the user is already logged in
    if (userLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h3>EcoLabs</h3>
                <form onSubmit={onSubmit}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {errorMessage && (
                        <span className="error-message">{errorMessage}</span>
                    )}

                    <button type="submit" disabled={isSigningIn}>
                        {isSigningIn ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <p>
                    Don't have an account? <Link to={'/register'}>Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
