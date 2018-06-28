import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import AppNavigator from "./src/AppNavigator";

AppRegistry.registerComponent("dclient", () => () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
));
