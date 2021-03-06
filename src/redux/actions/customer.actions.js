import { AsyncStorage } from "react-native";
import Api from "../../Api";
import customer_types from "../types/customer.types";
import error_types from "../types/error.types";
import loading_types from "../types/loading.types";
import { dispatchErrorActionOfType } from ".";

export const logoutAction = () => dispatch => {
  dispatch({ type: loading_types.LOGGING_OUT_CUSTOMER, loading: true });
  return Api.logout()
    .then(done => {
      dispatch({ type: loading_types.LOGGING_OUT_CUSTOMER, loading: false });
      dispatch({ type: customer_types.LOGGED_OUT_CUSTOMER });
      return done;
    })
    .catch(error => {
      dispatch({ type: loading_types.LOGGING_OUT_CUSTOMER, loading: false });
      dispatchErrorActionOfType(error_types.LOGGING_OUT_CUSTOMER_ERROR)(error);
      return false;
    });
};

export const loginAction = creds => (dispatch, getState) => {
  dispatch({ type: loading_types.LOGGING_IN_CUSTOMER, loading: true });
  return Api.loginCustomer(creds)
    .then(customer => {
      dispatch({ type: loading_types.LOGGING_IN_CUSTOMER, loading: false });
      dispatch({ type: customer_types.LOGGED_IN_CUSTOMER, customer });
      dispatch(saveCustomerData(customer));
      return Api.registerDeviceToken(getState().customer.device_token)
        .then(() => customer)
        .catch(() => {
          console.warn("-----ERROR REGISTERING DEVICE TOKEN", customer);
          return customer;
        });
    })
    .catch(error => {
      dispatch({ type: loading_types.LOGGING_IN_CUSTOMER, loading: false });
      dispatchErrorActionOfType(error_types.LOGIN_CUSTOMER_ERROR)(error);
      return false;
    });
};

export const signupAction = creds => (dispatch, getState) => {
  dispatch({ type: loading_types.SIGNING_UP_CUSTOMER, loading: true });
  return Api.signupCustomer(creds)
    .then(customer => {
      dispatch({ type: loading_types.SIGNING_UP_CUSTOMER, loading: false });
      dispatch({ type: customer_types.SIGNED_UP_CUSTOMER, customer });
      dispatch(saveCustomerData(customer));
      return Api.registerDeviceToken(getState().customer.device_token)
        .then(() => customer)
        .catch(() => {
          console.warn("-----ERROR REGISTERING DEVICE TOKEN");
          return customer;
        });
    })
    .catch(error => {
      dispatch({ type: loading_types.SIGNING_UP_CUSTOMER, loading: false });
      dispatchErrorActionOfType(error_types.SIGNUP_CUSTOMER_ERROR)(error);
      return false;
    });
};

export const saveCustomerData = customer => {
  const _customer = {
    uuid: customer.uuid,
    device_token: customer.device_token,
    email: customer.email
  };

  if (Api.token) _customer.token = Api.token;
  AsyncStorage.mergeItem("customer", JSON.stringify(_customer));
  return {
    type: customer_types.SAVE_CUSTOMER_DATA,
    customer
  };
};

export const updateCustomerAction = updates => dispatch => {
  dispatch({ type: loading_types.UPDATING_CUSTOMER, loading: true });
  return Api.updateCustomer(updates)
    .then(customer => {
      dispatch({ type: loading_types.UPDATING_CUSTOMER, loading: false });
      dispatch({ type: customer_types.SAVE_CUSTOMER_DATA, customer });
      return customer;
    })
    .catch(error => {
      dispatch({ type: loading_types.UPDATING_CUSTOMER, loading: false });
      dispatchErrorActionOfType(error_types.UPDATING_CUSTOMER_ERROR)(error);
      return false;
    });
};

export const sendPWChangeEmailAction = () => dispatch => {
  dispatch({ type: loading_types.SENDING_PW_RECOVERY_EMAIL, loading: true });
  return Api.changePasswordRequest()
    .then(() => {
      dispatch({
        type: loading_types.SENDING_PW_RECOVERY_EMAIL,
        loading: false
      });
      return true;
    })
    .catch(error => {
      dispatch({
        type: loading_types.SENDING_PW_RECOVERY_EMAIL,
        loading: false
      });
      dispatchErrorActionOfType(error_types.SENDING_PW_RECOVERY_EMAIL_ERROR)(
        error
      );
      return false;
    });
};
