import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { connect } from "react-redux";

const Post = props => {
  const { post, user } = props;
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
              {props.post.owner.firstName} {post.owner.lastName}
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
          <button className="btn btn-light">
            <i className="fas fa-thumbs-up" />
            {post.likes.length ? (
              <span className="main-text"> {post.likes.length}</span>
            ) : null}
          </button>
          <button className="btn btn-light">
            <i className="fas fa-thumbs-down" />
          </button>
          <Link to={`/posts/${post._id}`} className="btn btn-main">
            Comments{" "}
            {post.comments.length ? (
              <span className="comment-count">{post.comments.length}</span>
            ) : null}
          </Link>
          {post.owner._id === user._id ? (
            <button className="btn btn-danger">
              <i className="fas fa-trash-alt" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(Post);
