import React from "react";
import "../styles/css/Product.css";

import Trash from "../../node_modules/bootstrap-icons/icons/trash2-fill.svg";

function Product({  name, cost, quantity, deleteProduct, updateProduct }) {
  return (
    <tbody className="text-center">
      <tr>
        <td>{quantity}</td>
        <td className="text-capitalize">
          {name}
          <div>(${cost})</div>
        </td>
        <td className="">
          <div> ${(cost * quantity).toFixed(2)}</div>
        </td>
        <td>
          {" "}
          <img
            className="trash "
            onClick={() => {
              if (window.confirm(`Delete ${name}?`)) {
                deleteProduct();
              }
            }}
            src={Trash}
            style={{ cursor: "pointer" }}
            alt=""
          />
        </td>
      </tr>
    </tbody>
  );
}

export default Product;
