import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "../redux";
import ScreenContainer from "../Templates/ScreenContainer";
import { M_Form } from "../Molecules";
import { A_Text, A_Button_Opacity } from "../Atoms";
import { loginAction, signupAction } from "../redux/actions/customer.actions";
import { SCREEN_NAMES } from "../AppNavigator";
import { customerIsAuthenticated } from "../utils";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.inputs = [
      {
        placeholder: "username",
        required: true
      },
      {
        placeholder: "password",
        required: true,
        inputRef: el => (this.password_el = el),
        secureTextEntry: true
      },
      {
        placeholder: "confirm password",
        required: true,
        inputRef: el => (this.confirm_password_el = el),
        validate: [
          {
            cb: value =>
              this.confirm_password_el._lastNativeText ===
              this.password_el._lastNativeText,
            message: "Passwords do not match."
          }
        ],
        secureTextEntry: true
      }
    ];
    this.state = {
      login_form: true
    };
  }

  // componentWillMount = () => {
  //   if (customerIsAuthenticated(this.props.user)) {
  //     this.navigateToDashboard(this.props.customer);
  //   }
  // };

  // componentWillReceiveProps = next_props => {
  //   if (customerIsAuthenticated(next_props.user)) {
  //     this.navigateToDashboard(next_props.customer);
  //   }
  // };

  login = inputs => {
    const [email, password] = inputs.map(input => input._lastNativeText);
    const credentials = { email, password };
    this.props
      .dispatch(loginAction(credentials))
      .then(customer => customer && this.navigateToDashboard(customer));
  };

  signup = inputs => {
    const [email, password] = inputs.map(input => input._lastNativeText);
    const credentials = { email, password };
    this.props
      .dispatch(signupAction(credentials))
      .then(customer => customer && this.navigateToDashboard(customer));
  };

  navigateToDashboard = customer => {
    if (!customer) return;
    this.props.navigation.resetTo(SCREEN_NAMES.DealsPage);
  };

  toggleForm = () => this.setState({ login_form: !this.state.login_form });

  render() {
    return (
      <ScreenContainer noHeader>
        {this.state.login_form ? (
          <M_Form
            title="Account Log In"
            label="login_form"
            inputs={this.inputs.slice(0, 2)}
            handleSubmit={this.login}
          />
        ) : (
          <M_Form
            title="New Account Form"
            label="signup_form"
            inputs={this.inputs}
            handleSubmit={this.signup}
          />
        )}
        <View>
          <A_Text>
            {this.state.login_form
              ? "New to Dineable? Welcome!"
              : "Already have Dineable accout? Great!"}
          </A_Text>
          <A_Button_Opacity
            value={this.state.login_form ? "Sign up!" : "Log in!"}
            onPress={this.toggleForm}
          />
        </View>
      </ScreenContainer>
    );
  }
}

export default connect(state => ({
  customer: state.customer
}))(LoginPage);
