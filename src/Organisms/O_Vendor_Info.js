import React from "react";
import { View, Linking } from "react-native";
import { M_Vendor_Hours } from "../Molecules";
import { A_Icon_Phone, A_Text_Vendor_Name, A_Text } from "../Atoms";

const callVendor = phone => {
  Linking.openURL("tel:+" + phone).catch(err => {});
};
const O_Vendor_Info = props => {
  return (
    <View>
      <A_Text_Vendor_Name vendor={props.vendor} disabled={true} />
      <A_Text>{props.vendor.long_desc}</A_Text>
      <A_Text strong>Hours</A_Text>
      <M_Vendor_Hours hours={props.vendor.hours} />
      {props.vendor.business_phone && (
        <A_Icon_Phone onPress={() => callVendor(props.vendor.business_phone)} />
      )}
    </View>
  );
};

export { O_Vendor_Info };
