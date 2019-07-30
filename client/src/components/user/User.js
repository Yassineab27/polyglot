import React from "react";
import { Redirect, Link } from "react-router-dom";

import { connect } from "react-redux";

const User = props => {
  const { user } = props;
  if (!user) {
    return <Redirect to="/auth/login" />;
  }
  return (
    <div>
      <h2 className="large text-center">User Settings</h2>
      <div className="underline" />
      <div className="form">
        <div className="form-group text-center">
          <img
            src={user.avatar}
            alt={user.firstName}
            className="image-round"
            style={{ height: "150px", width: "150px" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name: </label>
          <input type="text" value={user.firstName} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name: </label>
          <input type="text" value={user.lastName} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address: </label>
          <input type="text" value={user.email} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input type="text" placeholder="******" disabled />
        </div>
        <Link to="/users/me/edit">
          <button className="btn btn-warning btn-block my-1">
            <i className="far fa-edit" /> Edit User
          </button>
        </Link>
        <button className="btn btn-block btn-danger">
          <i className="far fa-trash-alt" /> Delete Account
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(User);
