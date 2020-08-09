import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "./firebase";

import Logo from "./Logo.png";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (auth.currentUser) {
    return <Redirect to="/" />;
  }
  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {})

      .catch((e) => alert(e.message));
  };

  // const register = (e) => {
  //   e.preventDefault();
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((auth) => {
  //       history.push("/login");
  //     })
  //     .catch((e) => alert(e.message));
  // };
  return (
    <div className="d-flex flex-column align-items-center login-clean">
      <form method="post">
        <h2 className="text-center">Login</h2>
        <div className="illustration">
          <img src={Logo} alt="" />
          <h1>Chavez Family Grocery Tracker</h1>
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <button
            onClick={login}
            className="btn btn-primary btn-block"
            type="submit"
          >
            Log In
          </button>
        </div>
        {/* <div className="form-group">
            <button
              onClick={register}
              className="btn btn-primary btn-block"
              type="submit"
            >
              Create Account
            </button>
          </div> */}
      </form>
    </div>
  );
}
export default Login;
