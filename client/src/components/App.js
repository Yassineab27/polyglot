import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./layout/Home";
import Navbar from "./layout/Navbar";
import Register from "./auth/Register";
import Login from "./auth/Login";

import "../index.css";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth/register" component={Register} />
          <Route path="/auth/Login" component={Login} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
