import React, { Component } from "react";
import { connect } from "../redux";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import { M_Searchbar_Main } from "../Molecules";
import {
  A_Button,
  A_Icon_Map,
  A_Icon_Favorites,
  A_Icon_List,
  A_Icon_Profile,
  A_Button_Opacity
} from "../Atoms";

import { getResponsiveCSSFrom8 } from "../utils";
import { SCREEN_NAMES, UNAUTH_ROUTES } from "../AppNavigator";
<M_Searchbar_Main handleSearch={this.handleSearch} />;

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
      menuBar: true,
      searchBar: false,
      items: this.getInitialItems()
    };
  }

  getInitialItems = () => [
    A_Icon_Map,
    A_Icon_Favorites,
    A_Icon_List,
    A_Icon_Profile
  ];
  navigateToMap = () => {
    this.setState({ activeIdx: 0 });
    this.props.navigation.resetTo(SCREEN_NAMES.DashboardMapPage);
  };

  navigateToFavorites = () => {
    this.setState({ activeIdx: 1 });
    this.props.navigation.resetTo(SCREEN_NAMES.FavoritesPage);
  };
  navigateToAllCategories = () => {
    this.setState({ activeIdx: 2 });
    console.warn("-------todo...");
    this.props.navigation.resetTo(SCREEN_NAMES.CategoriesPage);
  };
  navigateToProfile = () => {
    this.setState({ activeIdx: 3 });
    console.warn("-------todo...");
    this.props.navigation.resetTo(SCREEN_NAMES.ProfilePage);
  };

  onItemSelect = idx => {
    if (idx === 0) return this.navigateToMap();
    if (idx === 1) return this.navigateToFavorites();
    if (idx === 2) return this.navigateToAllCategories();
    if (idx === 3) return this.navigateToProfile();
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
