import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import HomePage from "./Homepage";
import ExistingPage from "./ExistingPage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const App = () => {
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
