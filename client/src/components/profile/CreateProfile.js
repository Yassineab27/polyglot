import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const CreateProfile = props => {
  const { profile, isAuthenticated } = props.auth;
  if (!isAuthenticated) {
    return <Redirect to="/auth/login" />;
  }

  if (profile) {
    return <Redirect to="/posts" />;
  }

  return (
    <div>
      <h1>Create Porfile</h1>
    </div>
  );
};

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(CreateProfile);
