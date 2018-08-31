import React from "react";
import { A_Text, A_View } from "chemics/Atoms";
import moment from "moment";

// TODO --- add in format string for moment parsing below
const M_Vendor_Hours = props => {
  const hours = props.hours || [];
  if (!hours.length) return null;
  return (
    <A_View>
      <A_Text strong>Hours</A_Text>
      {hours.map(day => {
        <A_View>
          <A_Text strong>{day.day}</A_Text>
          <A_Text>
            <A_Text>{moment(day.from)}</A_Text>-<A_Text>
              {moment(day.to)}
            </A_Text>
          </A_Text>
        </A_View>;
      })}
    </A_View>
  );
};

export { M_Vendor_Hours };
