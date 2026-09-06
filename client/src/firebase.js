// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "aiwebsite-967e3.firebaseapp.com",
  projectId: "aiwebsite-967e3",
  storageBucket: "aiwebsite-967e3.firebasestorage.app",
  messagingSenderId: "585978338960",
  appId: "1:585978338960:web:bcbfdb42df10bba767c215"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}
