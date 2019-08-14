import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

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

    const displayPosts = info.posts.map(post => {
      return (
        <div key={post._id} className="posts">
          <div className="post bg-white p-1 my-1">
            <div className="text-center">
              <Link to={`/profiles/user/${post.owner._id}`}>
                <img
                  className="image-round"
                  style={{ height: "100px", width: "100px" }}
                  src={
                    post.owner.avatar
                      ? `https://social-network-polyglot.s3.eu-west-3.amazonaws.com/${
                          post.owner.avatar
                        }`
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt={post.owner.firstName}
                />
                <h4>
                  {post.owner.firstName} {post.owner.lastName}
                </h4>
              </Link>
            </div>
            <div>
              <h2 className="text my-1">{post.title}</h2>
              {post.picture ? (
                <img
                  className="post-picture"
                  src={`https://social-network-polyglot.s3.eu-west-3.amazonaws.com/${
                    post.picture
                  }`}
                  alt={post.title}
                />
              ) : null}
              <p className="my-1">{post.description}</p>
              <p className="post-date">
                Posted on{" "}
                <Moment format="YYYY/MM/DD HH:mm">{post.createdAt}</Moment>
              </p>
            </div>
          </div>
        </div>
      );
    });

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
              style={{ height: "200px", width: "200px" }}
              src={
                info.profile.owner.avatar
                  ? `https://social-network-polyglot.s3.eu-west-3.amazonaws.com/${
                      info.profile.owner.avatar
                    }`
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt={info.profile.owner.firstName}
            />
            <h2 className="large grey-text">
              {info.profile.owner.firstName} {info.profile.owner.lastName}
            </h2>
            <p className="info">
              <span className="grey-text">Age Bracket: </span>{" "}
              {info.profile.age}
            </p>
            <p className="info">
              <span className="grey-text">From: </span>
              {info.profile.country}
            </p>
            <p className="info">
              <span className="grey-text">Speaks: </span>{" "}
              {info.profile.languageN}
            </p>
            <p className="info">
              <span className="grey-text">Learning: </span>{" "}
              {info.profile.languageL}
            </p>
          </div>
          <div className="profile-about bg-light p-2">
            <h2 className="text main-text">About Me</h2>
            <p>{info.profile.bio}</p>
            <div className="line" />
            <h2 className="text main-text">My Interests</h2>
            <div className="interests">
              {info.profile.interests.map(interest => (
                <div key={interest} className="p-1 interest-info">
                  <i className="fas fa-check main-text" />{" "}
                  <span className="info white-text">{interest}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {info.posts.length ? (
          <React.Fragment>
            <h2
              className="large main-text text-center"
              style={{ marginTop: "2rem" }}
            >
              Posts
            </h2>
            <div className="underline" />
          </React.Fragment>
        ) : null}
        {displayPosts}
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
