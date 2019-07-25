import axios from "axios";
import history from "../components/history";
import setAuthorizationToken from "../utils/setAuthorizationToken";

// AUTH ACTIONS
export const authRegister = user => {
  return async dispatch => {
    try {
      await axios.post("/auth/register", user);
      dispatch({ type: "AUTH_REGISTER" });
      history.push("/auth/login");
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { msg: err.response.data.error, type: "danger" }
      });
    }
  };
};

export const removeAlert = () => {
  return { type: "REMOVE_ALERT" };
};

export const setAlert = alert => {
  return {
    type: "SET_ALERT",
    payload: { msg: alert.msg, type: alert.type }
  };
};

export const authLogin = user => {
  return async dispatch => {
    try {
      const response = await axios.post("/auth/login", user);
      dispatch({ type: "AUTH_LOGIN", payload: response.data });
      //   LOCAL STORAGE SAVE
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      //   SET TOKEN IN THE HEADER
      setAuthorizationToken(response.data.token);

      if (response.data.profile) {
        localStorage.setItem("profile", JSON.stringify(response.data.profile));
        history.push("/posts");
      } else {
        history.push("/profiles/new");
      }
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { msg: err.response.data.error, type: "danger" }
      });
    }
  };
};

export const setUser = user => {
  return { type: "SET_USER", payload: user };
};

export const setProfile = profile => {
  return { type: "SET_PROFILE", payload: profile };
};

export const logOut = () => {
  localStorage.clear();
  history.push("/auth/login");
  return { type: "LOG_OUT" };
};

// PROFILE
export const getMyProfile = () => {
  return async dispatch => {
    try {
      const response = await axios.get("/profiles/me");
      dispatch({ type: "GET_MY_PROFILE", payload: response.data });
    } catch (err) {
      dispatch({ type: "SET_ALERT", payload: err.response.data.error });
    }
  };
};
