import React, { Component } from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { connect } from "../redux";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import { M_Form } from "chemics/Molecules";
import { A_Text, A_Button_Opacity, A_View } from "chemics/Atoms";
import { loginAction, signupAction } from "../redux/actions/customer.actions";
import { SCREEN_NAMES } from "../AppNavigator";
import {
  TEAL_LIGHT,
  TEAL_DARK_ONE,
  TEAL_DARK_TWO,
  TEAL_DARK_THREE,
  TEAL
} from "../styles/Colors";
import { getResponsiveCSSFrom8 } from "../utils";

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

  login = inputs => {
    const [email, password] = inputs.map(
      input => (input ? input._lastNativeText : "")
    );
    const credentials = { email, password };
    this.props
      .dispatch(loginAction(credentials))
      .then(customer => customer && this.navigateToDashboard(customer));
  };

  signup = inputs => {
    const [email, password] = inputs.map(
      input => (input ? input._lastNativeText : "")
    );
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
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        style={{ position: "relative", flex: 1 }}
      >
        <ScreenContainer
          noHeader
          containerStyle={style.screenContainerStyle}
          statusBarStyle="dark-content"
          innerContainerStyle={{
            justifyContent: "center"
          }}
        >
          {this.state.login_form ? (
            <M_Form
              title="Dineable"
              label="login_form"
              inputs={this.inputs.slice(0, 2)}
              handleSubmit={this.login}
              titleStyles={style.titleStyles}
              formContainerStyles={style.formContainerStyles}
              inputContainerStyles={style.inputContainerStyles}
              submitButtonStyles={style.submitButtonStyles}
              submitButtonTextStyles={style.submitButtonTextStyles}
              inputStyles={style.inputStyles}
              inputProps={inputProps}
              button_text="Log In"
            />
          ) : (
            <M_Form
              title="Create an Account"
              label="signup_form"
              inputs={this.inputs}
              handleSubmit={this.signup}
              titleStyles={style.titleStyles}
              formContainerStyles={style.formContainerStyles}
              inputContainerStyles={style.inputContainerStyles}
              submitButtonStyles={style.submitButtonStyles}
              submitButtonTextStyles={style.submitButtonTextStyles}
              inputStyles={style.inputStyles}
              inputProps={inputProps}
              button_text="Sign Up"
            />
          )}
          <A_View style={{ marginTop: getResponsiveCSSFrom8(20).height }}>
            <A_Button_Opacity
              value={this.state.login_form ? "Sign up!" : "Log in!"}
              onPress={this.toggleForm}
              buttonTextStyles={style.switchFormButtonTextStyles}
              style={style.switchFormButtonStyles}
            />
          </A_View>
        </ScreenContainer>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(state => ({
  customer: state.customer
}))(LoginPage);

const style = StyleSheet.create({
  screenContainerStyle: {
    paddingHorizontal: getResponsiveCSSFrom8(30).width,
    backgroundColor: TEAL
  },
  titleStyles: {
    fontSize: getResponsiveCSSFrom8(30).height,
    marginBottom: getResponsiveCSSFrom8(50).height,
    color: TEAL_DARK_THREE
  },
  formContainerStyles: {
    alignSelf: "center",
    width: "100%",
    alignItems: "center"
  },
  inputContainerStyles: {},
  submitButtonStyles: {
    marginTop: getResponsiveCSSFrom8(20).height,
    width: getResponsiveCSSFrom8(280).width,
    backgroundColor: TEAL_DARK_TWO
  },
  submitButtonTextStyles: {
    color: "white"
  },
  inputStyles: {
    textAlign: "center",
    color: TEAL_DARK_ONE,
    paddingVertical: getResponsiveCSSFrom8(20).height,
    fontSize: getResponsiveCSSFrom8(20).height
  },
  switchFormContainerStyles: {
    marginTop: getResponsiveCSSFrom8(20).height,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  switchFormContainerTextStyles: {
    marginRight: getResponsiveCSSFrom8(10).width
  },
  switchFormButtonTextStyles: {
    fontSize: getResponsiveCSSFrom8(20).height
  },
  switchFormButtonStyles: {
    alignItems: "center",
    width: "100%"
  }
});

const inputProps = {
  placeholderTextColor: TEAL_LIGHT
};
