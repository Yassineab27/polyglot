import axios from "axios";
import history from "../components/history";
import setAuthorizationToken from "../utils/setAuthorizationToken";

// AUTH ACTIONS
export const authRegister = user => {
  return async dispatch => {
    try {
      await axios.post("/auth/register", user);
      dispatch({
        type: "SET_ALERT",
        payload: {
          msg: "Registered successfully. Please Login!",
          type: "success"
        }
      });
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
      dispatch({
        type: "SET_ALERT",
        payload: {
          msg: `Hello, ${response.data.user.firstName} ${
            response.data.user.lastName
          }, You were logged in successfully!`,
          type: "success"
        }
      });
      dispatch({ type: "AUTH_LOGIN", payload: response.data });
      //   LOCAL STORAGE SAVE
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      //   SET TOKEN IN THE HEADER
      setAuthorizationToken(response.data.token);

      if (!response.data.profile) {
        history.push("/profiles/new");
      } else {
        localStorage.setItem("hasProfile", JSON.stringify(true));
        history.push("/posts");
      }
    } catch (err) {
      dispatch(setAlert({ msg: err.response.data.error, type: "danger" }));
    }
  };
};

export const updateUser = (user, avatar) => {
  return async dispatch => {
    if (!avatar) {
      const response = await axios.patch("/users/me", user);

      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch(setUser(response.data));
      history.push("/users/me");
    } else {
      // if avatar is true
      dispatch(
        setAlert({
          msg: "Your profile picture is being updated. Please wait...",
          type: "success"
        })
      );
      const uploadConfig = await axios.get("/uploads");
      delete axios.defaults.headers.common["Authorization"];
      await axios.put(uploadConfig.data.url, avatar, {
        headers: {
          "Content-Type": avatar.type
        }
      });
      setAuthorizationToken(localStorage.getItem("token"));

      // Adding avatar to the user
      const response = await axios.patch("/users/me", {
        ...user,
        avatar: uploadConfig.data.key
      });

      localStorage.setItem("user", JSON.stringify(response.data));

      dispatch(setUser(response.data));
      history.push("/users/me");
    }
  };
};

export const deleteUser = () => {
  return async dispatch => {
    try {
      await axios.delete("/users/me");
      localStorage.clear();
      dispatch(setAlert({ msg: "User deleted Successfuly.", type: "success" }));
      dispatch(resetUserState());
      history.push("/auth/register");
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { msg: err.response.data.error, type: "danger" }
      });
    }
  };
};

export const logOut = () => {
  localStorage.clear();
  history.push("/auth/login");
  return { type: "RESET_USER_STATE" };
};

export const setUser = user => {
  return { type: "SET_USER", payload: user };
};

export const setProfile = () => {
  return { type: "SET_PROFILE" };
};

export const resetUserState = () => {
  return { type: "RESET_USER_STATE" };
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
      history.push("/auth/login");
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
      dispatch({
        type: "SET_ALERT",
        payload: {
          msg: "Your profile was created successfully.",
          type: "success"
        }
      });
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
      history.push("/profiles");
    }
  };
};

export const updateProfile = newPorfile => {
  return async dispatch => {
    try {
      const response = await axios.patch("/profiles/me", newPorfile);
      dispatch({ type: "UPDATE_PROFILE", payload: response.data });
      dispatch({
        type: "SET_ALERT",
        payload: {
          msg: "Your profile was updated successfully.",
          type: "success"
        }
      });
      history.push("/profiles/me");
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { msg: err.response.data.error, type: "danger" }
      });
    }
  };
};

const resetState = () => {
  return { type: "RESET_PROFILE_STATE" };
};

// POSTS
export const getPosts = () => {
  return async dispatch => {
    try {
      // dispatch(resetPostState());
      const response = await axios.get("/posts");
      dispatch({ type: "GET_POSTS", payload: response.data });
    } catch (err) {
      history.push("/auth/login");
    }
  };
};

export const addPost = (post, picture) => {
  return async dispatch => {
    try {
      if (picture) {
        const uploadConfig = await axios.get("/uploads");
        delete axios.defaults.headers.common["Authorization"];
        await axios.put(uploadConfig.data.url, picture, {
          headers: {
            "Content-Type": picture.type
          }
        });
        setAuthorizationToken(localStorage.getItem("token"));

        await axios.post("/posts", { ...post, picture: uploadConfig.data.key });
        dispatch(getPosts());
        dispatch({
          type: "SET_ALERT",
          payload: { msg: "Post created successfully.", type: "success" }
        });
      } else {
        await axios.post("/posts", post);
        dispatch(getPosts());
        dispatch({
          type: "SET_ALERT",
          payload: { msg: "Post created successfully.", type: "success" }
        });
        // dispatch({ type: "CREATE_POST", payload: response.data });
      }
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { msg: err.response.data.error, type: "danger" }
      });
    }
  };
};

export const deletePost = id => {
  return async dispatch => {
    try {
      await axios.delete(`/posts/${id}`);
      dispatch({ type: "DELETE_POST", payload: id });
      dispatch({
        type: "SET_ALERT",
        payload: { msg: "Post deleted successfully.", type: "success" }
      });
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { msg: err.response.data.error, type: "danger" }
      });
    }
  };
};

export const getPost = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/posts/${id}`);
      dispatch({ type: "GET_SINGLE_POST", payload: response.data });
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { msg: err.response.data.error, type: "danger" }
      });
    }
  };
};

export const likePost = postId => {
  return async dispatch => {
    try {
      const response = await axios.patch(`/posts/like/${postId}`);

      dispatch({ type: "LIKE_POST", payload: response.data });
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { msg: err.response.data.error, type: "danger" }
      });
    }
  };
};

export const dislikePost = postId => {
  return async dispatch => {
    try {
      const response = await axios.patch(`/posts/dislike/${postId}`);

      dispatch({ type: "DISLIKE_POST", payload: response.data });
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { msg: err.response.data.error, type: "danger" }
      });
    }
  };
};

export const addComment = (postId, comment) => {
  return async dispatch => {
    try {
      const response = await axios.patch(`/posts/comment/${postId}`, comment);
      dispatch({ type: "ADD_COMMENT", payload: response.data });
      dispatch({
        type: "SET_ALERT",
        payload: { msg: "Comment Added.", type: "success" }
      });
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { msg: err.response.data.err, type: "danger" }
      });
    }
  };
};

export const removeComment = (postId, commentId) => {
  return async dispatch => {
    try {
      const response = await axios.delete(
        `/posts/comment/${postId}/${commentId}`
      );
      dispatch({ type: "REMOVE_COMMENT", payload: response.data });
      dispatch({
        type: "SET_ALERT",
        payload: { msg: "Comment Deleted.", type: "success" }
      });
    } catch (err) {
      dispatch({
        type: "SET_ALERT",
        payload: { msg: err.response.data.err, type: "danger" }
      });
    }
  };
};

export const setCurrentPost = postId => {
  return { type: "SET_CURRENT_POST", payload: postId };
};

export const resetPostState = () => {
  return { type: "RESET_POST_STATE" };
};
