import React from "react";
import { View, StyleSheet } from "react-native";

const A_ListContainer = props => {
  return (
    <View style={[style.listContainer, props.listContainerStyle]}>
      {props.children}
    </View>
  );
};

export { A_ListContainer };

const style = StyleSheet.create({
  listContainer: {}
});
