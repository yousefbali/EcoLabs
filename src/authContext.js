import React, { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; 

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Auth state changed. User:", user); // Log auth state change
            if (user) {
                console.log("User is logged in:", user);
                setCurrentUser(user);
                setUserLoggedIn(true);
            } else {
                console.log("No user logged in");
                setCurrentUser(null);
                setUserLoggedIn(false);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userLoggedIn,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
