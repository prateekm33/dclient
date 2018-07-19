import React from "react";
import { M_Vendor_Hours } from "../Molecules";
import {
  A_Icon_Phone,
  A_Text_Vendor_Name,
  A_Text,
  A_View
} from "chemics/Atoms";
import { callPhoneNumber } from "../utils";

const O_Vendor_Info = props => {
  return (
    <A_View>
      <A_Text_Vendor_Name vendor={props.vendor} />
      <A_Text>{props.vendor.long_desc}</A_Text>
      <A_Text strong>Hours</A_Text>
      <M_Vendor_Hours hours={props.vendor.hours} />
      {props.vendor.business_phone && (
        <A_Icon_Phone
          onPress={() => callPhoneNumber(props.vendor.business_phone)}
        />
      )}
    </A_View>
  );
};

export { O_Vendor_Info };
