import React from "react";
import { View } from "react-native";
import { StackNavigator } from "react-navigation";

export const VENDOR_MODAL_SCREEN_NAMES = {
  VendorPage: "VendorPage",
  DealPage: "DealPage",
  RewardPage: "RewardPage"
};

export const INITIAL_ROUTE_NAME = VENDOR_MODAL_SCREEN_NAMES.VendorPage;

const Screens = [
  [VENDOR_MODAL_SCREEN_NAMES.VendorPage, require("./Screens/VendorPage")],
  [VENDOR_MODAL_SCREEN_NAMES.DealPage, require("./Screens/DealPage")],
  [VENDOR_MODAL_SCREEN_NAMES.RewardPage, require("./Screens/RewardPage")]
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

const VendorModalNavigator = StackNavigator(SCREENS, {
  navigationOptions: {
    header: null
  },
  initialRouteName: INITIAL_ROUTE_NAME
});
export default VendorModalNavigator;
