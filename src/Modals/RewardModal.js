import React from "react";
import { View } from "react-native";
import { StackNavigator } from "react-navigation";

export const REWARD_MODAL_SCREEN_NAMES = {
  RewardPage: "RewardPage",
  RedeemPage: "RedeemPage"
};

export const INITIAL_ROUTE_NAME = REWARD_MODAL_SCREEN_NAMES.RewardPage;

const Screens = [
  [REWARD_MODAL_SCREEN_NAMES.RewardPage, require("./Screens/RewardPage")],
  [REWARD_MODAL_SCREEN_NAMES.RedeemPage, require("./Screens/RedeemPage")]
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

const RewardModalNavigator = StackNavigator(SCREENS, {
  navigationOptions: {
    header: null
  },
  initialRouteName: INITIAL_ROUTE_NAME
});
export default RewardModalNavigator;
