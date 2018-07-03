import React from "react";
import PropTypes from "prop-types";
import { View, TextInput } from "react-native";

const A_Input = props => {
  return <TextInput {...props} ref={props.inputRef} />;
};
A_Input.propTypes = {
  ...TextInput.propTypes,
  name: PropTypes.string,
  inputRef: PropTypes.func
};
export { A_Input };
