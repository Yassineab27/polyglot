const initialState = {
  profileInfo: null,
  profiles: null,
  alert: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MY_PROFILE":
      return { ...state, profileInfo: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
