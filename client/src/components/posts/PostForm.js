import React, { useState } from "react";

import { connect } from "react-redux";
import { addPost, setAlert } from "../../actions";

const PostForm = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    if (!props.hasProfile) {
      setTitle("");
      setDescription("");
      return props.setAlert({
        msg: "You need to create a profile first.",
        type: "danger"
      });
    }

    const post = {
      title,
      description,
      picture
    };
    console.log(post);
    // props.addPost(post);

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
        <label htmlFor="picture">
          Add an Image <span style={{ fontStyle: "italic" }}>(optional)</span>
        </label>
        <input
          id="picture"
          type="file"
          name="picture"
          accept="image/*"
          onChange={e => setPicture(e.target.files[0])}
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
  return { hasProfile: state.auth.hasProfile, user: state.auth.user };
};

export default connect(
  mapStateToProps,
  { addPost, setAlert }
)(PostForm);
