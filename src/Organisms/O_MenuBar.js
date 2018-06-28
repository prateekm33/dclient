import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import { M_Searchbar_Main } from "../Molecules";
import { A_Button, A_Icon_Search, A_Icon_Favorites } from "../Atoms";

import { getResponsiveCSSFrom8 } from "../utils";
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

class O_MenuBar_Main extends Component {
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
    // this.props.navigation.navigate()
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
    )
  ];

  handleSearch = search => {};

  displaySearchBar = () => {
    this.setState({
      items: [props => <M_Searchbar_Main handleSearch={this.handleSearch} />]
    });
  };

  render() {
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
O_MenuBar_Main.propTypes = {
  vertical: PropTypes.bool
};

const style = StyleSheet.create({
  horizontalContainer: {
    width: "95%",
    height: getResponsiveCSSFrom8(50).height,
    bottom: getResponsiveCSSFrom8(10).height,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  menuItem: {
    flex: 1
  },
  mainFlavorContainer: {
    position: "absolute",
    backgroundColor: "white",
    padding: getResponsiveCSSFrom8(8).width
  }
});

export { O_MenuBar, O_MenuBar_Main };
