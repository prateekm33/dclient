import React from "react";
import PropTypes from "prop-types";
import { TouchableHighlight } from "react-native";
import A_Text from "./A_Text";

const A_Button = props => {
  const type = props.type || "";
  switch (type.toLowerCase()) {
    default:
      return (
        <TouchableHighlight onPress={props.onPress}>
          {props.value ? <A_Text>{props.value}</A_Text> : props.children}
        </TouchableHighlight>
      );
  }
};
A_Button.propTypes = {
  ...TouchableHighlight.propTypes,
  value: PropTypes.string
};
export default A_Button;
