import React, { useState } from "react";
import { db } from "../firebase";
import { Redirect } from "react-router-dom";
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
} from "reactstrap";

function ProductUpdate(props) {
  const [name, setName] = useState(props.name);
  const [cost, setCost] = useState(props.cost);
  const [quantity, setQuantity] = useState(props.quantity);
  const updateProduct = (e) => {
    db.collection("products")
      .doc(props.id)
      .update({ name, cost, quantity })
      .then(<Redirect to="/" />);
  };

  
  return (
    <div>
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
              onChange={(e) => setQuantity(e.target.value)}
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
        <Button color="primary" onClick={updateProduct}>
          Update
        </Button>
      </Form>
    </div>
  );
}

export default ProductUpdate;
