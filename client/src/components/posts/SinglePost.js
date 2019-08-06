import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Moment from "react-moment";

import { connect } from "react-redux";
import { getPost, setAlert } from "../../actions";
import Loader from "../layout/Loader";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const SinglePost = props => {
  useEffect(() => {
    props.getPost(props.match.params.id);
  }, []);

  const { currentPost, user } = props;

  if (!user.hasProfile) {
    props.setAlert({
      msg: "You need to create a profile first.",
      type: "danger"
    });
    return <Redirect to="/profiles/new" />;
  }

  if (!currentPost) {
    return <Loader />;
  }

  return (
    <div className="posts">
      <Link to="/posts" className="btn btn-grey my-1">
        <i className="fas fa-backward" /> Go Back
      </Link>
      <div className="post bg-white p-1 my-1">
        <div className="text-center">
          <Link to={`/profiles/user/${currentPost.owner._id}`}>
            <img
              className="image-round"
              src={currentPost.owner.avatar}
              alt={currentPost.owner.firstName}
            />
            <h4>
              {currentPost.owner.firstName} {currentPost.owner.lastName}
            </h4>
          </Link>
        </div>
        <div>
          <p className="text my-1">{currentPost.title}</p>
          <p className="my-1">{currentPost.description}</p>
          <p className="post-date">
            Posted on{" "}
            <Moment format="YYYY/MM/DD HH:mm">{currentPost.createdAt}</Moment>
          </p>
        </div>
      </div>
      <CommentForm currentPost={currentPost} />
      <div className="comments">
        {currentPost.comments.map(comment => {
          return (
            <CommentItem
              key={comment._id}
              comment={comment}
              currentPost={currentPost}
            />
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentPost: state.post.currentPost,
    user: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getPost, setAlert }
)(SinglePost);