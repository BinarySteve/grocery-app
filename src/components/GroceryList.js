import React, { useState, useEffect } from "react";
import {
  Alert,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Label,
  Col,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Table,
  Form,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import "../styles/css/GroceryList.css";
import { db } from "../firebase";
import Trash from "../../node_modules/bootstrap-icons/icons/trash2-fill.svg";
import useToggle from "../hooks/useInputState";
import { useStateValue } from "../context/StateProvider";
import require from "../styles/images/require.png";
import EditActivityForm from "./EditActivityForm";

function GroceryList() {
  const [list, setList] = useState([]);
  const [{ user }] = useStateValue();
  const [input, setInput] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isEditing, toggle] = useToggle(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const onDismiss = () => setVisible(false);

  useEffect(() => {
    //fire when page loads
    let mounted = true;
    const listRef = db.collection("list");
    if (mounted) {
      listRef.get().then((list) => {
        list.forEach((item) => {
          let data = item.data();
          let { id, name, quantity } = item;
          let payload = {
            id,
            name,
            quantity,

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
      quantity: quantity,
    });

    setList([...list, { name: input, quantity }]);
  };

  const deleteAllProducts = () => {
    let collectionRef = db.collection("list");
    collectionRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              setList([]);
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
  const deleteItem = (id) => {
    db.collection("list").doc(id).delete();
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addToList();
    setInput("");
    setQuantity("");
  };
  console.log(list.length);
  return (
    <div className="container">
      <div className="container mb-5 text-center">
        <div className="container mt-5">
          <div className="container" style={{height: 50}}>
            <Alert color="info" isOpen={visible} toggle={onDismiss}>
              {message}
            </Alert>
          </div>
          <h1>
            Grocery List{" "}
            <img src={require} width="50px" height="50px" alt="list" />
            <Button
              disabled={!list.length ? "true" : null}
              onClick={() => {
                if (window.confirm(`Delete all groceries?`)) {
                  deleteAllProducts();
                  setVisible(true);
                  setMessage("Deleted All Products");
                  setTimeout(() => {
                    setVisible(false);
                  }, 3000);
                }
              }}
              className="shadow chavez-color"
            >
              Clear List
            </Button>
          </h1>
          <Form className="mt-5" onSubmit={handleSubmit}>
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
                <Input
                  className="chavez-color-focus"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  name="quantity"
                  id="productQuantity"
                  placeholder="Qty"
                  min="1"
                  required
                />
              </InputGroupAddon>

              <InputGroupAddon>
                <Button className="chavez-color">Add To List</Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* <div className="d-flex justify-content-between mb-3">
							<Link to="/add">
								<Button className="shadow chavez-color">Add to Cart</Button>
							</Link>
							<Button
								onClick={() => {
									if (window.confirm(`Delete all groceries?`)) {
										deleteAllProducts();
									}
								}}
								className="shadow chavez-color"
							>
								Clear All Groceries
							</Button>
						</div> */}
          {list.length >= 1 && (
            <Table size="sm" className="text-center">
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Name</th>
                  <th />
                </tr>
              </thead>

              {list.map((item, id) => (
                <tbody className="text-center">
                  <tr>
                    <td>{item.quantity}</td>
                    <td className="text-capitalize">{item.name}</td>

                    <td>
                      {" "}
                      <img
                        className="trash "
                        onClick={() => {
                          if (window.confirm(`Delete ${item.name}?`)) {
                            setVisible(true);
                            setMessage(`${item.name} has been deleted`);
                            deleteItem(item.id);
                            setTimeout(() => {
                              setVisible(false);
                            }, 3000);
                          }
                        }}
                        src={Trash}
                        style={{ cursor: "pointer" }}
                        alt=""
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          )}
          {!list.length && (
            <div className="text-center mt-5 p-2" style={{border:"3px solid red"}}>
              <h1>There are no items in your list</h1>
            </div>
          )}
        </div>
      </div>

      {!user && <Redirect to="/login" />}
    </div>
  );
}

export default GroceryList;
