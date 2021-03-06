import React from "react";
import { FlatList } from "react-native";
import {
  M_Card_Deal_Mini,
  M_Card_LoyaltyReward_Mini,
  M_Card_Vendor_Mini
} from "chemics/Molecules";
import { A_ListContainer } from "chemics/Atoms";

const renderDealListItem = ({ item }) => {
  return <M_Card_Deal_Mini deal={item} />;
};
const O_List_Deals = props => {
  return (
    <FlatList
      data={props.deals}
      renderItem={renderDealListItem}
      keyExtractor={item => `deal-${item.code}-${item.vendor_uuid}`}
    />
  );
};

const renderRewardListItem = ({ item }) => {
  return <M_Card_LoyaltyReward_Mini reward={item} />;
};
const O_List_Rewards = props => {
  return (
    <FlatList
      data={props.rewards}
      renderItem={renderRewardListItem}
      keyExtractor={item => `reward-${item.code}-${item.vendor_uuid}`}
    />
  );
};

const renderVendorListItem = ({ item }) => {
  return <M_Card_Vendor_Mini vendor={item} />;
};
const O_List_Vendors = props => {
  return (
    <A_ListContainer
      data={props.vendors}
      keyExtractor={item => `vendor-${item.code}-${item.vendor_uuid}`}
      renderItem={renderVendorListItem}
    />
  );
};

export { O_List_Deals, O_List_Rewards, O_List_Vendors };
