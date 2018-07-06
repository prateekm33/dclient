import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { A_Icon_Close } from "../Atoms";

export const O_Modal = props => {
  if (!props.show) return null;
  return (
    <View style={style.modalOuterContainer}>
      <View stlye={style.modalHeaderStyle}>
        <A_Icon_Close onPress={props.close} />
      </View>
      <View style={style.modalContentContainer}>{props.children}</View>
    </View>
  );
};

const style = StyleSheet.create({
  modalOuterContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white"
  },
  modalHeaderStyle: {
    flex: 0.3,
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  modalContentContainer: {
    flex: 0.7
  }
});
