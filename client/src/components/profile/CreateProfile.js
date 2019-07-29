import React, { Fragment, Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { setAlert, createProfile } from "../../actions";
import FormProfile from "./FormProfile";

class CreateProfile extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated) {
      return <Redirect to="/auth/login" />;
    }

    const handleCreateProfile = profile => {
      this.props.createProfile(profile);
    };

    return (
      <Fragment>
        <h1 className="large text-main text-center">
          <i className="fas fa-user" /> Create Your Profile
        </h1>
        <div className="underline" />
        <p className="text text-center main-color">
          the more information you give about yourself the easier it is for
          others to know about you
        </p>
        <p className="text-center">
          <small className="grey-text">
            *having a profile is gonna allow you to create posts, like and
            comment them.*
          </small>
        </p>
        <FormProfile handleSubmit={handleCreateProfile} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  { setAlert, createProfile }
)(CreateProfile);
