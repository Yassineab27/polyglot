import { combineReducers } from "redux";

import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

const reducers = combineReducers({
  auth: authReducer,
  prof: profileReducer
});

export default reducers;
