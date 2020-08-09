import React, { useState } from 'react';
import {
	Card,
	Col,
	Button,
	CardHeader,
	CardBody,
	Form,
	FormGroup,
	Label,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText
} from 'reactstrap';
import { db } from './firebase';
import firebase from 'firebase';
import { useHistory, Redirect } from 'react-router-dom';
import { useStateValue } from './StateProvider';

function ProductCreate(props) {
	const [ { user } ] = useStateValue();
	const [ name, setName ] = useState('');
	const [ cost, setCost ] = useState('');
	const [ quantity, setQuantity ] = useState(1);
	const history = useHistory();

	const addProduct = (e) => {
		e.preventDefault();
		db.collection('products').add({
			name,
			cost,
			quantity,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		});
		history.push('/cart');
	};

	return (
		<div className="container mb-5">
			<h1 className="mt-5">Add New Product</h1>
			<Card className="mt-5">
				<CardHeader>Subtotal: ${(quantity * cost).toFixed(2)}</CardHeader>
				<CardBody>
					<Form onSubmit={addProduct}>
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
						<Button>Add Product</Button>
					</Form>
				</CardBody>
			</Card>
			{!user && <Redirect to="/login" />}
		</div>
	);
}

export default ProductCreate;