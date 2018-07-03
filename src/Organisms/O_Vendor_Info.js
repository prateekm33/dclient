import React from "react";
import { View } from "react-native";
import { M_Vendor_Hours } from "../Molecules";
import { A_Icon_Phone } from "../Atoms";

const callVendor = phone => {
  console.warn("-----TODO...call vendor...");
};
const O_Vendor_Info = props => {
  return (
    <View>
      <A_Text strong>{props.vendor.name}</A_Text>
      <A_Text>{props.vendor.long_desc}</A_Text>
      <A_Text strong>Hours</A_Text>
      <M_Vendor_Hours vendor={props.vendor.hours} />
      <A_Icon_Phone onPress={() => callVendor(vendor.phone)} />
    </View>
  );
};

export { O_Vendor_Info };
