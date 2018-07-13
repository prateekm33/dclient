import { AsyncStorage, PushNotificationIOS } from "react-native";
import loading_types from "../types/loading.types";
import error_types from "../types/error.types";
import notification_types from "../types/notification.types";
import PushNotifications from "../../utils/PushNotifications";
import { saveCustomerData } from "./customer.actions";
import Api from "../../Api";
import store from "../store";

export const dispatchErrorActionOfType = type => error => {
  console.warn(`[ERROR] - action: ${type}`);
  console.warn(error);
  return store.dispatch({ type, error });
};

export const loadDataFromStorage = () => {
  return AsyncStorage.getItem("customer").then(stored_customer => {
    if (!stored_customer) {
      // TODO...maybe consider moving asyncstorage setting and merging to reducers.
      return AsyncStorage.setItem("customer", JSON.stringify({}));
    }
    const customer = JSON.parse(stored_customer);
    Api.saveToken(customer.token);
    return customer;
  });
};

export const initAction = () => dispatch => {
  dispatch({ type: loading_types.INITIALIZING_APP, loading: true });
  PushNotifications.init(device_token => {
    dispatch(saveCustomerData({ device_token }));
  });
  PushNotificationIOS.getDeliveredNotifications(notifications => {
    dispatch(setNotifications(notifications));
  });
  return loadDataFromStorage()
    .then(Api.getCustomer)
    .then(customer => {
      if (customer) {
        dispatch(saveCustomerData({ ...customer, is_authenticated: true }));
      }
      dispatch({ type: loading_types.INITIALIZING_APP, loading: false });
      return customer;
    })
    .catch(error => {
      // TODO...maybe consider moving asyncstorage setting and merging to reducers.
      AsyncStorage.setItem("customer", JSON.stringify({}));
      dispatch({ type: loading_types.INITIALIZING_APP, loading: false });
      dispatchErrorActionOfType(error_types.APP_INITIALIZATION_ERROR)(error);
    });
};

export const setNotifications = notifications => {
  return {
    type: notification_types.SET_NOTIFICATIONS,
    notifications: [].concat(notifications)
  };
};

export const addNotifications = notifications => {
  return {
    type: notification_types.ADD_NOTIFICATIONS,
    notifications: [].concat(notifications)
  };
};
