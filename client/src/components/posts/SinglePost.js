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

  const { currentPost, auth } = props;

  if (!auth.hasProfile) {
    props.setAlert({
      msg: "You need to create a profile first.",
      type: "danger"
    });
    return <Redirect to="/profiles/new" />;
  }

  if (!currentPost) {
    return <Loader />;
  }

  const displayPicture = currentPost.picture ? (
    <img
      className="post-picture"
      src={`https://social-network-polyglot.s3.eu-west-3.amazonaws.com/${
        currentPost.picture
      }`}
      alt={currentPost.title}
    />
  ) : null;

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
              style={{ height: "100px", width: "100px" }}
              src={
                currentPost.owner.avatar
                  ? `https://social-network-polyglot.s3.eu-west-3.amazonaws.com/${
                      currentPost.owner.avatar
                    }`
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt={currentPost.owner.firstName}
            />
            <h4>
              {currentPost.owner.firstName} {currentPost.owner.lastName}
            </h4>
          </Link>
        </div>
        <div>
          <h2 className="text my-1">{currentPost.title}</h2>
          {displayPicture}
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
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getPost, setAlert }
)(SinglePost);
