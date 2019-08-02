import { combineReducers } from "redux";

import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import alertReducer from "./alertReducer";

const reducers = combineReducers({
  auth: authReducer,
  prof: profileReducer,
  post: postReducer,
  alerts: alertReducer
});

export default reducers;
