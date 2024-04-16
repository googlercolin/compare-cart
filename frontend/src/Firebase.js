import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getFunctions, httpsCallable } from "firebase/functions";

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
  const functions = getFunctions(app);
  console.log("functions", functions);
  export const addProducts = httpsCallable(functions, "add_products_callable");
  export const deleteProduct = httpsCallable(functions, "delete_product_callable");
  // deleteProduct({product_id: "7597823819953", id: "be-full-service-business"}).then((result) => {
  //   console.log("result", result)
  // });
  // addProducts({urls: ['https://2degrees.sg/collections/all']}).then((result) => {
  //     console.log("result", result)
  //   });