import React, { useState, useEffect } from "react";

import './App.css';
import classes from "./App.css";
// import LoadingModal from "./Modals/LoadingModal.js";
import LoadingModal from "./Modals/LoadingModal";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const db = getFirestore(app);

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState({
    productID: "",
    productName: "",
    productPrice: "",
    productLink: "",
  });
  const [productNameValid, setProductNameValid] = useState(true);

  useEffect(() => {
    setLoading(true)
    getUsers()
    setLoading(false)
  }, [])

  //updates the event title and startTime in event
  const inputHandler = (e) => {
    e.preventDefault();
    setProduct (prev=>{return {...prev, productLink: e.target.value}});
  }

  const getUsers = async () => {
    console.log("getUsers")
    console.log("API", API_KEY);
    console.log("APP", APP_ID);
    const usersCol = collection(db, 'product_jsons');
    const usersSnapshot = await getDocs(usersCol);
    const userList = usersSnapshot.docs.map(doc => doc.id);
    setUsers(userList);
    return userList;
  }

  // test
  const handler = () => {
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
    setProductNameValid(false);
    setTimeout(() => {
      setProductNameValid(true);
    }, 3000);
  }

  return (
    <div className="App">
      {/* <LoadingModal isLoading = { loading }/> */}
      {loading ? (
        <LoadingModal isLoading = { loading }/>
        // <div>Loading...</div>
      ) : (
        <div>
          <h4 className="title">Product Link:</h4>
          <input
            value={product.productLink}
            name="productLink"
            placeholder="Enter link to product" 
            onChange={inputHandler}
          />
          {!productNameValid && (
            <p className="invalidText">
              This is a required field.
            </p>
          )}
          <br></br>
          <button className="Button" onClick={handler}>Search / Click to reload</button>
          <br></br>
          <br></br>
          <h1>Users</h1>
          <div className="Table">
            <table border={1}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
              {users.map(user => (
                <tr key={user}>
                  <td>{user}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

    </div>
  );
}

export default App;
