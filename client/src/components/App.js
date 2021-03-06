import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import Home from "./layout/Home";
import Navbar from "./layout/Navbar";
import Alert from "./layout/Alert";
import Register from "./auth/Register";
import Login from "./auth/Login";
import User from "./user/User";
import UpdateUser from "./user/UpdateUser";
import CreateProfile from "./profile/CreateProfile";
import MyProfile from "./profile/MyProfile";
import AllProfiles from "./profile/AllProfiles";
import RandomProfile from "./profile/RandomProfile";
import UpdateProfile from "./profile/UpdateProfile";
import Posts from "./posts/Posts";
import SinglePost from "./posts/SinglePost";

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
              <Route exact path="/users/me" component={User} />
              <Route path="/users/me/edit" component={UpdateUser} />
              <Route exact path="/profiles" component={AllProfiles} />
              <Route exact path="/profiles/me" component={MyProfile} />
              <Route exact path="/profiles/new" component={CreateProfile} />
              <Route exact path="/profiles/me/edit" component={UpdateProfile} />
              <Route
                exact
                path="/profiles/user/:user_id"
                component={RandomProfile}
              />
              <Route exact path="/posts" component={Posts} />
              <Route exact path="/posts/:id" component={SinglePost} />
            </div>
          </React.Fragment>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
