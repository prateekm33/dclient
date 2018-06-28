import { combineReducers } from "redux";
import user_reducers from "./user_reducers";
import loading_reducers from "./loading_reducers";

const default_reducers = {};

export default combineReducers({
  ...default_reducers,
  ...user_reducers,
  ...loading_reducers
});
