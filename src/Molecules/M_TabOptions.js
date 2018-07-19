import React from "react";
import { View, StyleSheet } from "react-native";
import { A_Text, A_Button_Opacity } from "chemics/Atoms";

const M_TabOptions = props => {
  return (
    <View style={[style.tabsContainer, props.tabsContainerStyle]}>
      {props.tabs.map((tab, idx) => (
        <A_Button_Opacity
          onPress={() => props.onTabSelect(idx)}
          style={[
            style.tabContainer,
            props.tabContainerStyle,
            props.activeTab === idx && style.activeTab,
            props.activeTab === idx && props.activeTabStyle
          ]}
          key={`${props.label || "generic-tabs"}-option-${tab}`}
        >
          <A_Text>{tab}</A_Text>
        </A_Button_Opacity>
      ))}
    </View>
  );
};

export { M_TabOptions };

const style = StyleSheet.create({
  tabsContainer: {},
  tabContainer: {},
  activeTab: {}
});
