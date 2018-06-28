import React, { Component } from "react";
import ScreenContainer from "../Templates/ScreenContainer";
import { A_Text } from "../Atoms";
import { O_List_Favorites } from "../Organisms";

const Favorites = props => {
  return (
    <ScreenContainer title="Favorites" scrollView>
      <O_List_Favorites />
    </ScreenContainer>
  );
};
export default Favorites;
