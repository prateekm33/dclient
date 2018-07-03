import React from "react";
import { withNavigation } from "react-navigation";
import { A_Text, A_Button } from "../Atoms";
import {
  M_Deal_Card_Options,
  M_Reward_Card_Options
} from "./M_Deal_Card_Options";
import { SCREEN_NAMES } from "../AppNavigator";

const M_Card_Deal_Mini = withNavigation(props => {
  const deal = props.deal;
  return (
    <A_Button
      onPress={() => props.navigation.navigate(SCREEN_NAMES.DealPage, { deal })}
    >
      {deal.image && <A_Image source={deal.image.source} />}
      <A_Text strong>{deal.title}</A_Text>
      <M_Deal_Card_Options deal={deal} />
    </A_Button>
  );
});

const M_Card_LoyaltyReward_Mini = withNavigation(props => {
  const reward = props.reward;
  return (
    <A_Button
      onPress={() =>
        props.navigation.navigate(SCREEN_NAMES.RewardPage, { reward })
      }
    >
      {reward.image && <A_Image source={reward.image.source} />}
      <A_Text strong>{reward.title}</A_Text>
      <M_Reward_Card_Options reward={reward} />
    </A_Button>
  );
});
export { M_Card_Deal_Mini, M_Card_LoyaltyReward_Mini };
