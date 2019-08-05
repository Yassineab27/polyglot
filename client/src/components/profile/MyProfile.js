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
    const { profile, posts } = this.props.info;
    if (!this.props.info) {
      return <Loader />;
    }

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
        {posts.map(post => {
          const likeColor = post.likes.find(like => like.owner === user._id) ? (
            <i className="fas fa-thumbs-up main-text" />
          ) : (
            <i className="fas fa-thumbs-up" />
          );

          const deleteButton =
            post.owner._id === user._id ? (
              <button
                onClick={() => handleDelete(post._id)}
                className="btn btn-danger"
              >
                <i className="fas fa-trash-alt" />
              </button>
            ) : null;

          const handleLikes = postId => {
            if (!post.likes.filter(like => like.owner === user._id).length) {
              return props.likePost(postId);
            }
          };

          const handleDislike = postId => {
            if (post.likes.filter(like => like.owner === user._id).length) {
              return props.dislikePost(postId);
            }
          };
          return (
            <div className="posts">
              <div className="post bg-white p-1 my-1">
                <div className="text-center">
                  <Link to={`/profiles/user/${post.owner._id}`}>
                    <img
                      className="image-round"
                      src={post.owner.avatar}
                      alt={post.owner.firstName}
                    />
                    <h4>
                      {post.owner.firstName} {post.owner.lastName}
                    </h4>
                  </Link>
                </div>
                <div>
                  <p className="text my-1">{post.title}</p>
                  <p className="my-1">{post.description}</p>
                  <p className="post-date">
                    Posted on{" "}
                    <Moment format="YYYY/MM/DD HH:mm">{post.createdAt}</Moment>
                  </p>
                  <button
                    onClick={() => handleLikes(post._id)}
                    className="btn btn-light"
                  >
                    {likeColor}

                    {post.likes.length ? (
                      <span className="main-text"> {post.likes.length}</span>
                    ) : null}
                  </button>
                  <button
                    onClick={() => handleDislike(post._id)}
                    className="btn btn-light"
                  >
                    <i className="fas fa-thumbs-down" />
                  </button>
                  <Link
                    onClick={() => props.setCurrentPost(post._id)}
                    to={`/posts/${post._id}`}
                    className="btn btn-main"
                  >
                    Comments{" "}
                    {post.comments.length ? (
                      <span className="comment-count">
                        {post.comments.length}
                      </span>
                    ) : null}
                  </Link>
                  {deleteButton}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    info: state.prof.profileInfo,
    hasProfile: state.auth.hasProfile
    // posts: state.posts
  };
};

export default connect(
  mapStateToProps,
  { getMyProfile }
)(Profile);
