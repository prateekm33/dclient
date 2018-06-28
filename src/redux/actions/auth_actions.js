import Api from "../../Api";
import loading_types from "../types/loading_types";
import user_types from "../types/user_types";
import error_types from "../types/error_types";

export const submitLoginAction = credentials => {
  return dispatch => {
    dispatch({ type: loading_types.SUBMITTING_LOGIN });
    return Api.login(credentials)
      .then(user => {
        dispatch({ type: user_types.USER_LOGGED_IN, user });
      })
      .catch(error => {
        dispatch({ type: error_types.LOGIN_ERROR, error });
      });
  };
};
