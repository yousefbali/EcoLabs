import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { AuthProvider } from './authContext'; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap App in AuthProvider */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);