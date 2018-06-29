import React from "react";
import { StyleSheet, View } from "react-native";
import ScreenContainer from "../Templates/ScreenContainer";
import { O_List_Favorites } from "../Organisms";
import { getResponsiveCSSFrom8 } from "../utils";

const Favorites = props => {
  return (
    <ScreenContainer title="Favorites" scrollView>
      <View style={style.favoriteListContainer}>
        <O_List_Favorites />
      </View>
    </ScreenContainer>
  );
};
export default Favorites;

const style = StyleSheet.create({
  favoriteListContainer: {
    padding: getResponsiveCSSFrom8(15).width
  }
});
