import React from "react";
import { View, StyleSheet } from "react-native";
import { A_Text } from "chemics/Atoms";

const M_Stat = props => {
  return (
    <View style={style.statContainer}>
      <A_Text strong style={style.statTitle}>
        {props.title}
      </A_Text>
      {props.children}
    </View>
  );
};

export { M_Stat };

const style = StyleSheet.create({
  statContainer: {},
  statTitle: {}
});
