import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import HomePage from "./Homepage";
import ExistingPage from "./ExistingPage";
import classes from "./App.css";
// import LoadingModal from "./Modals/LoadingModal.js";
import LoadingModal from "./Modals/LoadingModal";
// Import the functions you need from the SDKs you need
import {db} from './Firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const App = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    getUsers()
  }, [])
  const getUsers = async () => {
    console.log("getUsers")
    const usersCol = collection(db, 'product_jsons');
    const usersSnapshot = await getDocs(usersCol);
    const userList = usersSnapshot.docs.map(doc => doc.id);
    setUsers(userList);
    return userList;
  }

  

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/:uniqueid" element={<ExistingPage />} />
      </Routes>
    </Router>
  );


}

export default App;
