import React from "react";
import { Image } from "react-native";

const A_Icon = props => <Image {...props} />;

const A_Icon_Search = () => (
  <A_Icon source={require("../assets/search_icon.png")} />
);
const A_Icon_Favorites = () => (
  <A_Icon source={require("../assets/favorites_icon.png")} />
);

export { A_Icon, A_Icon_Search, A_Icon_Favorites };
