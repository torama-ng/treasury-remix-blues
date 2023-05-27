import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDiaYBKEsy90V0rw4BuC6UpcXqWj3YKBg0",
  authDomain: "torama-auth.firebaseapp.com",
  projectId: "torama-auth",
  storageBucket: "torama-auth.appspot.com",
  messagingSenderId: "1038623632136",
  appId: "1:1038623632136:web:5181fe9a5f6012fdbc5abd",
  measurementId: "G-QP936CZDW2",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);



const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);
  
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const signOutUser = async () => await signOut(auth);