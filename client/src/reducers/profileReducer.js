const initialState = {
  profileInfo: null,
  profiles: null,
  search: ""
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE":
      return {
        ...state,
        profileInfo: { ...state.profileInfo, profile: action.payload }
      };
    case "GET_RANDOM_PROFILE":
      return { ...state, profileInfo: action.payload };
    case "CREATE_PROFILE":
      return {
        ...state,
        profileInfo: { profile: action.payload, posts: [] }
      };
    case "SEARCH_PAL":
      return { ...state, search: action.payload };
    case "GET_ALL_PROFILES":
      return { ...state, profiles: action.payload };
    case "GET_MY_PROFILE":
      return { ...state, profileInfo: action.payload };
    case "RESET_PROFILE_STATE":
      return { profileInfo: null, profiles: null, search: "" };
    default:
      return state;
  }
};

export default profileReducer;
