import React from "react";
import { FlatList } from "react-native";
import { M_Card_Deal_Mini, M_Card_LoyaltyReward_Mini } from "../Molecules";

const renderDealListItem = ({ item }) => {
  return <M_Card_Deal_Mini deal={item} />;
};
const O_List_Deals = props => {
  return (
    <FlatList
      data={props.deals}
      renderItem={renderDealListItem}
      keyExtractor={item => `deal-${item.code}-${item.vendor.id}`}
    />
  );
};

const renderRewardListItem = ({ item }) => {
  return <M_Card_LoyaltyReward_Mini reward={item} />;
};
const O_List_Rewards = props => {
  return (
    <FlatList
      data={props.deals}
      renderItem={renderRewardListItem}
      keyExtractor={item => `reward-${item.code}-${item.vendor.id}`}
    />
  );
};

export { O_List_Deals, O_List_Rewards };
