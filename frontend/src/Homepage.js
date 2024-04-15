import React, { useState, useEffect } from "react";
import LoadingModal from "./Modals/LoadingModal";
// import classes from "./App.css";
import { collection, getDocs } from 'firebase/firestore';

const HomePage = () => {
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
    //   getUsers()
      setLoading(false)
    }, [])
  
    //updates the event title and startTime in event
    const inputHandler = (e) => {
      e.preventDefault();
      setProduct (prev=>{return {...prev, productLink: e.target.value}});
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
    return (<div className="App">
    {/* <LoadingModal isLoading = { loading }/> */}
    {loading ? (
      <LoadingModal isLoading = { loading }/>
      // <div>Loading...</div>
    ) : (
      <div>
        <div className="App-header">
          <div className="header">
            <h1 className="webTitle">Compare Cart</h1>
            <p className="webSubtitle">Your Product Aggregator</p>
          </div>
        </div>
        <div className="App-body">
          {/* <h5 className="newpage">Enter a product link to generate a page link for you</h5> */}
          <h4 className="title">Enter a product to track:</h4>
          <input
            value={product.productLink}
            name="productLink"
            placeholder=" Enter link to product" 
            onChange={inputHandler}
          />
          {!productNameValid && (
            <p className="invalidText">
              This is a required field.
            </p>
          )}
          <button className="Button" onClick={handler}>Track!</button>
          <br></br>
          <h4 className="title">Existing users can enter their link here:</h4>
          <input
            value={product.uniqueLink}
            name="uniqueLink"
            placeholder=" Enter link to product" 
            onChange={inputHandler}
          />
          {!productNameValid && (
            <p className="invalidText">
              This is a required field.
            </p>
          )}
          <button className="Button" onClick={handler}>Go!</button>
        </div>
      </div>
    )}
  </div>)
  };

  export default HomePage;