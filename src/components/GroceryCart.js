import React, { useState, useEffect } from "react";

// import Navigation from "./Navigation";
// import ModalExample from "./Modal";
import Product from "./Product";

import { db } from "../firebase";
import { Button, Table, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import bill from "../styles/images/bill.png";

function GroceryCart() {
  const [{ user }] = useStateValue();
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const onDismiss = () => setVisible(false);

  let subtotal = 0;
  products.map((product) => {
    subtotal +=
      parseFloat(product.cost) * product.quantity +
      parseFloat(product.cost) * product.quantity * 0.0825;

    return subtotal;
  });

  //fetch databse and add products
  useEffect(() => {
    //fire when app.js loads
    let mounted = true;
    const prodRef = db.collection("products");

    prodRef.get().then((products) => {
      if (mounted) {
        products.forEach((product) => {
          let data = product.data();
          let { id, name, cost, quantity } = product;
          let payload = {
            id,
            name,
            cost,
            quantity,
            ...data,
          };
          setProducts((products) => [...products, payload]);
        });
      }
    });
    return function cleanUp() {
      mounted = false;
    };
  }, [setProducts]);

  const deleteProduct = (id) => {
    db.collection("products").doc(id).delete();
    const newList = products.filter((item) => item.id !== id);
    setMessage("Product Deleted");
    setVisible(true);
    setProducts(newList);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };
  const deleteAllProducts = () => {
    let collectionRef = db.collection("products");
    collectionRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              setVisible(true);
              setMessage("Deleted All Items");
              setProducts([]);
              setTimeout(() => {
                setVisible(false);
              }, 3000);
            })
            .catch(function (error) {
              console.error("Error removing document: ", error);
            });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };
  const updateProduct = (id, name, cost, quantity) => {
    const newProducts = [...products];
    newProducts.map((item) => {
      if (item.id === id) {
        item.name = name;
        item.cost = cost;
        item.quantity = quantity;
      }
      db.collection("products").doc(id).update({ name, cost, quantity });
      return setProducts(newProducts);
    });
  };
  return (
    <div>
      {user && (
        <div className="container mb-5 text-center">
          <div className="container mt-5">
            <div className="container" style={{ height: 50 }}>
              <Alert color="info" isOpen={visible} toggle={onDismiss}>
                {message}
              </Alert>
            </div>
            <h1>
              Groceries <img src={bill} width="50px" height="50px" alt="bill" />
            </h1>
            <h4>${subtotal.toFixed(2)}</h4>
            <div className="d-flex justify-content-between mb-3">
              <Link to="/add">
                <Button className="shadow chavez-color">Add to Cart</Button>
              </Link>
              <Button
                disabled={!products.length ? "true" : null}
                onClick={() => {
                  if (window.confirm(`Delete all groceries?`)) {
                    deleteAllProducts();
                  }
                }}
                className="shadow chavez-color"
              >
                Clear All Groceries
              </Button>
            </div>
            {products.length >= 1 && (
              <Table size="sm" className="text-center">
                <thead>
                  <tr>
                    <th>Quantity</th>
                    <th>Name</th>
                    <th>Cost</th>
                    <th />
                  </tr>
                </thead>

                {products.map((product) => (
                  <Product
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    cost={product.cost}
                    quantity={product.quantity}
                    deleteProduct={deleteProduct}
                    updateProduct={updateProduct}
                  />
                ))}
              </Table>
            )}
            {!products.length && (
              <div className="text-center mt-5 p-2" style={{border:"3px solid red"}}>
                <h1>No items in your cart</h1>
              </div>
            )}
          </div>
        </div>
      )}
      {!user && <Redirect to="/login" />}
    </div>
  );
}

export default GroceryCart;
