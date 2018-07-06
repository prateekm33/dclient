import React from "react";
import { Image } from "react-native";
import { A_Button_Opacity } from ".";

const A_Icon = props => {
  if (props.onPress)
    return (
      <A_Button_Opacity onPress={props.onPress} disabled={props.disabled}>
        {props.Icon}
      </A_Button_Opacity>
    );
  return props.Icon;
};
const A_Icon_View = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/view_icon.png")} />}
  />
);

const A_Icon_Delete = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/delete_icon.png")} />}
  />
);
const A_Icon_Pause = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/pause_icon.png")} />}
  />
);
const A_Icon_Favorites = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/favorites_icon.png")} />}
  />
);
const A_Icon_All = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/view_icon.png")} />}
  />
);
const A_Icon_Saved = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/view_icon.png")} />}
  />
);
const A_Icon_Save = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/view_icon.png")} />}
  />
);
const A_Icon_Map = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/view_icon.png")} />}
  />
);
const A_Icon_List = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/view_icon.png")} />}
  />
);

const A_Icon_Phone = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/view_icon.png")} />}
  />
);

// TODO...handle special onPress handling for share options display
const A_Icon_Share = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/view_icon.png")} />}
  />
);

const A_Icon_Close = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/view_icon.png")} />}
  />
);

const A_Icon_Deal = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/coupon_icon.png")} />}
  />
);
const A_Icon_Reward = props => (
  <A_Icon
    {...props}
    Icon={<Image {...props} source={require("../assets/reward_icon.png")} />}
  />
);

export {
  A_Icon_View,
  A_Icon_Pause,
  A_Icon_Delete,
  A_Icon_Favorites,
  A_Icon_All,
  A_Icon_Saved,
  A_Icon_Save,
  A_Icon_Map,
  A_Icon_List,
  A_Icon_Phone,
  A_Icon_Share,
  A_Icon_Close,
  A_Icon_Deal,
  A_Icon_Reward
};
