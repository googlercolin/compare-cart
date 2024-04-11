import React, { useState, useEffect } from "react";
import LoadingModal from "./Modals/LoadingModal";
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
        <h1>Compare Cart</h1>
        <h5 className="newpage">Enter a product link to generate a page link for you</h5>
        <h4 className="title">Enter Product Link:</h4>
        <input
          value={product.productLink}
          name="productLink"
          placeholder="Enter link to product" 
          onChange={inputHandler}
        />
        <br></br>
        {!productNameValid && (
          <p className="invalidText">
            This is a required field.
          </p>
        )}
        <br></br>
        <button className="Button" onClick={handler}>Search / Click to reload</button>
        <br></br>
      </div>
    )}
  </div>)
  };

  export default HomePage;