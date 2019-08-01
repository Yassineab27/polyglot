const initialState = {
  posts: null,
  currentPost: null,
  alert: null
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SINGLE_POST":
      return { ...state, currentPost: action.payload };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === action.payload._id) {
            return action.payload;
          } else {
            return post;
          }
        }),
        alert: { msg: "Post updated successfully.", type: "success" }
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        alert: { msg: "Post deleted successfully.", type: "success" }
      };
    case "CREATE_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload],
        alert: { msg: "Post created successfully.", type: "success" }
      };
    case "GET_POSTS":
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};

export default postReducer;
