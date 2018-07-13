import { FeatureFlags } from "../../config/DebugConfig";
import React from "react";
import { withNavigation } from "react-navigation";
import { A_Text, A_Button } from "../Atoms";
import {
  M_Deal_Card_Options,
  M_Reward_Card_Options,
  M_Vendor_Card_Options
} from "./M_Deal_Card_Options";
import { SCREEN_NAMES } from "../AppNavigator";

const M_Card_Deal_Mini = withNavigation(props => {
  const deal = props.deal;
  return (
    <A_Button
      disabled={props.disabled}
      onPress={() => props.navigation.navigate(SCREEN_NAMES.DealPage, { deal })}
    >
      {deal.image && <A_Image source={deal.image} />}
      <A_Text strong>{deal.name}</A_Text>
      <A_Text>{deal.short_desc}</A_Text>
      <M_Deal_Card_Options deal={deal} />
    </A_Button>
  );
});

const M_Card_Deal_Large = withNavigation(props => {
  const deal = props.deal;

  return (
    <A_Button
      disabled={props.disabled}
      onPress={() =>
        props.navigation.navigate(SCREEN_NAMES.VendorPage, { deal })
      }
    >
      {deal.image && <A_Image source={deal.image} />}
      <A_Text strong>{deal.name}</A_Text>
      <A_Text>{deal.long_desc}</A_Text>
      <M_Deal_Card_Options deal={deal} />
    </A_Button>
  );
});

const M_Card_LoyaltyReward_Mini = withNavigation(props => {
  const reward = props.reward;

  return (
    <A_Button
      disabled={props.disabled}
      onPress={() =>
        props.navigation.navigate(SCREEN_NAMES.RewardPage, { reward })
      }
    >
      {reward.image && <A_Image source={reward.image} />}
      <A_Text strong>{reward.name}</A_Text>
      <A_Text strong>{reward.short_desc}</A_Text>
      <M_Reward_Card_Options reward={reward} />
    </A_Button>
  );
});

const M_Card_Reward_Large = withNavigation(props => {
  const reward = props.reward;

  return (
    <A_Button
      disabled={props.disabled}
      onPress={() =>
        props.navigation.navigate(SCREEN_NAMES.VendorPage, { reward })
      }
    >
      {reward.image && <A_Image source={reward.image} />}
      <A_Text strong>{reward.name}</A_Text>
      <A_Text>{reward.long_desc}</A_Text>
      <M_Reward_Card_Options reward={reward} />
    </A_Button>
  );
});

const M_Card_Vendor_Mini = withNavigation(props => {
  const vendor = props.vendor;

  return (
    <A_Button
      onPress={() =>
        props.navigation.navigate(SCREEN_NAMES.VendorPage, { vendor })
      }
    >
      {vendor.image && <A_Image source={vendor.image} />}
      <A_Text strong>{vendor.name}</A_Text>
      {FeatureFlags.FollowVendor && <M_Vendor_Card_Options vendor={vendor} />}
    </A_Button>
  );
});

export {
  M_Card_Deal_Mini,
  M_Card_LoyaltyReward_Mini,
  M_Card_Vendor_Mini,
  M_Card_Deal_Large,
  M_Card_Reward_Large
};
