import React from "react";
import { View } from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";
import store from "./redux/store";
import navigation_types from "./redux/types/navigation_types";

export const SCREEN_NAMES = {
  SplashScreen: "SplashScreen",
  LoginPage: "LoginPage",
  DealPage: "DealPage",
  DealsPage: "DealsPage",
  ProfilePage: "ProfilePage",
  RedeemPage: "RedeemPage",
  RestaurantPage: "RestaurantPage",
  RestaurantsPage: "RestaurantsPage",
  RewardPage: "RewardPage",
  RewardsPage: "RewardsPage"
};

export const INITIAL_ROUTE_NAME = SCREEN_NAMES.RedeemPage;
export const BACKLESS_ROUTES = {
  SplashScreen: true,
  LoginPage: true
};
export const BURGERLESS = {};
export const HEADERLESS_ROUTES = {
  SplashScreen: true,
  LoginPage: true
};
export const UNAUTH_ROUTES = {
  LoginPage: true,
  SplashScreen: true
};

const Screens = [
  [SCREEN_NAMES.SplashScreen, require("./Screens/SplashScreen")],
  [SCREEN_NAMES.LoginPage, require("./Screens/LoginPage")],
  [SCREEN_NAMES.DealPage, require("./Screens/DealPage")],
  [SCREEN_NAMES.DealsPage, require("./Screens/DealsPage")],
  [SCREEN_NAMES.ProfilePage, require("./Screens/ProfilePage")],
  [SCREEN_NAMES.RedeemPage, require("./Screens/RedeemPage")],
  [SCREEN_NAMES.RestaurantPage, require("./Screens/RestaurantPage")],
  [SCREEN_NAMES.RewardPage, require("./Screens/RewardPage")],
  [SCREEN_NAMES.RewardsPage, require("./Screens/RewardsPage")]
];

const SCREENS = Screens.reduce(
  (stack, screen) => ({
    [screen[0]]: props => {
      const Component = screen[1];
      Component.default.displayName = screen[0];
      store.dispatch({
        type: navigation_types.SET_CURRENT_NAVIGATION,
        navigation: props.navigation
      });

      props.navigation.resetTo = routeName => {
        const action = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName })]
        });
        props.navigation.dispatch(action);
      };

      return (
        <View>
          <Component.default {...props} />
        </View>
      );
    },
    ...stack
  }),
  {}
);

const AppNavigator = StackNavigator(SCREENS, {
  navigationOptions: {
    header: null
  },
  initialRouteName: INITIAL_ROUTE_NAME
});
export default AppNavigator;
