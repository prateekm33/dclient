import loadingTypes from "../types/loading_types";
import { valExists } from "../../utils";

export default {
  LOADING_STATES(state, action) {
    for (let type in loadingTypes) {
      if (action.type === loadingTypes[type]) {
        return state.renew({ [loadingTypes[type]]: action.loading });
      }
    }
    return state || new AppLoadingStates();
  }
};

const initial_loading_states = (() => {
  const obj = {};
  for (let type in loadingTypes) {
    obj[loadingTypes[type]] = false;
  }

  // set any states that need to be initialized as true here
  obj[loadingTypes.INITIALIZING_APP] = true;
  return obj;
})();
class AppLoadingStates {
  static loading_states = initial_loading_states;
  constructor(defaults) {
    defaults = defaults || {};
    this.loading_states = {};
    for (let state in AppLoadingStates.loading_states) {
      if (valExists(defaults[state])) {
        this.loading_states[state] = defaults[state];
      } else
        this.loading_states[state] = AppLoadingStates.loading_states[state];
    }
  }

  renew(params) {
    return new AppLoadingStates({
      ...this.loading_states,
      ...params
    });
  }

  get(...keys) {
    return keys.map(key => this.loading_states[key]);
  }

  isLoading(...keys) {
    for (let i = 0; i < keys.length; i++) {
      if (this.loading_states[keys[i]]) return true;
    }
    return false;
  }
}
