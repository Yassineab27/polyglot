const initialState = {
  user: null,
  profile: null,
  isAuthenticated: false,
  alert: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return { ...state, profile: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "AUTH_LOGIN":
      return {
        ...state,
        user: action.payload.user,
        profile: action.payload.profile,
        token: action.payload.token,
        isAuthenticated: true,
        alert: {
          msg: `Hello, ${action.payload.user.firstName} ${
            action.payload.user.lastName
          }, you were logged in successfully!`,
          type: "success"
        }
      };
    case "REMOVE_ALERT":
      return { ...state, alert: null };
    case "SET_ALERT":
      return { ...state, alert: action.payload };
    case "AUTH_REGISTER":
      return {
        ...state,
        alert: {
          msg: "Registered successfully. Please Login!",
          type: "success"
        }
      };
    default:
      return state;
  }
};

export default authReducer;
