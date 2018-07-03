import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "../redux";
import ScreenContainer from "../Templates/ScreenContainer";
import { M_Form } from "../Molecules";
import { A_Text, A_Button_Opacity } from "../Atoms";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.login_inputs = [
      {
        placeholder: "username",
        required: true
      },
      {
        placeholder: "password",
        required: true,
        inputRef: el => (this.password_el = el)
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
        ]
      }
    ];
    this.state = {
      login_form: true
    };
  }

  login = inputs => {
    const [username, password] = inputs.map(input => input._lastNativeText);
    const credentials = { username, password };
    console.warn("-----TODO LOGIN CUSTOMER...");
  };

  signup = inputs => {
    const [username, password] = inputs.map(input => input._lastNativeText);
    const credentials = { username, password };
    console.warn("----TODO...SIGNUP CUSTOMER...");
  };

  toggleForm = () => this.setState({ login_form: !this.state.login_form });

  render() {
    return (
      <ScreenContainer noHeader>
        {this.state.login_form ? (
          <M_Form
            title="Account Log In"
            label="login_form"
            inputs={this.login_inputs}
            onSubmit={this.login}
          />
        ) : (
          <M_Form
            title="New Account Form"
            label="signup_form"
            inputs={this.signup_inputs}
            onSubmit={this.signup}
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

export default connect()(LoginPage);
