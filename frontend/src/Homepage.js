import React, { useState, useEffect } from "react";
import LoadingModal from "./Modals/LoadingModal";
// import classes from "./App.css";
import { db } from "./Firebase";
import { collection, getDocs } from "firebase/firestore";

const HomePage = () => {

    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({
      productID: "",
      productName: "",
      productPrice: "",
      productLink: "",
    });
    const [productNameValid, setProductNameValid] = useState(true);
  
    const [uniqueLink, setUniqueLink] = useState("");

    useEffect(() => {
      setLoading(true)
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

    const inputLink = (e) => {
      e.preventDefault();
      setUniqueLink (prev=>{return e.target.value});
    }

    const uniqueLinkHandler = async () => {
      console.log("getLinks")
      const links_ref = collection(db,'unique_links');
      const querySnapshot = await getDocs(links_ref);
      querySnapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        if (doc.id === uniqueLink) {
          console.log("found")
          window.location.href = window.location.href+uniqueLink;
        }
      }); 
      console.log("not found");
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
          <h4 className="title">Existing users can enter their unique ID here:</h4>
          <input
            value={product.uniqueLink}
            name="uniqueLink"
            placeholder=" Enter link to product" 
            onChange={inputLink}
          />
          {!productNameValid && (
            <p className="invalidText">
              This is a required field.
            </p>
          )}
          <button className="Button" onClick={uniqueLinkHandler}>Go!</button>
        </div>
      </div>
    )}
  </div>)
  };

  export default HomePage;