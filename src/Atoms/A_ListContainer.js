import React from "react";
import { FlatList, View } from "react-native";
import { getResponsiveCSSFrom8 } from "../utils";

const A_ListContainer = props => {
  return (
    <View style={{ padding: getResponsiveCSSFrom8(10).width }}>
      <FlatList
        data={props.data}
        renderItem={props.renderItem}
        keyExtractor={props.keyExtractor}
      />
    </View>
  );
};

export { A_ListContainer };
