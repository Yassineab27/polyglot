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
        localStorage.setItem("hasProfile", JSON.stringify(true));
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

export const setProfile = () => {
  return { type: "SET_PROFILE" };
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
      dispatch(resetState());
      const response = await axios.get("/profiles/me");
      dispatch({ type: "GET_MY_PROFILE", payload: response.data });
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { msg: err.response.data.error, type: "danger" }
      });
      history.push("/auth/login");
    }
  };
};

export const getAllProfiles = () => {
  return async dispatch => {
    try {
      const response = await axios.get("/profiles");
      dispatch({ type: "GET_ALL_PROFILES", payload: response.data });
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { msg: err.response.data.error, type: "danger" }
      });
    }
  };
};

export const searchPal = search => {
  return { type: "SEARCH_PAL", payload: search };
};

export const createProfile = profile => {
  return async dispatch => {
    try {
      const response = await axios.post("/profiles/new", profile);
      localStorage.setItem("hasProfile", JSON.stringify(true));
      dispatch({ type: "CREATE_PROFILE", payload: response.data });
      dispatch(setProfile());
      history.push("/profiles/me");
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { msg: err.response.data.error, type: "danger" }
      });
    }
  };
};

export const getRandomProfile = userId => {
  return async dispatch => {
    try {
      dispatch(resetState());
      const response = await axios.get(`/profiles/user/${userId}`);
      dispatch({ type: "GET_RANDOM_PROFILE", payload: response.data });
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { msg: err.response.data.error, type: "danger" }
      });
    }
  };
};

const resetState = () => {
  return { type: "RESET_STATE" };
};

// POSTS
export const getPosts = () => {
  return async dispatch => {
    try {
      const response = await axios.get("/posts");
      dispatch({ type: "GET_POSTS", payload: response.data });
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { msg: err.response.data.error, type: "danger" }
      });
    }
  };
};
