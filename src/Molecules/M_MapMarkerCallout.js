import React from "react";
import { View, StyleSheet } from "react-native";
import { Callout } from "react-native-maps";
import { A_Text } from "../Atoms";

const M_MapMarkerCallout = props => {
  return (
    <Callout>
      <View style={[style.generalContainer, props.containerStyle]}>
        <View>
          <A_Text>{props.title}</A_Text>
        </View>
        <View>
          <A_Text>{props.description}</A_Text>
        </View>
      </View>
    </Callout>
  );
};
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
  generalContainer: {},
  restaurantContainer: {}
});
