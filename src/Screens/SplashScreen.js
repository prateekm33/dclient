import React, { Component } from "react";
import { connect } from "../redux";

import { SCREEN_NAMES } from "../AppNavigator";
import ScreenContainer from "../Templates/ScreenContainer";
import { A_Text } from "../Atoms";

import loading_types from "../redux/types/loading.types";
import { initAction } from "../redux/actions";
import { customerIsAuthenticated } from "../utils";

class SplashScreen extends Component {
  componentWillMount = () => {
    // TODO...dispatch init action to fetch data
    this.props.dispatch(initAction());
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.loading === false) {
      this.props.navigation.resetTo(
        nextProps.is_authenticated
          ? SCREEN_NAMES.DealsPage
          : SCREEN_NAMES.LoginPage
      );
    }
  };

  render() {
    return (
      <ScreenContainer>
        <A_Text>splash</A_Text>
      </ScreenContainer>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.LOADING_STATES.isLoading(loading_types.INITIALIZING_APP),
  is_authenticated: customerIsAuthenticated(state.customer),
  customer: state.customer
});
export default connect(mapStateToProps)(SplashScreen);
