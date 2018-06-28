import React from "react";
import { View } from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";
import store from "./redux/store";
import navigation_types from "./redux/types/navigation_types";

export const SCREEN_NAMES = {
  SplashScreen: "SplashScreen",
  Login: "Login",
  Dashboard: "Dashboard",
  Favorites: "Favorites"
};

export const INITIAL_ROUTE_NAME = SCREEN_NAMES.Dashboard;
export const BACKLESS_ROUTES = {
  SplashScreen: true,
  Login: true,
  Dashboard: true
};
export const BURGERLESS = {};
export const HEADERLESS_ROUTES = {
  Dashboard: true,
  SplashScreen: true,
  Login: true
};
export const UNAUTH_ROUTES = {
  Login: true,
  SplashScreen: true
};

const Screens = [
  [SCREEN_NAMES.SplashScreen, require("./Screens/SplashScreen")],
  [SCREEN_NAMES.Login, require("./Screens/Login")],
  [SCREEN_NAMES.Dashboard, require("./Screens/Dashboard")],
  [SCREEN_NAMES.Favorites, require("./Screens/Favorites")]
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
    header: props => {
      const routes = props.navigation.state.routes;
      const curr_route = routes[routes.length - 1];
      if (curr_route in HEADERLESS_ROUTES) return null;
    }
  },
  initialRouteName: INITIAL_ROUTE_NAME
});
export default AppNavigator;
