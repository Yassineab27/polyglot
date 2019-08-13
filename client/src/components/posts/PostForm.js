import React, { useState } from "react";

import { connect } from "react-redux";
import { addPost, setAlert } from "../../actions";

import history from "../history";

const PostForm = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    if (!props.hasProfile) {
      setTitle("");
      setDescription("");
      history.push("/profiles/new");
      return props.setAlert({
        msg: "You need to create a profile first.",
        type: "danger"
      });
    }
    if (!props.user.avatar) {
      setTitle("");
      setDescription("");
      history.push("/users/me");
      return props.setAlert({
        msg: "Please upload your profile picture.",
        type: "danger"
      });
    }

    const post = {
      title,
      description
    };

    props.addPost(post, picture);

    setTitle("");
    setDescription("");
  };

  const { user } = props;

  return (
    <div className="post-form bg-white p-1 my-1">
      <div className="text-center">
        <img
          src={
            user.avatar
              ? `https://social-network-polyglot.s3.eu-west-3.amazonaws.com/${
                  user.avatar
                }`
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt={user.firstName}
          className="image-round"
          style={{ height: "150px", width: "150px" }}
        />
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
        <small className="danger-text">
          *uploading an image may take few seconds, please wait.
        </small>
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
