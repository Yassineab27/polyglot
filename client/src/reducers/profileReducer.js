const initialState = {
  profileInfo: null,
  profiles: null,
  search: "",
  alert: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_PAL":
      return { ...state, search: action.payload };
    case "GET_ALL_PROFILES":
      return { ...state, profiles: action.payload };
    case "GET_MY_PROFILE":
      return { ...state, profileInfo: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
