import React, { useState, useEffect } from "react";
import LoadingModal from "./Modals/LoadingModal";
import { useParams } from "react-router-dom";
import { db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid


const ExistingPage = () => {

    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({
      productID: "",
      productName: "",
      productPrice: "",
      productLink: "",
    });

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { headerName: "Title", field: "title"},
    { headerName: "Tags", field: "tags"},
    { headerName: "Variant", field: "variants"},
    { headerName: "Image", field: "image"},
    { headerName: "Go To", field: "url" }
  ]);

  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

    const [productNameValid, setProductNameValid] = useState(true);

    const { uniqueid } = useParams();

  
    useEffect(() => {
      setLoading(true)
      getUserData(uniqueid)
      setLoading(false)
    }, [uniqueid])

    const getUserData = async (uniqueid) => {
        console.log("getUserData")
        console.log("uniqueid", uniqueid)
        try {
            const docRef = doc(db, "product_jsons", uniqueid);
            const docSnapshot = await getDoc(docRef);
        
            if (docSnapshot.exists) {
              // setData(docSnapshot.data().products);
              setRowData(docSnapshot.data().products.map(product => (
                {title: product.title, tags: product.tags, variants: product.variants.price, image: product.image_links, url: product.url}
              )));
              console.log("Document data:", docSnapshot.data());
                
            } else {
              console.log("No such document!");
              return null;
            }
          } catch (error) {
            console.error("Error getting document:", error);
            return null;
          }

    }

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
          <h2>Tracked Products</h2>
          <div
            className="ag-theme-quartz" // applying the grid theme
            style={{ height: 500 }} // the grid will fill the size of the parent container
          >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
          </div>
        </div>
      </div>
    )}
  </div>)
  };

  export default ExistingPage;