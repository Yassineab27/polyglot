import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import Home from "./layout/Home";
import Navbar from "./layout/Navbar";
import Alert from "./layout/Alert";
import Register from "./auth/Register";
import Login from "./auth/Login";
import User from "./user/User";
import CreateProfile from "./profile/CreateProfile";
import MyProfile from "./profile/MyProfile";
import AllProfiles from "./profile/AllProfiles";
import Posts from "./posts/Posts";

import "../index.css";

const App = () => {
  return (
    <React.Fragment>
      <Router history={history}>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Home} />
          <React.Fragment>
            <div className="container">
              <Route path="/auth/register" component={Register} />
              <Route path="/auth/Login" component={Login} />
              <Route path="/users/me" component={User} />
              <Route exact path="/profiles" component={AllProfiles} />
              <Route exact path="/profiles/me" component={MyProfile} />
              <Route exact path="/profiles/new" component={CreateProfile} />
              <Route path="/posts" component={Posts} />
            </div>
          </React.Fragment>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
