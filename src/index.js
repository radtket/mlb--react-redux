import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { store, history } from "./store";
import App from "./App";

import "sanitize.css";
import "./assets/scss/index.scss";

render(
  <Provider {...{ store }}>
    <ConnectedRouter {...{ history }}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.querySelector("#root")
);
