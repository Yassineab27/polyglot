import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import Home from "./layout/Home";
import Navbar from "./layout/Navbar";
import Alert from "./layout/Alert";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";

import "../index.css";

const App = () => {
  return (
    <React.Fragment>
      <Router history={history}>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth/register" component={Register} />
          <Route path="/auth/Login" component={Login} />
          <Route path="/profiles/new" component={Profile} />
          <Route path="/posts" component={Posts} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
