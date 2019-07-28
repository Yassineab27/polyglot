const initialState = {
  profileInfo: null,
  profiles: null,
  search: "",
  alert: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RANDOM_PROFILE":
      return { ...state, profileInfo: action.payload };
    case "CREATE_PROFILE":
      return {
        ...state,
        profileInfo: { profile: action.payload, posts: [] },
        alert: {
          msg: "Your profile was created successfully.",
          type: "success"
        }
      };
    case "SEARCH_PAL":
      return { ...state, search: action.payload };
    case "GET_ALL_PROFILES":
      return { ...state, profiles: action.payload };
    case "GET_MY_PROFILE":
      return { ...state, profileInfo: action.payload };
    case "RESET_STATE":
      return { profileInfo: null, profiles: null, search: "", alert: null };
    default:
      return state;
  }
};

export default profileReducer;
