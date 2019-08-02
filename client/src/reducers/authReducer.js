const initialState = {
  user: null,
  hasProfile: null,
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_OUT":
      return { user: null, profile: null, isAuthenticated: false };
    case "SET_PROFILE":
      return { ...state, hasProfile: true };
    case "SET_USER":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "AUTH_LOGIN":
      return {
        user: action.payload.user,
        hasProfile: action.payload.profile,
        isAuthenticated: true
      };
    case "AUTH_REGISTER":
      return {
        ...state
      };
    default:
      return state;
  }
};

export default authReducer;
