import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import "./index.css";
import App from "./components/App";
import { setUser, setProfile } from "./actions";

import reducers from "./reducers";
import setAuthorizationToken from "./utils/setAuthorizationToken";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

if (localStorage.token && localStorage.user) {
  setAuthorizationToken(localStorage.getItem("token"));
  store.dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
}

if (localStorage.hasProfile) {
  store.dispatch(setProfile());
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
