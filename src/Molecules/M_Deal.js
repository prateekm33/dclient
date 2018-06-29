import React from "react";
import { View } from "react-native";
import { A_Image, A_Text } from "../Atoms";

const M_Deal = props => {
  return (
    <View>
      {props.source && <A_Image source={props.source} />}
      <A_Text>{props.title}</A_Text>
      <A_Text>{props.desc}</A_Text>
    </View>
  );
};

const M_Deal_Thumbnail = props => {
  return (
    <View>
      {props.source && <A_Image source={props.source} />}
      <A_Text>{props.title}</A_Text>
    </View>
  );
};

const M_Deal_Card_Basic = props => {
  return (
    <View>
      {props.source && <A_Image source={props.source} />}
      <A_Text>{props.title}</A_Text>
      <A_Text>{props.desc}</A_Text>
    </View>
  );
};
const M_Deal_Card_Detailed = props => {
  return (
    <View>
      {props.source && <A_Image source={props.source} />}
      <A_Text>{props.title}</A_Text>
      <A_Text>{props.desc}</A_Text>
    </View>
  );
};

export { M_Deal, M_Deal_Thumbnail, M_Deal_Card_Basic, M_Deal_Card_Detailed };
