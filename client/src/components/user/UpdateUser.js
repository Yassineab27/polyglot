import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

import { connect } from "react-redux";
import { setAlert, updateUser } from "../../actions";

import "../../index.css";

const User = props => {
  const { user } = props;
  const [avatar, setAvatar] = useState(user.avatar);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  if (!user) {
    return <Redirect to="/auth/login" />;
  }

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      return props.setAlert({
        msg: "Make sure both passwords match.",
        type: "danger"
      });
    }
    const user = {
      firstName,
      lastName,
      email,
      password
    };
    props.updateUser(user, avatar);
  };

  return (
    <div>
      <h2 className="large text-center">Edit User</h2>
      <div className="underline" />
      <form onSubmit={onSubmit} className="form">
        <div className="form-group text-center">
          <img
            src={
              user.avatar
                ? `https://social-network-polyglot.s3.eu-west-3.amazonaws.com/${
                    user.avatar
                  }`
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt={user.firstName}
            className="image-round"
            style={{ height: "150px", width: "150px" }}
          />
          <label htmlFor="avatar">Avatar </label>
          <input
            accept="image/*"
            type="file"
            name="avatar"
            onChange={e => setAvatar(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            value={firstName}
            name="firstName"
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            value={lastName}
            name="lastName"
            onChange={e => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address: </label>
          <input
            type="text"
            value={email}
            name="email"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            placeholder="******"
            value={password}
            name="password"
            onChange={e => setPassword(e.target.value)}
            minLength="6"
            required
          />
          <small className="form-small" style={{ color: "red" }}>
            *Password Required*
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password: </label>
          <input
            type="text"
            placeholder="******"
            value={password2}
            name="password2"
            onChange={e => setPassword2(e.target.value)}
            required
            minLength="6"
          />
          <small className="form-small" style={{ color: "red" }}>
            *Make sure both passwords match.*
          </small>
        </div>
        <button className="btn btn-main btn-block my-1">Update User</button>
        <Link to="/users/me">
          <button className="btn btn-block btn-grey">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(
  mapStateToProps,
  { setAlert, updateUser }
)(User);
