import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { connect } from "react-redux";
import { getPost } from "../../actions";
import Loader from "../layout/Loader";

const SinglePost = props => {
  useEffect(() => {
    props.getPost(props.match.params.id);
  }, []);

  const { currentPost } = props;

  if (!currentPost) {
    return <Loader />;
  }

  return (
    <div className="posts">
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
  { getPost }
)(SinglePost);
