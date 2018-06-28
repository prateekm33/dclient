import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";
import { WEIGHT } from "../styles/defaults";
import { ERROR_RED } from "../styles/Colors";

const A_Text = props => {
  let styles_array = [];
  if (props.strong) styles_array.push(style.strong);
  const type = props.type || "";
  switch (type.toLowerCase()) {
    case "error":
      styles_array.push(style.error);
      break;
    default:
      break;
  }
  styles_array = styles_array.concat(props.style);
  return <Text style={styles_array}>{props.children}</Text>;
};
A_Text.propTypes = {
  ...Text.propTypes
  // strong: PropTypes.bool // Leave this commented out, but know that it is a valid prop
};
export default A_Text;

const style = StyleSheet.create({
  strong: {
    fontWeight: WEIGHT.BOLD
  },
  error: {
    color: ERROR_RED
  }
});
