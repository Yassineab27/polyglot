import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "../../index.css";

import { authLogin, setAlert } from "../../actions";
import { connect } from "react-redux";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      password
    };
    console.log(user);
    props.authLogin(user);
  };

  if (props.isAuthenticated) {
    return <Redirect to="/posts" />;
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="form">
        <h2 className="large text-center py-1">
          <i className="fas fa-unlock-alt main-color" /> Login
        </h2>
        <div className="underline" />
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-main btn-block my-1"
        />
        <p className="my-1">
          You don't have an account? Please
          <Link to="/auth/register"> Register here.</Link>
        </p>
      </form>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(
  mapStateToProps,
  { authLogin, setAlert }
)(Login);
