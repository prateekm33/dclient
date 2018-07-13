import React from "react";
import { View } from "react-native";
import { StackNavigator } from "react-navigation";

export const SCAN_MODAL_SCREEN_NAMES = {
  RedeemPage: "RedeemPage"
};

export const INITIAL_ROUTE_NAME = SCAN_MODAL_SCREEN_NAMES.RedeemPage;

const Screens = [
  [SCAN_MODAL_SCREEN_NAMES.RedeemPage, require("./Screens/RedeemPage")]
];

const SCREENS = Screens.reduce(
  (stack, screen) => ({
    [screen[0]]: {
      screen: props => {
        const Component = screen[1];
        Component.default.displayName = screen[0];

        return (
          <View style={{ flex: 1 }}>
            <Component.default {...props} />
          </View>
        );
      }
    },
    ...stack
  }),
  {}
);

const ScanModalNavigator = StackNavigator(SCREENS, {
  navigationOptions: {
    header: null
  },
  initialRouteName: INITIAL_ROUTE_NAME
});
export default ScanModalNavigator;
