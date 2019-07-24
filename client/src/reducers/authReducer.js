const initialState = {
  user: null,
  isAuthenticated: false,
  alert: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case "AUTH_LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        alert: { msg: "You were logged in successfully!", type: "success" }
      };
    default:
      return state;
  }
};

export default authReducer;
