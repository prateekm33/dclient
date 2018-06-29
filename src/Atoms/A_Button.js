import React from "react";
import PropTypes from "prop-types";
import { TouchableHighlight, TouchableOpacity } from "react-native";
import A_Text from "./A_Text";

const A_Button = props => {
  const type = props.type || "";
  switch (type.toLowerCase()) {
    default:
      return (
        <TouchableHighlight {...props}>
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

const A_Button_Opacity = props => {
  return (
    <TouchableOpacity {...props}>
      {props.value ? <A_Text>{props.value}</A_Text> : props.children}
    </TouchableOpacity>
  );
};
A_Button_Opacity.propTypes = {
  ...TouchableHighlight.propTypes,
  value: PropTypes.string
};

const A_Button_Location = props => {
  return (
    <A_Button_Opacity
      {...props}
      onPress={() => {
        console.warn(
          "-----SWITCH TO MAP SCREEN AND SHOW THIS POINT IN THE MAP."
        );
      }}
    />
  );
};

export { A_Button_Opacity, A_Button_Location };
