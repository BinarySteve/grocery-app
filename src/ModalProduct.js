import React, { useState } from "react";

import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { db } from "./firebase";
import Edit from "../node_modules/bootstrap-icons/icons/pencil-square.svg";
import {useStateValue} from './StateProvider'

function ModalProduct(props) {
  const [name, setName] = useState(props.name);
  const [cost, setCost] = useState(props.cost);
  const [quantity, setQuantity] = useState(props.quantity);

  const updateProduct = (e) => {
    db.collection("products")
      .doc(props.id)
      .update({ name, cost, quantity })
      .then(toggle);
  };

  
  const [{modal}, dispatch] = useStateValue()

  const toggle = () => dispatch({type: "TOGGLE"})
  return (
    <React.Fragment>
      <img
        className="edit mr-2"
        src={Edit}
        onClick={toggle}
        style={{ cursor: "pointer" }}
        alt=""
      />
      {/* <Button color="danger" onClick={toggle}>
        Edit Product
      </Button> */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Product</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="productName" sm={2}>
                Name
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  id="productName"
                  placeholder="Product Name"
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="productQuantity" sm={2}>
                Quantity
              </Label>
              <Col sm={10}>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity([ e.target.value])}
                  name="quantity"
                  id="productQuantity"
                  placeholder="0"
                  min="1"
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="productCost" sm={2}>
                Cost
              </Label>
              <Col sm={10}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    name="cost"
                    id="productCost"
                    placeholder="0.00"
                    required
                  />
                </InputGroup>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateProduct}>
            Update
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default ModalProduct;
