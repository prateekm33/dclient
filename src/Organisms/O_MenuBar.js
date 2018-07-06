import React, { Component } from "react";
import { connect } from "../redux";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import { A_Button_Opacity, A_Icon_Deal, A_Icon_Reward } from "../Atoms";

import { getResponsiveCSSFrom8 } from "../utils";
import { SCREEN_NAMES, UNAUTH_ROUTES } from "../AppNavigator";

const O_MenuBar = props => {
  return (
    <View style={props.containerStyle}>
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
    </View>
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
    this.state = {
      activeIdx: 0,
      items: this.getInitialItems()
    };
  }

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
  render() {
    const current_route = this.props.navigation.state.routeName;
    if (current_route in UNAUTH_ROUTES) return null;
    const containerStyle = [style.mainFlavorContainer];
    containerStyle.push(style.horizontalContainer);
    return (
      <O_MenuBar
        activeItem={this.state.activeIdx}
        items={this.state.items}
        containerStyle={containerStyle}
        label="main"
        onItemSelect={this.onItemSelect}
      />
    );
  }
}
O_MenuBar_Main_Pre.propTypes = {
  vertical: PropTypes.bool
};
const O_MenuBar_Main = connect(state => ({
  navigation: state.navigation
}))(O_MenuBar_Main_Pre);

const style = StyleSheet.create({
  horizontalContainer: {
    width: "100%",
    height: getResponsiveCSSFrom8(50).height,
    bottom: 0,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: getResponsiveCSSFrom8(50).height,
    borderTopWidth: 1,
    borderTopColor: "lightgrey"
  },
  menuItem: {
    flex: 1,
    alignItems: "center"
  },
  activeMenuItem: {
    borderWidth: 1.5
  },
  mainFlavorContainer: {
    position: "absolute",
    backgroundColor: "white"
  }
});

export { O_MenuBar, O_MenuBar_Main };
