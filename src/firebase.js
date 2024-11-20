// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { setPersistence, browserSessionPersistence } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDru-vJf7AuS7AFXOEMKcs8wlOMJ9E99Vk",
  authDomain: "ecolabs-cc5ad.firebaseapp.com",
  projectId: "ecolabs-cc5ad",
  storageBucket: "ecolabs-cc5ad.firebasestorage.app",
  messagingSenderId: "414636583518",
  appId: "1:414636583518:web:bfb169430595b8b43f22cf",
  measurementId: "G-CZXV5CBSRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

setPersistence(auth, browserSessionPersistence)
    .catch((error) => {
        console.error("Error setting persistence:", error);
    });

export {app, auth};