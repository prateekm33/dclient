import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { getResponsiveCSSFrom8 } from "../utils";
import { A_Button_Opacity } from "../Atoms";

const M_TabSelect_Pill = props => {
  return (
    <View style={[style.container, props.containerStyle]}>
      {props.tabs.map((op, idx) => (
        <A_Button_Opacity
          onPress={() => props.onTabSelect(idx, op)}
          key={`tab-${props.label}-option-${idx}`}
          style={[
            style.itemContainer,
            props.itemContainerStyle,
            idx === 0 && style.firstItemContainer,
            idx === props.tabs.length - 1 && style.lastItemContainer,
            props.activeTab === idx && style.activeTab
          ]}
        >
          {op}
        </A_Button_Opacity>
      ))}
    </View>
  );
};
M_TabSelect_Pill.propTypes = {
  label: PropTypes.string.isRequired,
  onTabSelect: PropTypes.func.isRequired
};
const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    borderRadius: getResponsiveCSSFrom8(8).width
  },
  itemContainer: {},
  firstItemContainer: {
    borderTopLeftRadius: getResponsiveCSSFrom8(8).width,
    borderBottomLeftRadius: getResponsiveCSSFrom8(8).width
  },
  lastItemContainer: {
    borderTopRightRadius: getResponsiveCSSFrom8(8).width,
    borderBottomRightRadius: getResponsiveCSSFrom8(8).width
  },
  activeTab: {
    backgroundColor: "pink"
  }
});

export { M_TabSelect_Pill };
