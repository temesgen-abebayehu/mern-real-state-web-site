// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-state-f2968.firebaseapp.com",
  projectId: "mern-real-state-f2968",
  storageBucket: "mern-real-state-f2968.appspot.com",
  messagingSenderId: "670430875196",
  appId: "1:670430875196:web:28f8fe63c5dfd3352dbd39"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);