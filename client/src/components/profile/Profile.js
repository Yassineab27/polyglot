import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>My Profile</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { profile: state.auth.profile };
};

export default connect(mapStateToProps)(Profile);
