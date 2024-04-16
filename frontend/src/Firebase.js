import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const API_KEY = process.env.REACT_APP_API_KEY;
const APP_ID = process.env.REACT_APP_APP_ID

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "compare-cart.firebaseapp.com",
    databaseURL: "https://compare-cart-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "compare-cart",
    storageBucket: "compare-cart.appspot.com",
    messagingSenderId: "447151137533",
    appId: APP_ID
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);