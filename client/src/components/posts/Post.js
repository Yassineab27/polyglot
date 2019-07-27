import React from "react";

const Post = props => {
  return (
    <div>
      <h2>{props.post.title}</h2>
      <h4>{props.post.description}</h4>
    </div>
  );
};

export default Post;
