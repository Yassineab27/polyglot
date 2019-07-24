import axios from "axios";
import history from "../components/history";

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
