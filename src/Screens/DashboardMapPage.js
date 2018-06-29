import React, { Component } from "react";
import { StyleSheet } from "react-native";
import ScreenContainer from "../Templates/ScreenContainer";
import { O_Map } from "../Organisms";
import { M_TabSelect_Pill } from "../Molecules";
import { A_Icon } from "../Atoms";
import { getResponsiveCSSFrom8 } from "../utils";

class DashboardMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map_flavor: "all",
      activeIdx: 0
    };
  }

  showAllMap = () => this.setState({ map_flavor: "all", activeIdx: 0 });
  showSavedMap = () => this.setState({ map_flavor: "saved", activeIdx: 1 });
  showFavoritesMap = () =>
    this.setState({ map_flavor: "favorites", activeIdx: 2 });

  onTabSelect = idx => {
    if (idx === 0) return this.showAllMap();
    else if (idx === 1) return this.showSavedMap();
    else if (idx === 2) return this.showFavoritesMap();
  };

  render() {
    return (
      <ScreenContainer noHeader={true}>
        <O_Map flavor={this.state.map_flavor} />
        <M_TabSelect_Pill
          label="dashboard-map"
          activeTab={this.state.activeIdx}
          tabs={[
            <A_Icon
              source={require("../assets/global_icon.png")}
              style={style.tabIconStyle}
            />,
            <A_Icon
              source={require("../assets/todo_icon.png")}
              style={style.tabIconStyle}
            />,
            <A_Icon
              source={require("../assets/favorites_icon.png")}
              style={style.tabIconStyle}
            />
          ]}
          containerStyle={style.tabContainerStyle}
          itemContainerStyle={style.tabItemContainerStyle}
          onTabSelect={this.onTabSelect}
        />
      </ScreenContainer>
    );
  }
}

const style = StyleSheet.create({
  tabContainerStyle: {
    alignSelf: "center",
    backgroundColor: "white",
    marginTop: getResponsiveCSSFrom8(10).height,
    borderWidth: 0.5,
    position: "absolute",
    top: getResponsiveCSSFrom8(10).height
  },
  tabIconStyle: {
    width: getResponsiveCSSFrom8(30).width,
    height: getResponsiveCSSFrom8(30).width
  },
  tabItemContainerStyle: {
    borderWidth: 0.5,
    padding: getResponsiveCSSFrom8(5).width
  }
});

export default DashboardMap;
