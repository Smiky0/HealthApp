import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
// firebase config
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "healthcareapp-f88b9.firebaseapp.com",
    projectId: "healthcareapp-f88b9",
    storageBucket: "healthcareapp-f88b9.firebasestorage.app",
    messagingSenderId: "703526140983",
    appId: "1:703526140983:web:b7741b61b72ae7026dd3b2",
    measurementId: "G-0QG9R5FCYW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
