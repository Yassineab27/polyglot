import { combineReducers } from "redux";

import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";

const reducers = combineReducers({
  auth: authReducer,
  prof: profileReducer,
  post: postReducer
});

export default reducers;
