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
import "./GroceryList.css";
import { db } from "./firebase";
import Trash from "../node_modules/bootstrap-icons/icons/trash2-fill.svg";

import { useStateValue } from "./StateProvider";
import require from "./require.png";

function GroceryList() {
  const [{ user }] = useStateValue();
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  useEffect(() => {
    //fire when page loads
    let mounted = true;
    const listRef = db.collection("list");

    listRef.get().then((list) => {
      if (mounted) {
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
      }
    });
    return function cleanUp() {
      mounted = false;
    };
  }, [setList]);

  const addToList = () => {
    const newList = [...list];
    db.collection("list").add({
      name: input,
    });

    setList([newList, { input }]);
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
                  required
                />
                <InputGroupAddon addonType="append">
                  <Button color="secondary">Add To List</Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </div>
        </Form>
        <ListGroup>
          {list.map((item, id) => (
            <ListGroupItem className="hover d-flex" key={id}>
              {item.name}
              <div className="ml-auto">
                <img
                  className="trash"
                  src={Trash}
                  onClick={() => deleteItem(item.id)}
                  style={{ cursor: "pointer" }}
                  alt=""
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
