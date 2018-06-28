import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { A_Input, A_Button, A_Text } from "../Atoms";

class M_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
    this.inputs = [];
  }
  handleSubmit = () => {
    if (!this.inputsValidated(this.inputs)) return;
    this.props.handleSubmit(this.inputs);
  };

  inputsValidated = inputs => {
    let validated = true;
    const newState = { errors: this.state.errors };
    inputs.forEach((input, idx) => {
      newState.errors[idx] = newState.errors[idx] || {};
      const value = input._lastNativeText;
      if (this.props.inputs[idx].required) {
        if (!value) {
          newState.errors[idx].required = "Required.";
          validated = false;
        } else {
          delete newState.errors[idx].required;
        }
      }
      const validators = this.props.inputs[idx].validate || [];
      validators.forEach(validator => {
        if (!validator.cb(value)) {
          newState.errors[idx][validator.message] = validator.message;
          validated = false;
        } else delete newState.errors[idx][validator.message];
      });
    });
    this.setState(newState);
    return validated;
  };

  wrappedInputs = inputs => {
    return inputs.map((input, idx) => {
      const copy = { ...input };
      copy.inputRef = el => {
        if (input.inputRef) input.inputRef(el);
        this.inputs[idx] = el;
      };
      return copy;
    });
  };

  renderInputErrors = (errors, idx) => {
    const nodes = [];
    for (let error in errors) {
      nodes.push(
        <A_Text
          key={`form-${this.props.label}-input-${idx}-error-${errors[error]}`}
          type="error"
        >
          {errors[error]}
        </A_Text>
      );
    }
    return nodes;
  };

  render() {
    const inputs = this.wrappedInputs(this.props.inputs);
    return (
      <View>
        <A_Text>Form Molecule</A_Text>
        {inputs.map((input, idx) => {
          return (
            <View key={`form-${this.props.label}-input-${input.name || idx}`}>
              <A_Input {...input} />
              {this.renderInputErrors(this.state.errors[idx], idx)}
            </View>
          );
        })}
        <A_Button onPress={this.handleSubmit}>
          <A_Text strong>Submit</A_Text>
        </A_Button>
      </View>
    );
  }
}
M_Form.propTypes = {
  label: PropTypes.string.isRequired,
  inputs: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired
};

export default M_Form;
