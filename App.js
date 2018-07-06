import React, { Component } from "react";
import { Provider } from "react-redux";
import { View } from "react-native";
import store from "./src/redux/store";
import { O_MenuBar_Main, O_Modal_Main_Rendered } from "./src/Organisms";
import AppNavigator from "./src/AppNavigator";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppNavigator />
          <O_MenuBar_Main />
        </View>
      </Provider>
    );
  }
}

export default App;
