import React, { useState } from "react";

import { connect } from "react-redux";
import { addComment, removeComment } from "../../actions";

const CommentForm = props => {
  const [text, setText] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    props.addComment(props.currentPost._id, { text });

    setText("");
  };

  return (
    <div className="post-comment bg-white p-1 my-1">
      <form onSubmit={onSubmit} className="post-form-display">
        <textarea
          type="text"
          name="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Say something..."
          rows="3"
          required
          autoComplete="off"
        />

        <button className="btn btn-main">Add Comment</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(
  mapStateToProps,
  { addComment, removeComment }
)(CommentForm);
