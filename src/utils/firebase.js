// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0KrvOXd-JpZZVncRUE6l2xnKhBdbprf8",
  authDomain: "netflixli.firebaseapp.com",
  projectId: "netflixli",
  storageBucket: "netflixli.appspot.com",
  messagingSenderId: "132839711298",
  appId: "1:132839711298:web:47f83c2ca7b409318703db",
  measurementId: "G-E5PT65KS0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()