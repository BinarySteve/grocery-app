import React from "react";
import "./Home.css";
import { Jumbotron, Button } from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Home() {
  const [{ user }] = useStateValue();

  return (
    <div className="container">
      {user && (
        <Jumbotron className="mt-5">
          <h1 className="j-display display-3">Hello, {user.displayName}</h1>
          <p className="j-display lead">What would you like to do?</p>
          <hr className="my-2" />

          <div className="d-flex justify-content-around mt-5">
            <Button className="home-btn" tag={Link} to="/list" size="lg" color="dark">
              Look at Grocery List
            </Button>
            <Button className="home-btn" tag={Link} to="/add" size="lg" color="dark">
              Add to Groceries
            </Button>
            <Button className="home-btn" size="lg" tag={Link} to="/cart" color="dark">
              Go to Grocery Cart
            </Button>
          </div>
        </Jumbotron>
      )}
      {!user && <Redirect to="/login" />}
    </div>
  );
}

export default Home;
