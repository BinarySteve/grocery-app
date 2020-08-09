import React, { useState, useEffect } from 'react';
import { Col, Button, Input, ListGroup, ListGroupItem, Card, FormGroup, Form } from 'reactstrap';
import './GroceryList.css';
import { db } from './firebase';
import Trash from '../node_modules/bootstrap-icons/icons/trash2-fill.svg';
import firebase from 'firebase';

function GroceryList() {
	// const [list, setList] = useState([]);
	const [ input, setInput ] = useState('');
	const [ list, setList ] = useState([]);
	useEffect(
		() => {
			//fire when page loads

			const listRef = db.collection('list');

			listRef.get().then((list) => {
				list.forEach((item) => {
					let data = item.data();
					let { id, name } = item;
					let payload = {
						id,
						name,

						...data
					};

					setList((list) => [ ...list, payload ]);
				});
			});
			return function cleanUp() {};
		},
		[ setList ]
	);
	const addToList = (e) => {
		e.preventDefault();
		db.collection('list').add({
			name: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		});
		setInput('');
		return;
	};
	const deleteItem = (id) => {
		db.collection('list').doc(id).delete();
		const newList = list.filter((item) => item.id !== id);
		setList(newList);
	};
	return (
		<div className="container">
			<div className="  mt-5 mb-5">
				{' '}
				<h1>Grocery List</h1>
				<Card className="mt-5" onSubmit={addToList}>
					<Form>
						<FormGroup row>
							<Col xs={10}>
								<Input
									type="text"
									value={input}
									onChange={(e) => setInput(e.target.value)}
									name="name"
									id="productName"
									placeholder="Product Name"
									required
								/>
							</Col>
							<Button color="secondary" xs={2}>
								Add to List
							</Button>
						</FormGroup>
					</Form>
					<ListGroup>
						{list.map((item, id) => (
							<ListGroupItem className="hover" key={id}>
								{item.name}
								<img
									className="trash"
									src={Trash}
									onClick={() => deleteItem(item.id)}
									style={{ cursor: 'pointer' }}
									alt=""
								/>
							</ListGroupItem>
						))}
					</ListGroup>
				</Card>
			</div>
		</div>
	);
}

export default GroceryList;
