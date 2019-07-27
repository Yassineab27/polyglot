const initialState = {
  posts: null,
  currentPost: null,
  alert: null
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};

export default postReducer;
