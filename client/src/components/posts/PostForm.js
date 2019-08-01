import React, { useState } from "react";

import { connect } from "react-redux";
import { addPost } from "../../actions";

const PostForm = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    const post = {
      title,
      description
    };
    console.log(post);

    setTitle("");
    setDescription("");
  };

  const { user } = props;

  return (
    <div className="post-form bg-white p-1 my-1">
      <div className="text-center">
        <img src={user.avatar} alt={user.firstName} className="image-round" />
      </div>
      <form onSubmit={onSubmit} className="post-form-display">
        <input
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          required
          autoComplete="off"
        />
        <textarea
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          cols="30"
          rows="5"
          placeholder="Description..."
          required
        />
        <button className="btn btn-main">Create Post</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
