import { combineReducers } from "redux";
import loading_reducers from "./loading_reducers";
import navigation_types from "../types/navigation_types";
import user_types from "../types/user_types";

const default_reducers = {
  navigation(state, action) {
    switch (action.type) {
      case navigation_types.SET_CURRENT_NAVIGATION:
        return action.navigation;
      case user_types.USER_LOGGED_OUT:
        return null;
      default:
        return state || null;
    }
  }
};

export default combineReducers({
  ...default_reducers,
  ...loading_reducers
});
