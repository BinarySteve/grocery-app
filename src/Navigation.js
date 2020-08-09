import React, { useState } from "react";
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
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const toggle = () => setIsOpen(!isOpen);
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
    <Navbar className="" color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">
        Chavez Family Grocery Tracker
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          {user && (
            <NavbarText className="mr-3  text-white">
              Hi, {user.displayName}
            </NavbarText>
          )}
          <NavItem>
            <NavLink tag={Link} to="/list">
              Grocery List
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/add">
              Add Item
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/cart">
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
