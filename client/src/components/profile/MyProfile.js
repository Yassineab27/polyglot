import React, { Component } from "react";
import { Link } from "react-router-dom";

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
        <div className="underline" />
        <Link to="/profiles/me/edit">
          <div className="text-right">
            <button className="btn btn-main">
              <i className="far fa-edit" /> Edit Profile
            </button>
          </div>
        </Link>
        <div className="profile-grid my-1">
          <div className="profile-top bg-main p-2">
            <img
              className="image-round my-1"
              src={profile.owner.avatar}
              alt={profile.owner.firstName}
            />
            <h2 className="large grey-text">
              {profile.owner.firstName} {profile.owner.lastName}
            </h2>
            <p className="info">
              <span className="grey-text">Age Bracket: </span> {profile.age}
            </p>
            <p className="info">
              <span className="grey-text">From: </span>
              {profile.country}
            </p>
            <p className="info">
              <span className="grey-text">Speaks: </span> {profile.languageN}
            </p>
            <p className="info">
              <span className="grey-text">Learning: </span> {profile.languageL}
            </p>
          </div>
          <div className="profile-about bg-light p-2">
            <h2 className="text main-text">About Me</h2>
            <p>{profile.bio}</p>
            <div className="line" />
            <h2 className="text main-text">My Interests</h2>
            <div className="interests">
              {profile.interests.map(interest => (
                <div key={interest} className="p-1 interest-info">
                  <i className="fas fa-check main-text" />{" "}
                  <span className="info white-text">{interest}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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
