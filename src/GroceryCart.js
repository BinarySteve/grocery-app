import React, { useState, useEffect } from "react";
// import Navigation from "./Navigation";
// import ModalExample from "./Modal";
import Product from "./Product";
import { db } from "./firebase";
import { Table } from "reactstrap";
import { Redirect } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import bill from "./bill.png";

function GroceryCart(props) {
  const [{ user }] = useStateValue();
  const [products, setProducts] = useState([]);

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

    setProducts(newList);
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
    });
    return setProducts(newProducts);
  };
  return (
    <div>
      {user && (
        <div className="container mb-5 text-center">
          <div className="container mt-5">
            <h1>
              Groceries <img src={bill} width="50px" height="50px" alt="bill" />
            </h1>
            <h4>${subtotal.toFixed(2)}</h4>
            <Table size="sm" className="text-center">
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Name</th>
                  <th>Cost</th>
                  <th>Edit | Delete</th>
                </tr>
              </thead>

              {products.map((product, i) => (
                <Product
                  key={i}
                  id={product.id}
                  name={product.name}
                  cost={product.cost}
                  quantity={product.quantity}
                  deleteProduct={deleteProduct}
                  updateProduct={updateProduct}
                />
              ))}
            </Table>
          </div>
        </div>
      )}
      {!user && <Redirect to="/login" />}
    </div>
  );
}

export default GroceryCart;
