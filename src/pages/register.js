import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import { doCreateUserWithEmailAndPassword } from '../auth';
import './register.css';

const Register = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                navigate("/dashboard"); // Redirect after successful registration
            } catch (error) {
                setErrorMessage("Failed to register. Please try again.");
            } finally {
                setIsRegistering(false);
            }
        }
    };

    // Redirect to the dashboard if the user is already logged in
    if (userLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="register-container">
            <div className="register-form">
                <h3>Create a New Account</h3>
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
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isRegistering}
                        />
                    </div>

                    <div>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            autoComplete="off"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isRegistering}
                        />
                    </div>

                    {errorMessage && (
                        <span className="error-message">{errorMessage}</span>
                    )}

                    <button type="submit" disabled={isRegistering}>
                        {isRegistering ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Continue</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
