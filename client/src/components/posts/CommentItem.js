import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { connect } from "react-redux";
import { removeComment } from "../../actions";

const CommentItem = props => {
  const { comment, currentPost, user } = props;

  const handleRemove = (postId, commentId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this comment ?!"
    );

    if (confirm) {
      props.removeComment(postId, commentId);
    }
  };

  const deleteButton =
    currentPost.owner._id === user._id || comment.owner === user._id ? (
      <button
        onClick={() => handleRemove(currentPost._id, comment._id)}
        className="btn btn-grey"
      >
        <i className="fas fa-trash-alt" />
      </button>
    ) : null;

  return (
    <div className="post-comment-display bg-white p-1 my-1">
      <div className="text-center">
        <Link to={`/profiles/user/${comment.owner}`}>
          <img
            className="image-round"
            src={comment.avatar}
            alt={comment.firstName}
          />
        </Link>
      </div>
      <div>
        <p className="my-1">{comment.text}</p>
        <p className="post-date grey-text">
          <Moment format="YYYY/MM/DD HH:mm">{comment.date}</Moment>
        </p>
      </div>
      {deleteButton}
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(
  mapStateToProps,
  { removeComment }
)(CommentItem);
