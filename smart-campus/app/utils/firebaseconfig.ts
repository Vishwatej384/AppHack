// Import the functions you need from the SDKs you need
//import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM34BVSI17BZyiwCJ9hoigE1aooiYJDgw",
  authDomain: "campusconnect-fa385.firebaseapp.com",
  projectId: "campusconnect-fa385",
  storageBucket: "campusconnect-fa385.firebasestorage.app",
  messagingSenderId: "37384374487",
  appId: "1:37384374487:web:034fb74e8d4b22f90b4892",
  measurementId: "G-GH263XDWHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);