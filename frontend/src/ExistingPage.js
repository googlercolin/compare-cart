import React, { useState, useEffect } from "react";
import LoadingModal from "./Modals/LoadingModal";
import { useParams } from "react-router-dom";
import { db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";

const ExistingPage = ({ match }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({
      productID: "",
      productName: "",
      productPrice: "",
      productLink: "",
    });
    const [productNameValid, setProductNameValid] = useState(true);

    // const {
    //     params: { personId },
    //   } = match;

    console.log("match", match)
    const { uniqueid } = useParams();

    console.log('uniqueid11', uniqueid)
  
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
                setData(docSnapshot.data());
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
    return (<div className="App">
    {/* <LoadingModal isLoading = { loading }/> */}
    {loading ? (
      <LoadingModal isLoading = { loading }/>
      // <div>Loading...</div>
    ) : (
      <div>
        <h4 className="title">Product Link: {data.toString()}</h4>
      </div>
    )}

  </div>)
  };

  export default ExistingPage;