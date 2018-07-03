import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { APP_BACKGROUND_COLOR } from "../styles/defaults";
import { M_Header_Main } from "../Molecules";
import { O_MenuBar_Main } from "../Organisms";

export default props => (
  <View style={[style.container, props.containerStyle]}>
    {props.noHeader ? null : (
      <M_Header_Main
        title={props.title}
        leftHeaderComponent={props.leftHeaderComponent}
        rightHeaderComponent={props.rightHeaderComponent}
      />
    )}
    {props.scrollView ? (
      <ScrollView>{props.children}</ScrollView>
    ) : (
      props.children
    )}
    <O_MenuBar_Main />
  </View>
);
const style = StyleSheet.create({
  container: {
    backgroundColor: APP_BACKGROUND_COLOR,
    height: "100%",
    width: "100%"
  }
});
