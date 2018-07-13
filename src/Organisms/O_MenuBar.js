import React, { Component } from "react";
import { connect } from "../redux";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";

import { A_Button_Opacity, A_Icon_Deal, A_Icon_Reward, A_View } from "../Atoms";

import { getResponsiveCSSFrom8 } from "../utils";
import { SCREEN_NAMES, UNAUTH_ROUTES } from "../AppNavigator";

const O_MenuBar = props => {
  return (
    <A_View style={props.containerStyle}>
      {props.items.map((Item, idx) => (
        <A_Button_Opacity
          onPress={() => props.onItemSelect(idx, Item)}
          key={`menu-bar-${props.label}-item-${idx}`}
          style={[
            style.menuItem,
            props.activeItem === idx && style.activeMenuItem
          ]}
        >
          <Item idx={idx} />
        </A_Button_Opacity>
      ))}
    </A_View>
  );
};
O_MenuBar.propTypes = {
  items: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired
};

class O_MenuBar_Main_Pre extends Component {
  constructor(props) {
    super(props);
    this.state = this.getFreshState();
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.customer.uuid !== this.props.customer.uuid) {
      this.setState(this.getFreshState());
    }
  };
  getFreshState = () => {
    return {
      activeIdx: 0,
      items: this.getInitialItems(),
      menu_inactive: true
    };
  };

  getInitialItems = () => [A_Icon_Deal, A_Icon_Reward];

  setActiveIdx = idx => {
    if (this.state.activeIdx === idx) return;
    this.setState({ activeIdx: idx });
  };
  navigateToDealsPage = () => {
    this.setActiveIdx(0);
    this.props.navigation.resetTo(SCREEN_NAMES.DealsPage);
  };
  navigateToRewardsPage = () => {
    this.setActiveIdx(1);
    this.props.navigation.resetTo(SCREEN_NAMES.RewardsPage);
  };

  onItemSelect = idx => {
    if (idx === 0) return this.navigateToDealsPage();
    if (idx === 1) return this.navigateToRewardsPage();
  };

  toggleMenu = () => {
    this.setState({ menu_inactive: !this.state.menu_inactive });
  };
  render() {
    const current_route = this.props.navigation.state.routeName;
    if (current_route in UNAUTH_ROUTES) return null;
    return (
      <A_View
        style={[
          style.peekabooContainer,
          !this.state.menu_inactive && style.activeContainer
        ]}
      >
        <A_Button_Opacity
          style={style.containerHandleBar}
          onPress={this.toggleMenu}
        />
        {!this.state.menu_inactive && (
          <O_MenuBar
            activeItem={this.state.activeIdx}
            items={this.state.items}
            containerStyle={[style.mainContainerStyle]}
            label="main"
            onItemSelect={this.onItemSelect}
          />
        )}
      </A_View>
    );
  }
}
O_MenuBar_Main_Pre.propTypes = {
  vertical: PropTypes.bool
};
const O_MenuBar_Main = connect(state => ({
  navigation: state.navigation,
  customer: state.customer
}))(O_MenuBar_Main_Pre);

const style = StyleSheet.create({
  peekabooContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: getResponsiveCSSFrom8(30).width,
    backgroundColor: "white",
    borderTopWidth: 0.5,
    borderTopColor: "#bdbdbd",
    shadowRadius: getResponsiveCSSFrom8(3).width,
    shadowOffset: {
      width: 0,
      height: getResponsiveCSSFrom8(-2).height
    },
    shadowColor: "lightgrey",
    shadowOpacity: 1
  },

  containerHandleBar: {
    width: getResponsiveCSSFrom8(50).width,
    height: getResponsiveCSSFrom8(10).height,
    backgroundColor: "grey",
    marginTop: getResponsiveCSSFrom8(5).height,
    alignSelf: "center",
    borderRadius: getResponsiveCSSFrom8(5).width,
    marginBottom: getResponsiveCSSFrom8(10).height
  },
  activeContainer: {
    height: getResponsiveCSSFrom8(80).width
  },
  mainContainerStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  }
});

export { O_MenuBar, O_MenuBar_Main };
