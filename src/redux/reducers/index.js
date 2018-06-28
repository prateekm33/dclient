import { combineReducers } from "redux";
import user_reducers from "./user_reducers";
import loading_reducers from "./loading_reducers";
import user_types from "../types/user_types";
import navigation_types from "../types/navigation_types";
import { SCREEN_NAMES } from "../../AppNavigator";

const default_reducers = {
  // currentRoute(state, action) {
  //   switch (action.type) {
  //     case navigation_types.SET_CURRENT_ROUTE:
  //       return action.route;
  //     default:
  //       return state || SCREEN_NAMES.Login;
  //   }
  // },
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
  ...user_reducers,
  ...loading_reducers
});
