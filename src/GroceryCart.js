import React, { useState, useEffect } from "react";
// import Navigation from "./Navigation";
// import ModalExample from "./Modal";
import Product from "./Product";
import { db } from "./firebase";
import { Table } from "reactstrap";
import { Redirect } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function GroceryCart(props) {
  const [{ user }] = useStateValue();
  const [products, setProducts] = useState([]);
  const [deleted, setDeleted] = useState(false);

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

  return (
    <div>
      {user && (
        <div className="container mb-5 text-center">
          <div className="container mt-5">
            <h1>Groceries</h1>
            <h4>${subtotal.toFixed(2)}</h4>
            <Table size="sm">
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Name</th>
                  <th>Cost</th>
                  <th>Subtotal</th>
                  {/* <th>Edit | Delete</th> */}
                </tr>
              </thead>

              {products.map((product, i) => (
                <Product
                  key={i}
                  id={product.id}
                  name={product.name}
                  cost={product.cost}
                  quantity={product.quantity}
                  update={() => {
                    setDeleted(!deleted);
                  }}
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
