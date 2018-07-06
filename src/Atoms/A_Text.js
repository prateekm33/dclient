import React from "react";
import { Text, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import { WEIGHT } from "../styles/defaults";
import { ERROR_RED } from "../styles/Colors";
import { A_Button_Opacity } from "./A_Button";
import { SCREEN_NAMES } from "../AppNavigator";

const A_Text = props => {
  let styles_array = [];
  if (props.strong) styles_array.push(style.strong);
  styles_array = styles_array.concat(props.style);
  if (props.color) styles_array.push({ color: props.color });
  return <Text style={styles_array}>{props.children}</Text>;
};
A_Text.propTypes = {
  ...Text.propTypes
  // strong: PropTypes.bool // Leave this commented out, but know that it is a valid prop
};
export default A_Text;

const A_Text_Vendor_Name_Pre = props => {
  let onPress = () =>
    props.navigation.navigate(SCREEN_NAMES.VendorPage, {
      vendor: props.vendor
    });
  return (
    <A_Button_Opacity onPress={onPress} disabled={props.disabled}>
      <A_Text
        {...props}
        strong
        style={[style.vendorNameText, props.vendorNameTextStyle]}
      >
        {props.vendor.name}
      </A_Text>
    </A_Button_Opacity>
  );
};
const A_Text_Vendor_Name = withNavigation(A_Text_Vendor_Name_Pre);

export { A_Text_Vendor_Name };

const style = StyleSheet.create({
  strong: {
    fontWeight: WEIGHT.BOLD
  },
  error: {
    color: ERROR_RED
  },
  vendorNameText: {}
});
