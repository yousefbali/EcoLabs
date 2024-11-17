import { auth } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';

// Function to create a new user with email and password
export const doCreateUserWithEmailAndPassword = (email, password) => 
  createUserWithEmailAndPassword(auth, email, password);

// Function to sign in a user with email and password
export const doSignInWithEmailAndPassword = (email, password) => 
  signInWithEmailAndPassword(auth, email, password);

// Function to sign out a user
export const doSignOut = () => signOut(auth);

// Export `onAuthStateChanged` directly for use in context
export { onAuthStateChanged };
