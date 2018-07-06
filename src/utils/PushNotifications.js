import PushNotifications from "react-native-push-notification";
import { PushNotificationIOS } from "react-native";
import store from "../redux/store";
import { addNotifications } from "../redux/actions";

const init = registerCallback =>
  PushNotifications.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
      registerCallback(token.token);
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      store.dispatch(addNotifications(notification));
      // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
      notification.finish(PushNotificationIOS.FetchResult.NewData);
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true
  });

PushNotifications.init = init;

export default PushNotifications;
