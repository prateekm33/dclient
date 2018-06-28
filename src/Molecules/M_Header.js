import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { A_Text } from "../Atoms";
import { getResponsiveCSSFrom8 } from "../utils";

const M_Header = props => {
  return (
    <View style={[style.header, props.headerContainerStyle]}>
      {props.StatusBar && <props.StatusBar />}
      <A_Text
        strong
        style={[style.headerTitleText, props.headerTitleTextStyle]}
      >
        {props.title}
      </A_Text>
    </View>
  );
};

const M_Header_Main = props => (
  <View style={style.headerMainContainerStyle}>
    <StatusBar barStyle="light-content" />
    <A_Text strong style={style.headerMainTitleTextStyle}>
      {props.title}
    </A_Text>
  </View>
);

export { M_Header, M_Header_Main };

const style = StyleSheet.create({
  header: {},
  headerTitleText: {},
  headerMainContainerStyle: {
    height: getResponsiveCSSFrom8(70).height,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey"
  },
  headerMainTitleTextStyle: {
    color: "white"
  }
});
