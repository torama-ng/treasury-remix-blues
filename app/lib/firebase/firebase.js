// import Firebase from "firebase/app";
// import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
