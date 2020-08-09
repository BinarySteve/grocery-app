import React from "react";
import "./Home.css";
import { Jumbotron } from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import require from "./require.png";
import addBasket from "./addBasket.png";
import bill from "./bill.png";

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
            <Link className="btn m-1" to="/list" title="Grocery List">
              <img src={require} className="img-fluid" alt="" />
            </Link>
            <Link className="btn m-1" to="/add" title="Add Item">
              <img src={addBasket} className="img-fluid" alt="" />
            </Link>
            <Link className="btn m-1" to="/cart" title="View Cart">
              <img src={bill} className="img-fluid" alt="" />
            </Link>
            {/* <Button tag={Link} to="/add" size="lg" color="dark">
              <img src={addBasket} alt="" />
            </Button>
            <Button size="lg" tag={Link} to="/cart" color="dark">
              <img src={bill} alt="" />
            </Button> */}
          </div>
        </Jumbotron>
      )}
      {!user && <Redirect to="/login" />}
    </div>
  );
}

export default Home;
