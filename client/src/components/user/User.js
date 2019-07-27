import React from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

const User = props => {
  const { user } = props;
  if (!user) {
    return <Redirect to="/auth/login" />;
  }
  return (
    <div>
      <h2 className="large text-center">User Settings</h2>
      <h4>{user.firstName}</h4>
      <h4>{user.lastName}</h4>
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(User);
