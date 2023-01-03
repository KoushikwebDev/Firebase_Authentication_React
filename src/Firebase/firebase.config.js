// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0M4F9dMFXko9oxS9vYmMbV7SWRaDczLg",
  authDomain: "fir-demo-5d9df.firebaseapp.com",
  projectId: "fir-demo-5d9df",
  storageBucket: "fir-demo-5d9df.appspot.com",
  messagingSenderId: "976656644446",
  appId: "1:976656644446:web:f669ab2f274e979cb237cf",
  measurementId: "G-L8FEL1FTCB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const provider = new GoogleAuthProvider();

const provider2 = new FacebookAuthProvider();

export { app, auth, provider, provider2 };
