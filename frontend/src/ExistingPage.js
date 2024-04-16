import React, { useState, useEffect } from "react";
import LoadingModal from "./Modals/LoadingModal";
import { useParams } from "react-router-dom";
import { db } from "./Firebase";
import { collection, getDocs } from "firebase/firestore";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const ExistingPage = () => {
  let gridOptions = {
    domLayout: "autoHeight",
  };

  var saleFilterParams = {
    allowedCharPattern: "\\d\\-\\,\\$",
    numberParser: (text) => {
      return text == null
        ? null
        : parseFloat(text.replace(",", ".").replace("$", ""));
    },
    numberFormatter: (value) => {
      return value == null ? null : value.toString().replace(".", ",");
    },
  };

  // Column Definitions: Defines the columns to be displayed.
  const colDefs = [
    {
      headerName: "ID",
      field: "id",
      width: "67px",
      cellRenderer: (props) => {
        return (
          <div>
            <div>{props.value}</div>
            <button style={{ fontSize: 12 }}>X</button>
          </div>
        );
      },
    },
    { headerName: "Title", field: "title", filter: true, flex: 1 },
    {
      headerName: "Image",
      field: "image",
      autoHeight: true,
      cellRenderer: (props) => {
        return (
          <img
            src={props.value[0]}
            alt="product"
            style={{ width: "100px", margin: 5 }}
          />
        );
      },
    },
    { headerName: "Tags", field: "tags", filter: true },
    {
      headerName: "Variants",
      field: "variants",
      filter: true,
      autoHeight: true,
      cellRenderer: (props) => {
        return (
          <div>
            {props.value.map((variant, index) => (
              <div key={index}>
                <button
                  className="VariantButton"
                  onClick={() => selectVariant(index, props.rowIndex)}
                >
                  {variant.variant_title}: {variant.price}
                </button>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      headerName: "Price",
      field: "price",
      filter: "agNumberColumnFilter",
      // floatingFilter: true,
      filterParams: saleFilterParams,
      comparator: (valueA, valueB, nodeA, nodeB, isDescending) =>
        parseFloat(valueA) - parseFloat(valueB),
    },
    {
      headerName: "Go To",
      field: "url",
      cellRenderer: (props) => {
        return (
          <a href={props.value} target="_blank" rel="noreferrer">
            Go to Product
          </a>
        );
      },
    },
  ];

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    productID: "",
    productName: "",
    productPrice: "",
    productLink: "",
  });

  const [rowData, setRowData] = useState([]);

  const [productNameValid, setProductNameValid] = useState(true);

  const [variantsList, setVariantsList] = useState([]);

  const { uniqueid } = useParams();

  useEffect(() => {
    setLoading(true);
    getUserData(uniqueid);
    setLoading(false);
  }, [uniqueid]);

  const getUserData = async (uniqueid) => {
    try {
      const querySnapshot = await getDocs(collection(db, "unique_links", uniqueid, "products"));
      let prods = [];
      querySnapshot.forEach((doc) => {
        prods.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
      });

      if (prods.length > 0) {
        let arr = new Array(querySnapshot.length).fill(0);
        // console.log('arr', arr)
        setVariantsList(arr);

        setRowData(
          prods.map((product, id) => ({
            id: id + 1,
            title: product.title,
            tags: product.tags,
            variants: product.variants,
            price: product.variants[0].price,
            image: product.image_links,
            url: product.url,
          }))
        );
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      return null;
    }
  };

  const selectVariant = (index, rowidx) => {
    console.log("Variant selected", index, rowidx);
    console.log("selected variants", variantsList);
    setVariantsList((prev) => {
      let newarr = [...prev];
      newarr[rowidx] = index;
      return newarr;
    });
    console.log("after", variantsList);
    setRowData((prev) => {
      let newarr = [...prev];
      newarr[rowidx].price = prev[rowidx].variants[index].price;
      return newarr;
    });
    console.log("after", rowData);
  };

  //updates the event title and startTime in event
  const inputHandler = (e) => {
    e.preventDefault();
    setProduct((prev) => {
      return { ...prev, productLink: e.target.value };
    });
  };

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
  };

  return (
    <div className="App">
      {/* <LoadingModal isLoading = { loading }/> */}
      {loading ? (
        <LoadingModal isLoading={loading} />
      ) : (
        // <div>Loading...</div>
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
              <p className="invalidText">This is a required field.</p>
            )}
            <button className="Button" onClick={handler}>
              Track!
            </button>
            <h2>Tracked Products</h2>
            <div
              className="ag-theme-quartz" // applying the grid theme
              style={{ height: 500 }} // the grid will fill the size of the parent container
            >
              <AgGridReact
                style={{ width: "100%", height: "100%" }}
                rowData={rowData}
                columnDefs={colDefs}
                gridOptions={gridOptions}
                // autoSizeStrategy={{
                //   type: "fitCellContents",
                //   autoSizeColumns: "ID",
                // }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExistingPage;
