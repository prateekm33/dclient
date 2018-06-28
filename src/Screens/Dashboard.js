import React, { Component } from "react";
import { View, Text } from "react-native";
import ScreenContainer from "../Templates/ScreenContainer";
import { O_Map, O_MenuBar_Main } from "../Organisms";

class Dashboard extends Component {
  render() {
    return (
      <ScreenContainer>
        <Text>Dashboard</Text>
        <O_Map flavor="all" />
        <O_MenuBar_Main />
      </ScreenContainer>
    );
  }
}

export default Dashboard;
