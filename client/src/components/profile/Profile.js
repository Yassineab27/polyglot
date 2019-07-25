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
    const { user } = this.props;
    return (
      <div>
        <h2 className="large text-center">My Profile</h2>
        <h2>{user.firstName}</h2>
        <h2>{profile.status}</h2>
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
  return { info: state.prof.profileInfo, user: state.auth.user };
};

export default connect(
  mapStateToProps,
  { getMyProfile }
)(Profile);
