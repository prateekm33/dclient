import React from "react";
import { View, StyleSheet } from "react-native";
import { A_Text, A_Image } from "../Atoms";

const M_ListItem = props => {
  return (
    <View style={[style.listItemStyle, props.listItemStyle]}>
      {props.source && <A_Image source={props.source} />}
      <View>
        <A_Text>{props.title}</A_Text>
        <A_Text>{props.desc}</A_Text>
      </View>
      {props.children}
    </View>
  );
};

const M_ListItem_Restaurant = props => {
  return (
    <M_ListItem {...props}>
      {/* anything specific to restaurants goes here */}
    </M_ListItem>
  );
};

export { M_ListItem, M_ListItem_Restaurant };

const style = StyleSheet.create({
  listItemStyle: {}
});
