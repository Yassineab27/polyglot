import React, { Component } from "react";

import { connect } from "react-redux";
import { getPosts } from "../../actions";
import Loader from "../layout/Loader";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    if (!this.props.posts) {
      return <Loader />;
    }

    return (
      <div>
        <h1 className="large text-center main-text my-2">
          Connect with the Community <i className="fas fa-comments" />
        </h1>
        <div className="underline" style={{ background: "black" }} />
        <PostForm />
        {this.props.posts.map(post => {
          return (
            <PostItem
              key={post.newPost ? post.newPost._id : post._id}
              post={post}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.post.posts
  };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
