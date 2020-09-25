import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavbarText,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useStateValue } from "../context/StateProvider";
import firebase from "firebase";

const Navigation = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [{ user, navToggle }, dispatch] = useStateValue();
  const toggle = () => dispatch({ type: "NAV_TOGGLE" });
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        window.location.reload();
      })
      .catch(function (error) {
        alert(error.message);
      });
  };
  // const updateName = () => {
  //   var dated = firebase.auth().currentUser;

  //   dated
  //     .updateProfile({
  //       displayName: "Steven",
  //     })
  //     .then(function () {
  //       console.log('success', dated.displayName);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };
  return (
    <Navbar className="chavez-color" color="dark" dark expand="md">
      <NavbarBrand onClick={toggle}>Chavez Family</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={navToggle} navbar>
        <Nav className="mr-auto" navbar>
          {user && (
            <NavbarText className="mr-3  text-white">
              Hi, {user.displayName}
            </NavbarText>
          )}
          <NavItem>
            <NavLink onClick={toggle} tag={Link} to="/">
              Home Page
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={toggle} tag={Link} to="/list">
              Grocery List
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={toggle} tag={Link} to="/add">
              Add To Cart
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={toggle} tag={Link} to="/cart">
              Grocery Cart
            </NavLink>
          </NavItem>
          {user && (
            <NavItem>
              <NavLink onClick={signOut}> Signout</NavLink>
            </NavItem>
          )}
          <NavItem>
            {!user && (
              <NavLink tag={Link} to="/login">
                {" "}
                Login
              </NavLink>
            )}
          </NavItem>
          {/* <NavItem>
              {props.user && (
                <NavLink onClick={updateName}>
                  update
                </NavLink>
              )}
            </NavItem> */}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Navigation;
