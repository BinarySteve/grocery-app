import React, { useEffect } from "react";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Navigation from "./Navigation";
import ProductCreate from "./ProductCreate";
import GroceryList from "./GroceryList";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import GroceryCart from "./GroceryCart";

function App() {
  const [{  }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

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
