import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { getPosts } from "../../actions";
import Loader from "../layout/Loader";
import Post from "./PostItem";
import PostForm from "./PostForm";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    // if (!this.props.isAuthenticated) {
    //   return <Redirect to="/auth/login" />;
    // }

    if (!this.props.posts) {
      return <Loader />;
    }

    return (
      <div>
        <h1 className="large text-center main-text my-2">
          Connect with the Community <i className="fas fa-comments" />
        </h1>
        <div className="underline" style={{ background: "black" }} />
        {/* <p className="text text-center">
          'What languages are you willing to learn in 2019 ??! And how is it
          going ?'{" "}
        </p>
        <div className="community-image" /> */}
        <PostForm />
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
