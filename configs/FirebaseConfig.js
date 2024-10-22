// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "short-video-generator-c88f1.firebaseapp.com",
  projectId: "short-video-generator-c88f1",
  storageBucket: "short-video-generator-c88f1.appspot.com",
  messagingSenderId: "196055773129",
  appId: "1:196055773129:web:c1458e72807633d5950218",
  measurementId: "G-SX7FH5HMKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)