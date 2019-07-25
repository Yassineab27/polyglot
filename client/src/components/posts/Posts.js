import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Posts extends Component {
  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/auth/login" />;
    }
    return (
      <div>
        <h1>POSTS</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStateToProps)(Posts);
