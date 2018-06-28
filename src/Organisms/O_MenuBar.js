import React, { Component } from "react";
import { connect } from "../redux";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import { M_Searchbar_Main } from "../Molecules";
import {
  A_Button,
  A_Icon_Search,
  A_Icon_Favorites,
  A_Icon_List,
  A_Icon_Profile
} from "../Atoms";

import { getResponsiveCSSFrom8 } from "../utils";
import { SCREEN_NAMES, UNAUTH_ROUTES } from "../AppNavigator";
<M_Searchbar_Main handleSearch={this.handleSearch} />;

const O_MenuBar = props => {
  return (
    <View style={props.containerStyle}>
      {props.items.map((Item, idx) => (
        <View
          key={`menu-bar-${props.label}-item-${idx}`}
          style={[style.menuItem]}
        >
          <Item idx={idx} />
        </View>
      ))}
    </View>
  );
};
O_MenuBar.propTypes = {
  items: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired
};

class O_MenuBar_Main_Pre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIdx: null,
      menuBar: true,
      searchBar: false,
      items: this.getInitialItems()
    };
  }

  navigateToFavorites = () => {
    this.props.navigation.navigate(SCREEN_NAMES.Favorites);
  };
  navigateToAllCategories = () => {
    console.warn("-------todo...");
    this.props.navigation.navigate(SCREEN_NAMES.Favorites);
  };
  navigateToProfile = () => {
    console.warn("-------todo...");
    this.props.navigation.navigate(SCREEN_NAMES.Favorites);
  };

  getInitialItems = () => [
    () => (
      <A_Button onPress={this.displaySearchBar}>
        <A_Icon_Search />
      </A_Button>
    ),
    () => (
      <A_Button onPress={this.navigateToFavorites}>
        <A_Icon_Favorites />
      </A_Button>
    ),
    () => (
      <A_Button onPress={this.navigateToAllCategories}>
        <A_Icon_List />
      </A_Button>
    ),
    () => (
      <A_Button onPress={this.navigateToProfile}>
        <A_Icon_Profile />
      </A_Button>
    )
  ];

  handleSearch = search => {};

  displaySearchBar = () => {
    this.setState({
      items: [props => <M_Searchbar_Main handleSearch={this.handleSearch} />]
    });
  };

  render() {
    const current_route = this.props.navigation.state.routeName;
    if (current_route in UNAUTH_ROUTES) return null;
    const containerStyle = [style.mainFlavorContainer];
    containerStyle.push(style.horizontalContainer);
    return (
      <O_MenuBar
        items={this.state.items}
        containerStyle={containerStyle}
        label="main"
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
    paddingBottom: getResponsiveCSSFrom8(50).height
  },
  menuItem: {
    flex: 1,
    alignItems: "center"
  },
  mainFlavorContainer: {
    position: "absolute",
    backgroundColor: "white",
    padding: getResponsiveCSSFrom8(8).width
  }
});

export { O_MenuBar, O_MenuBar_Main };
