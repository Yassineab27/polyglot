import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getRandomProfile } from "../../actions";

import Loader from "../layout/Loader";

class RandomProfile extends Component {
  componentDidMount() {
    this.props.getRandomProfile(this.props.match.params.user_id);
  }
  render() {
    const { info } = this.props;
    if (!info) {
      return <Loader />;
    }

    const { profile, posts } = this.props.info;

    return (
      <div>
        <Link to="/profiles">
          <div className="text-left my-1">
            <button className="btn btn-light">
              <i className="fas fa-backward" /> Go back
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
  return { info: state.prof.profileInfo };
};

export default connect(
  mapStateToProps,
  { getRandomProfile }
)(RandomProfile);
