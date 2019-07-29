import React, { Fragment, Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../layout/Loader";

import history from "../history";
import { setAlert, updateProfile, getMyProfile } from "../../actions";
import FormProfile from "./FormProfile";

class UpdateProfile extends Component {
  componentDidMount() {
    this.props.getMyProfile();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated) {
      return <Redirect to="/auth/login" />;
    }

    if (!this.props.info) {
      return <Loader />;
    }

    const handleUpdateProfile = NewProfile => {
      this.props.updateProfile(NewProfile);
    };

    return (
      <Fragment>
        <h1 className="large text-main text-center">
          <i className="fas fa-user-circle" /> Update Your Profile
        </h1>
        <div className="underline" />
        <p className="text-center">
          <small className="grey-text">
            *the more information you give about yourself the easier it is for
            others to know about you*
          </small>
        </p>
        <FormProfile
          handleSubmit={handleUpdateProfile}
          info={this.props.info}
        />
        <div className="text-center">
          <button
            onClick={() => history.go(-1)}
            className="btn btn-warning btn-block form"
          >
            Cancel
          </button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, info: state.prof.profileInfo };
};

export default connect(
  mapStateToProps,
  { setAlert, updateProfile, getMyProfile }
)(UpdateProfile);
