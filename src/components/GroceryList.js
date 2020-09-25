import React, { useState, useEffect } from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Form,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import "../styles/css/GroceryList.css";
import { db } from "../firebase";
import Trash from "../../node_modules/bootstrap-icons/icons/trash2-fill.svg";

import { useStateValue } from "../context/StateProvider";
import require from "../styles/images/require.png";

function GroceryList() {
  const [{ user }] = useStateValue();
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    //fire when page loads
    let mounted = true;
    const listRef = db.collection("list");
    if (mounted) {
      listRef.get().then((list) => {
        list.forEach((item) => {
          let data = item.data();
          let { id, name } = item;
          let payload = {
            id,
            name,

            ...data,
          };

          setList((list) => [...list, payload]);
        });
      });
    }
    return function cleanUp() {
      mounted = false;
    };
  }, [setList]);

  const addToList = () => {
    db.collection("list").add({
      name: input,
    });

    setList([...list, input]);
  };

  const deleteItem = (id) => {
    db.collection("list").doc(id).delete();
    const newList = list.filter((item) => item.id !== id);
    return setList(newList);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    addToList();
    setInput("");
  };

  return (
    <div className="container">
      <div className="  mt-5 mb-5">
        {" "}
        <h1>
          Grocery List{" "}
          <img src={require} width="50px" height="50px" alt="list" />
        </h1>
        <Form className="mt-5" onSubmit={handleSubmit}>
          <div className="container">
            <FormGroup row>
              <InputGroup>
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  name="name"
                  id="productName"
                  placeholder="Product Name"
                  className="chavez-color-focus"
                  required
                />
                <InputGroupAddon addonType="append">
                  <Button className="chavez-color">Add To List</Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </div>
        </Form>
        <ListGroup>
          {list.map((item, id) => (
            <ListGroupItem className="hover d-flex text-capitalize" key={id}>
              {item.name}
              <div className="ml-auto">
                <img
                  className="trash"
                  src={Trash}
                  onClick={() => {
                    if (window.confirm(`Delete ${item.name}?`)) {
                      deleteItem(item.id);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                  alt="Delete"
                />
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
      {!user && <Redirect to="/login" />}
    </div>
  );
}

export default GroceryList;