import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { APP_BACKGROUND_COLOR } from "../styles/defaults";

export default props => <View style={style.container}>{props.children}</View>;
const style = StyleSheet.create({
  container: {
    backgroundColor: APP_BACKGROUND_COLOR,
    height: "100%",
    width: "100%"
  }
});
