import React from "react";
import { Link } from "react-router-dom";

const Post = props => {
  return (
    <div className="posts">
      <div className="post bg-white p-1 my-1">
        <div className="text-center">
          <Link to={`/profiles/user/${props.post.owner._id}`}>
            <img
              className="image-round"
              src={props.post.owner.avatar}
              alt={props.post.owner.firstName}
            />
            <h4>
              {props.post.owner.firstName} {props.post.owner.lastName}
            </h4>
          </Link>
        </div>
        <div>
          <p className="text my-1">{props.post.title}</p>
          <p className="my-1">{props.post.description}</p>
          <p className="post-date">{props.post.createdAt}</p>
          <button className="btn btn-light">
            <i className="fas fa-thumbs-up" />
            <span> {props.post.likes.length}</span>
          </button>
          <button className="btn btn-light">
            <i className="fas fa-thumbs-down" />
          </button>
          <Link
            to={`/posts/comment/${props.post._id}`}
            className="btn btn-main"
          >
            Comments{" "}
            <span className="comment-count">{props.post.comments.length}</span>
          </Link>
          <button className="btn btn-danger">
            <i className="fas fa-trash-alt" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
