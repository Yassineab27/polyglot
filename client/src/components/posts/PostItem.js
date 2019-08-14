import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { connect } from "react-redux";
import {
  deletePost,
  likePost,
  dislikePost,
  setCurrentPost
} from "../../actions";

const Post = props => {
  const { post, user } = props;

  const handleDelete = postId => {
    const confirm = window.confirm(
      "If you delete your post you are going to lose all the comments. Are you sure you want to delete the post ?!"
    );
    if (confirm) {
      return props.deletePost(postId);
    }
  };

  const likeColor = post.likes.find(like => like.owner === user._id) ? (
    <i className="fas fa-thumbs-up main-text" />
  ) : (
    <i className="fas fa-thumbs-up" />
  );

  const deleteButton =
    post.owner._id === user._id ? (
      <button onClick={() => handleDelete(post._id)} className="btn btn-danger">
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

  const displayPicture = post.picture ? (
    <img
      className="post-picture"
      src={`https://social-network-polyglot.s3.eu-west-3.amazonaws.com/${
        post.picture
      }`}
      alt={post.title}
    />
  ) : null;

  return (
    <div className="posts">
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
          {displayPicture}
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
              <span className="comment-count">{post.comments.length}</span>
            ) : null}
          </Link>
          {deleteButton}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(
  mapStateToProps,
  { deletePost, likePost, dislikePost, setCurrentPost }
)(Post);
