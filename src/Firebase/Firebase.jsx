//NOT SHARE COMMIT
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEEbvI092J0eeK5QliEQ4wj319uwyWZ9Y",
  authDomain: "gaments.firebaseapp.com",
  projectId: "gaments",
  storageBucket: "gaments.firebasestorage.app",
  messagingSenderId: "310481325392",
  appId: "1:310481325392:web:269c87343b8a16f88ef055"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service 
 export const auth = getAuth(app);