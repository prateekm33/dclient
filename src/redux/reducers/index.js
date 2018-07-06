import { combineReducers } from "redux";
import loading_reducers from "./loading.reducers";
import navigation_types from "../types/navigation.types";
import customer_types from "../types/customer.types";
import customer_reducers from "./customer.reducers";
import deals_reducers from "./deals.reducers";

const default_reducers = {
  navigation(state, action) {
    switch (action.type) {
      case navigation_types.SET_CURRENT_NAVIGATION:
        return action.navigation;
      case customer_types.CUSTOMER_LOGGED_OUT:
        return null;
      default:
        return state || null;
    }
  }
};

export default combineReducers({
  ...default_reducers,
  ...loading_reducers,
  ...customer_reducers,
  ...deals_reducers
});
