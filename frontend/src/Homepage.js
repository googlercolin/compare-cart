import React, { useState, useEffect } from "react";
import LoadingModal from "./Modals/LoadingModal";
// import classes from "./App.css";
import { db, addProducts } from "./Firebase";
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
  const [uniqueLinkInvalid, setUniqueLinkInvalid] = useState(false);

  useEffect(() => {
    setLoading(true)
    setLoading(false)
  }, [])

  //updates the event title and startTime in event
  const inputHandler = (e) => {
    e.preventDefault();
    setProduct (prev=>{return {...prev, productLink: e.target.value}});
  }

  // add product to table
  const productHandler = async () => {
    // setProductNameValid(false);
    // setTimeout(() => {
    //   setProductNameValid(true);
    // }, 3000);
    // console.log("add product", product.productLink)
    setLoading(true)
    // console.log("Loading set")
    await addProducts({ urls: [product.productLink]}).then((res) => {
      // console.log("res", res.data.id)
      setLoading(false)
      window.location.href = window.location.href+res.data.id;
    })
  }

  const inputLink = (e) => {
    e.preventDefault();
    setUniqueLink (prev=>{return e.target.value});
  }

  const uniqueLinkHandler = async () => {
    // console.log("getLinks")
    const links_ref = collection(db,'unique_links');
    const querySnapshot = await getDocs(links_ref);
    querySnapshot.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      if (doc.id === uniqueLink) {
        // console.log("found")
        window.location.href = window.location.href+uniqueLink;
      }
    }); 
    // console.log("not found");
    setUniqueLinkInvalid(true);
  }

  const setHidden = (disableScroll) => {
    // console.log(document.body.style.overflow);
    if (disableScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };

  useEffect(() => {
    setHidden(loading);
  }, [loading]);

  // const testLoading = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }

  return (
    <div className="App">
      <LoadingModal isLoading = { loading }/>
      <div>
        <div className="App-header">
          <div className="header">
            <h1 className="webTitle">Compare Cart</h1>
            <p className="webSubtitle">Your Product Aggregator</p>
          </div>
        </div>
        <div className="App-body">
          <h4 className="title">Enter a product to track:</h4>
          <div className="inputSearch">
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
            <button className="Button" onClick={productHandler}>Track!</button>
          </div>
          <br></br>
          <h4 className="title">Resume tracking with your existing unique ID:</h4>
          <div className="inputSearch">
            <input
              value={product.uniqueLink}
              name="uniqueLink"
              placeholder=" Enter unique ID xx-xxx-xxx-xx" 
              onChange={inputLink}
            />
            <button className="Button" onClick={uniqueLinkHandler}>Go!</button>
          </div>
          {uniqueLinkInvalid && (
              <p className="invalidText">
                User not found.
              </p>
            )}
        </div>
      </div>
    </div>
  )
};

export default HomePage;