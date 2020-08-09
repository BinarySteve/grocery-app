import React from "react";

import Trash from "../node_modules/bootstrap-icons/icons/trash2-fill.svg";

import { db } from "./firebase";

import ModalProduct from "./ModalProduct";

function Product({ id, name, cost, quantity }) {
  const deleteProduct = (e) => {
    db.collection("products").doc(id).delete();
  };

  return (
    <tbody>
      <tr>
        <td className="text-left">
          <span className="l1">
            <ModalProduct id={id} name={name} cost={cost} quantity={quantity} />
            <img
              className="trash mr-5"
              src={Trash}
              onClick={deleteProduct}
              style={{ cursor: "pointer" }}
              alt=""
            />
          </span>
          {quantity}
        </td>
        <td>{name}</td>
        <td>${cost}</td>
        <td>${(cost * quantity).toFixed(2)} </td>
      </tr>
    </tbody>
  );
}

export default Product;
