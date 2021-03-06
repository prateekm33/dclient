import React from "react";
import { View } from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";
import store from "./redux/store";
import navigation_types from "./redux/types/navigation.types";

export const SCREEN_NAMES = {
  SplashScreen: "SplashScreen",
  LoginPage: "LoginPage",
  DealsPage: "DealsPage",
  ProfilePage: "ProfilePage",
  VendorsPage: "VendorsPage",
  RewardPage: "RewardPage",
  MyRewardsPage: "MyRewardsPage"
};

export const INITIAL_ROUTE_NAME = SCREEN_NAMES.SplashScreen;
export const BACKLESS_ROUTES = {
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
  [SCREEN_NAMES.DealsPage, require("./Screens/DealsPage")],
  [SCREEN_NAMES.ProfilePage, require("./Screens/ProfilePage")],
  [SCREEN_NAMES.VendorsPage, require("./Screens/VendorsPage")],
  [SCREEN_NAMES.RewardPage, require("./Screens/RewardPage")],
  [SCREEN_NAMES.MyRewardsPage, require("./Screens/MyRewardsPage")]
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
        <View style={{ flex: 1 }}>
          <Component.default
            {...props}
            mainNavigation={(props.screenProps || {}).mainNavigation}
          />
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
