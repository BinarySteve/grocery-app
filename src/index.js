import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { StateProvider } from "./StateProvider";
import { initialState } from "./reducer";
import reducer from "./reducer";

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,

  document.getElementById("root")
);
