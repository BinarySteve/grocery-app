import React from 'react';

import Trash from '../node_modules/bootstrap-icons/icons/trash2-fill.svg';

import ModalProduct from './ModalProduct';

function Product({ id, name, cost, quantity, deleteProduct, updateProduct }) {
	return (
		<tbody className="text-center">
			<tr>
				<td>{quantity}</td>
				<td className="text-capitalize">
					{name} <div>(${cost})</div>{' '}
				</td>
				<td className="">
					<div> ${(cost * quantity).toFixed(2)}</div>
				</td>
				<td>
					<div className="d-flex ">
						<ModalProduct
							id={id}
							name={name}
							cost={cost}
							quantity={quantity}
							updateProduct={updateProduct}
						/>
						<img
							className="trash "
							onClick={() => {
								if (window.confirm(`Delete ${name}?`)) {
									deleteProduct(id);
								}
							}}
							src={Trash}
							style={{ cursor: 'pointer' }}
							alt=""
						/>
					</div>
				</td>
			</tr>
		</tbody>
	);
}

export default Product;
