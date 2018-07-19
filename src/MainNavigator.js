import React, { Component } from "react";
import { connect } from "./redux";
import { View } from "react-native";
import { StackNavigator } from "react-navigation";
import { O_MenuBar_Main } from "chemics/Organisms";
import {
  A_Icon_Deal,
  A_Icon_Profile,
  A_Icon_Vendors,
  A_Icon_My_Rewards
} from "chemics/Atoms";
import { SCREEN_NAMES } from "./AppNavigator";
import { BOTTOM_NAV_HEIGHT } from "./styles/defaults";

export const MAIN_SCREEN_NAMES = {
  AppNavigator: "AppNavigator",
  ModalNavigator: "ModalNavigator"
};

export const INITIAL_ROUTE_NAME = MAIN_SCREEN_NAMES.AppNavigator;

const Screens = [
  [MAIN_SCREEN_NAMES.AppNavigator, require("./AppNavigator")],
  [MAIN_SCREEN_NAMES.ModalNavigator, require("./ModalNavigator")]
];

const SCREENS = Screens.reduce(
  (stack, screen) => ({
    [screen[0]]: {
      screen: props => {
        const Component = screen[1];
        const state = props.navigation.state;
        let modalInitialRouteName;
        if (state.routeName === MAIN_SCREEN_NAMES.ModalNavigator) {
          const params = state.params || {};
          modalInitialRouteName = params.routeName;
        }
        return (
          <View style={{ flex: 1 }}>
            <Component.default
              screenProps={{
                mainNavigation: props.navigation,
                modalInitialRouteName,
                params: (state.params || {}).params || {}
              }}
            />
            {screen[0] === MAIN_SCREEN_NAMES.AppNavigator && (
              <MenuBarMain mainNavigation={props.navigation} />
            )}
          </View>
        );
      }
    },
    ...stack
  }),
  {}
);

const MainNavigator = StackNavigator(SCREENS, {
  navigationOptions: {
    header: null
  },
  initialRouteName: INITIAL_ROUTE_NAME,
  mode: "modal"
});

export default MainNavigator;

class MenuBarMain_Pre extends Component {
  constructor(props) {
    super(props);
  }
  shouldGetFreshState = nextProps => {
    if (nextProps.customer.uuid !== this.props.customer.uuid) return true;
    return false;
  };

  navigateTo = idx => {
    if (idx === 0) return this.navigateToDealsPage();
    if (idx === 1) return this.navigteToVendorsPage();
    if (idx === 2) return this.navigateToMyRewardsPage();
    if (idx === 3) return this.navigateToProfilePage();
  };
  navigteToVendorsPage = () => {
    this.props.navigation.resetTo(SCREEN_NAMES.VendorsPage);
  };
  navigateToDealsPage = () => {
    this.props.navigation.resetTo(SCREEN_NAMES.DealsPage);
  };
  navigateToMyRewardsPage = () => {
    this.props.navigation.resetTo(SCREEN_NAMES.MyRewardsPage);
  };
  navigateToProfilePage = () => {
    this.props.navigation.resetTo(SCREEN_NAMES.ProfilePage);
  };

  render() {
    if (!this.props.customer || !this.props.customer.is_authenticated)
      return null;
    return (
      <O_MenuBar_Main
        items={[A_Icon_Deal, A_Icon_Vendors, A_Icon_My_Rewards, A_Icon_Profile]}
        navigateTo={this.navigateTo}
        shouldGetFreshState={this.shouldGetFreshState}
        plain={true}
        activeContainerStyles={{ height: BOTTOM_NAV_HEIGHT }}
      />
    );
  }
}

const MenuBarMain = connect(state => ({
  navigation: state.navigation,
  customer: state.customer
}))(MenuBarMain_Pre);
