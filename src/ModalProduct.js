import React, { useState } from 'react';

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
	ModalFooter
} from 'reactstrap';

import Edit from '../node_modules/bootstrap-icons/icons/pencil-square.svg';
import { useStateValue } from './StateProvider';

function ModalProduct({ name, cost, quantity, id, updateProduct }) {
	const [ prodName, setProdName ] = useState(name);
	const [ prodCost, setProdCost ] = useState(cost);
	const [ prodQuantity, setProdQuantity ] = useState(quantity);

	// const updateProduct = (e) => {
	// 	db.collection('products').doc(props.id).update({ name, cost, quantity }).then(toggle);
	// };

	const [ { modal }, dispatch ] = useStateValue();

	const toggle = () => dispatch({ type: 'TOGGLE' });
	return (
		<div className="ml-2 mr-2">
			<img className="edit mr-2" src={Edit} onClick={toggle} style={{ cursor: 'pointer' }} alt="" />
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
									value={prodName}
									onChange={(e) => setProdName(e.target.value)}
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
									value={prodQuantity}
									onChange={(e) => setProdQuantity([ e.target.value ])}
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
										value={prodCost}
										onChange={(e) => setProdCost(e.target.value)}
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
					<Button
						color="primary"
						onClick={() => {
							updateProduct(id, prodName, prodCost, prodQuantity);
							toggle();
						}}
					>
						Update
					</Button>
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export default ModalProduct;
