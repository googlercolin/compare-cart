import React, { useState, useEffect } from "react";
import LoadingModal from "./Modals/LoadingModal";
import { useParams } from "react-router-dom";
import { db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";

const ExistingPage = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({
      productID: "",
      productName: "",
      productPrice: "",
      productLink: "",
    });
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
                setData(docSnapshot.data().littlewolf);
                console.log("Document data:", docSnapshot.data());
              return docSnapshot.data();
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

    console.log("data", data)
    data.map(product => (
      console.log("product", product)
    ))

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
          <div className="Table">
            <table border={1}>
              <tbody>
                <tr>
                  <th>Title</th>
                  <th>Tags</th>
                  <th>Variants</th>
                  <th>Image</th>
                  <th>Go To</th>
                </tr>
                {data.map(product => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.tags}</td>
                    <td>{product.variants.price}</td>
                    <td>{product.image_links}</td>
                    <td>{product.url}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )}
  </div>)
  };

  export default ExistingPage;