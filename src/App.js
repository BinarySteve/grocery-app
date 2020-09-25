import React, { useEffect } from 'react';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';
import ProductCreate from './components/ProductCreate';
import GroceryList from './components/GroceryList';
import { auth } from './firebase';
import { useStateValue } from './context/StateProvider';
import GroceryCart from './components/GroceryCart';

function App() {
	const [ {}, dispatch ] = useStateValue();

	useEffect(
		() => {
			const unsubscribe = auth.onAuthStateChanged((authUser) => {
				if (authUser) {
					dispatch({
						type: 'SET_USER',
						user: authUser
					});
				} else {
					dispatch({
						type: 'SET_USER',
						user: null
					});
				}
			});

			return () => {
				unsubscribe();
			};
		},
		[ dispatch ]
	);

	return (
		<Router>
			<Navigation />
			{/* {!user && !loggedIn && (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )} */}
			<Switch>
				<Route path="/list" component={GroceryList} />
				<Route path="/login" component={Login} />

				<Route path="/cart" component={GroceryCart} />
				<Route path="/add" component={ProductCreate} />
				<Route path="/" component={Home} />
			</Switch>
		</Router>
	);
}

export default App;
