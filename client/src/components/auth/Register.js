import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "../../index.css";

import { connect } from "react-redux";
import { authRegister, setAlert } from "../../actions";

const Register = props => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (password.length < 6) {
      props.setAlert({ msg: "Password too short. Try again.", type: "danger" });
    } else if (password !== password2) {
      props.setAlert({
        msg: "Please make sure both passwords match.",
        type: "danger"
      });
    } else {
      const user = {
        firstName,
        lastName,
        email,
        password
      };
      console.log(user);
      props.authRegister(user);
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/posts" />;
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="form">
        <h2 className="large text-center py-1">Register</h2>
        <div className="underline" />
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <small className="form-small">
            *Please make sure it's a valid Email.*
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <small className="form-small">
            *Minimum 6 characters (make your Password stronger by using Numbers
            and Letters together. ex: "PoLyGlot2019")*
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-main btn-block my-1"
        />
        <p className="my-1">
          Already have an account? Please
          <Link to="/auth/login"> Login here.</Link>
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
  { authRegister, setAlert }
)(Register);
