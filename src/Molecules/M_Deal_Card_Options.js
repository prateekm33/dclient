import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import { A_Icon_Delete, A_Icon_Pause, A_Icon_View } from "../Atoms";
import { SCREEN_NAMES } from "../AppNavigator";
import { getResponsiveCSSFrom8 } from "../utils";

class M_Deal_Card_Options_Pre extends Component {
  constructor(props) {
    super(props);
  }

  viewDeal = () => {
    this.props.navigation.navigate(SCREEN_NAMES.DealPage, {
      deal: this.props.deal
    });
  };

  deleteDeal = () => {
    console.warn("----TODO...delete deal...");
  };

  pauseDeal = () => console.warn("------TODO...pause deal...");

  render() {
    return (
      <View style={style.cardOptionsContainerStyle}>
        <A_Icon_View
          onPress={this.viewDeal}
          style={style.cardOptionsIconStyle}
        />
        <A_Icon_Delete
          onPress={this.deleteDeal}
          style={style.cardOptionsIconStyle}
        />
        <A_Icon_Pause
          onPress={this.pauseDeal}
          style={style.cardOptionsIconStyle}
        />
      </View>
    );
  }
}
const M_Deal_Card_Options = withNavigation(M_Deal_Card_Options_Pre);

class M_Reward_Card_Options_Pre extends Component {
  constructor(props) {
    super(props);
  }

  viewReward = () => {
    this.props.navigation.navigate(SCREEN_NAMES.RewardPage, {
      reward: this.props.reward
    });
  };

  deleteReward = () => {
    console.warn("----TODO...delete loyalty reward...");
  };

  pauseReward = () => console.warn("------TODO...pause loyalty reward...");

  render() {
    return (
      <View style={style.cardOptionsContainerStyle}>
        <A_Icon_View
          onPress={this.viewReward}
          style={style.cardOptionsIconStyle}
        />
        <A_Icon_Delete
          onPress={this.deleteReward}
          style={style.cardOptionsIconStyle}
        />
        <A_Icon_Pause
          onPress={this.pauseReward}
          style={style.cardOptionsIconStyle}
        />
      </View>
    );
  }
}
const M_Reward_Card_Options = withNavigation(M_Reward_Card_Options_Pre);

export { M_Deal_Card_Options, M_Reward_Card_Options };

const style = StyleSheet.create({
  cardOptionsContainerStyle: { flexDirection: "row", flexWrap: "nowrap" },
  cardOptionsIconStyle: {
    width: getResponsiveCSSFrom8(10).width,
    height: getResponsiveCSSFrom8(10).height
  }
});
