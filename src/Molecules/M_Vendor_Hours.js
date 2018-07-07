import React from "react";
import { A_Text } from "../Atoms";
import moment from "moment";

// TODO --- add in format string for moment parsing below
const M_Vendor_Hours = props => {
  const hours = props.hours || [];
  if (!hours.length) return null;
  return hours.map(day => {
    <View>
      <A_Text strong>{day.day}</A_Text>
      <A_Text>
        <A_Text>{moment(day.from)}</A_Text>-<A_Text>{moment(day.to)}</A_Text>
      </A_Text>
    </View>;
  });
};

export { M_Vendor_Hours };
