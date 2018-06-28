import React, { Component } from "react";
import ScreenContainer from "../Templates/ScreenContainer";
import { O_Map, O_MenuBar_Main } from "../Organisms";

const Dashboard = () => {
  return (
    <ScreenContainer noHeader={true}>
      <O_Map flavor="all" />
      {/* <O_MenuBar_Main /> */}
    </ScreenContainer>
  );
};

export default Dashboard;
