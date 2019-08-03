const initialState = {
  posts: null,
  currentPost: null
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DISLIKE_POST":
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === action.payload._id) {
            return action.payload;
          } else {
            return post;
          }
        })
      };
    case "LIKE_POST":
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === action.payload._id) {
            return action.payload;
          } else {
            return post;
          }
        })
      };
    case "GET_SINGLE_POST":
      return { ...state, currentPost: action.payload };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    // case "CREATE_POST":
    //   return {
    //     ...state,
    //     posts: [action.payload, ...state.posts]
    //   };
    case "GET_POSTS":
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};

export default postReducer;
