import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAvkY3IApDHOtVkqamZPk5iI6izZsE3h-U",
  authDomain: "fir-todoism.firebaseapp.com",
  projectId: "fir-todoism",
  storageBucket: "fir-todoism.appspot.com",
  messagingSenderId: "713091868523",
  appId: "1:713091868523:web:12d650f9b75f762beb0e2e",
  measurementId: "G-NQJC8BQLY3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
