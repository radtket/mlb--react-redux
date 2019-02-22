import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import ThemeProvider from "react-toolbox/lib/ThemeProvider";
import store, { history } from "./store";
import App from "./containers/app";

import "./styles/react-toolbox/theme.css";
import theme from "./styles/react-toolbox/theme";

import "sanitize.css";
import "./styles/index.scss";

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.querySelector("#root")
);
