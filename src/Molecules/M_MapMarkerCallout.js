import React from "react";
import { View, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import { Callout } from "react-native-maps";
import { A_Text, A_Button_Opacity, A_View } from "chemics/Atoms";
import { getResponsiveCSSFrom8 } from "../utils";
import { SCREEN_NAMES } from "../AppNavigator";

const M_MapMarkerCallout = withNavigation(props => {
  return (
    <Callout>
      <A_Button_Opacity
        style={[style.generalContainer, props.containerStyle]}
        onPress={() => props.onPress(props.vendor)}
      >
        <A_View>
          <A_Text strong style={{ fontSize: getResponsiveCSSFrom8(20).height }}>
            {props.vendor.name}
          </A_Text>
          <A_Text strong style={{ fontSize: getResponsiveCSSFrom8(18).height }}>
            {props.vendor.name}
          </A_Text>
          <A_Text style={{ fontSize: getResponsiveCSSFrom8(15).height }}>
            {props.vendor.address}
          </A_Text>
        </A_View>
      </A_Button_Opacity>
    </Callout>
  );
});
M_MapMarkerCallout.propTypes = {
  ...Callout.propTypes
};
const M_MapMarkerCallout_Restaurant = props => {
  return (
    <M_MapMarkerCallout {...props} containerStyle={style.restaurantContainer} />
  );
};

export { M_MapMarkerCallout, M_MapMarkerCallout_Restaurant };

const style = StyleSheet.create({
  generalContainer: {
    backgroundColor: "white",
    width: getResponsiveCSSFrom8(250).width,
    height: getResponsiveCSSFrom8(80).height
  },
  restaurantContainer: {}
});
