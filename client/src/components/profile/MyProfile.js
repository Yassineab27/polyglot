import React, { Component } from "react";

import { getMyProfile } from "../../actions";
import { connect } from "react-redux";

import Loader from "../layout/Loader";

class Profile extends Component {
  componentDidMount() {
    this.props.getMyProfile();
  }

  render() {
    if (!this.props.info) {
      return <Loader />;
    }
    const { profile, posts } = this.props.info;

    return (
      <div>
        <h2 className="large text-center">My Profile</h2>
        <h2>
          {profile.owner.firstName} {profile.owner.lastName}
        </h2>
        <div>
          {posts.map(post => {
            return (
              <ul key={post._id}>
                <h4>{post.title}</h4>
                <p>{post.description}</p>
              </ul>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    info: state.prof.profileInfo,
    hasProfile: state.auth.hasProfile
  };
};

export default connect(
  mapStateToProps,
  { getMyProfile }
)(Profile);
