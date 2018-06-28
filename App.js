import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <View>
        <Text>sss</Text>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  loading: true, // state.LOADING_STATES.isLoading(loading_types.INITIALIZING_APP)
  is_authenticated: state.user.is_authenticated
});
export default connect(mapStateToProps)(App);
