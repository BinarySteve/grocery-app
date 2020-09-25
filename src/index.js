import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/styles.css";
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/reducer";
import reducer from "./context/reducer";

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,

  document.getElementById("root")
);
