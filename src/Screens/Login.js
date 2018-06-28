import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "../redux";
import ScreenContainer from "../Templates/ScreenContainer";
import { M_Form } from "../Molecules";
import { A_Text, A_Button } from "../Atoms";

class Login extends Component {
  constructor(props) {
    super(props);
    this.inputs = [
      {
        placeholder: "username",
        required: true
      },
      {
        placeholder: "password",
        secureTextEntry: true,
        required: true
      },
      {
        placeholder: "confirm password",
        secureTextEntry: true,
        required: true
      }
    ];
    this.state = {
      login_form: true
    };
  }

  componentDidMount = () => {};

  handleLogin = inputs => {
    const [username, password] = inputs.map(input => input._lastNativeText);
    const credentials = { username, password };
    // this.props.dispatch(submitLoginAction(credentials));
  };

  toggleForm = () => this.setState({ login_form: !this.state.login_form });

  render() {
    return (
      <ScreenContainer>
        {this.state.login_form ? (
          <M_Form
            label="login_form"
            inputs={this.inputs.slice(0, 2)}
            handleSubmit={this.handleLogin}
          />
        ) : (
          <M_Form
            label="signup_form"
            inputs={this.inputs}
            handleSubmit={this.handleLogin}
          />
        )}
        <View>
          <A_Text>
            {this.state.login_form
              ? "New to the app? Welcome!"
              : "Already have an account?"}
          </A_Text>
          <A_Button
            onPress={this.toggleForm}
            value={this.state.login_form ? "Sign up here!" : "Log in!"}
          />
        </View>
      </ScreenContainer>
    );
  }
}

export default connect()(Login);
