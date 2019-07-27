import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { getPosts } from "../../actions";
import Loader from "../layout/Loader";
import Post from "./Post";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/auth/login" />;
    }

    if (!this.props.posts) {
      return <Loader />;
    }

    return (
      <div>
        <h1>POSTS</h1>
        {this.props.posts.map(post => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    posts: state.post.posts
  };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
