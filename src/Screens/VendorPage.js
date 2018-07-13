import React, { Component } from "react";
import ScreenContainer from "../Templates/ScreenContainer";
import {
  A_View,
  A_Icon_Deal,
  A_Icon_Reward,
  A_Icon_Details,
  A_Button,
  A_ListContainer
} from "../Atoms";
import { M_Card_Deal_Large, M_Card_Reward_Large } from "../Molecules";
import { O_Vendor_Info } from "../Organisms";

class VendorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendor: props.navigation.state.params.vendor,
      deals: [],
      rewards: [],
      all_fetched: false
    };
  }

  loadMore = () => {
    if (this.state.activeTab === 0) this.fetchVendorDeals();
    else if (this.state.activeTab === 1) this.fetchVendorRewards();
  };

  fetchVendorDeals = () => {
    this.props
      .dispatch(fetchVendorDealsAction(this.state.vendor))
      .then(deals => {
        if (!deals) return;
        this.setState({ deals: this.state.deals.concat(deals) });
      });
  };

  fetchVendorRewards = () => {
    this.props
      .dispatch(fetchVendorRewardsAction(this.state.vendor))
      .then(rewards => {
        if (!rewards) return;
        this.setState({ rewards: this.state.rewards.concat(rewards) });
      });
  };

  renderDeals = () => {
    this.fetchVendorDeals();
    return (
      <A_ListContainer
        data={this.state.deals}
        renderItem={({ item }) => {
          return <M_Card_Deal_Large deal={item} />;
        }}
        keyExtractor={deal => `vendor-deal-${deal.code}`}
      />
    );
  };
  renderRewards = () => {
    this.fetchVendorRewards();
    return (
      <A_ListContainer
        data={this.state.rewards}
        renderItem={({ item }) => {
          return <M_Card_Reward_Large reward={item} />;
        }}
        keyExtractor={reward => `vendor-reward-${reward.code}`}
      />
    );
  };
  renderInfo = () => <O_Vendor_Info vendor={this.state.vendor} />;

  getActiveTabContent = () => {
    if (this.state.activeTab === 0) return this.renderDeals();
    if (this.state.activeTab === 1) return this.renderRewards();
    if (this.state.activeTab === 2) return this.renderInfo();
  };

  setActiveTab = idx => {
    if (this.state.activeTab === idx) return;
    this.setState({
      activeTab: idx,
      deals: [],
      rewards: [],
      all_fetched: false
    });
  };
  showDeals = () => this.setActiveTab(0);
  showRewards = () => this.setActiveTab(1);
  showInfo = () => this.setActiveTab(2);

  render() {
    return (
      <ScreenContainer title={this.state.vendor.name}>
        <A_View>
          <A_Icon_Deal onPress={this.showDeals} />
          <A_Icon_Reward onPress={this.showRewards} />
          <A_Icon_Details onPress={this.showInfo} />
        </A_View>
        {this.getActiveTabContent()}
        {this.state.activeTab !== 2 && (
          <A_Button
            disabled={this.state.all_fetched}
            onPress={this.loadMore}
            value={this.state.all_fetched ? "ALL LOADED" : "LOAD MORE"}
          />
        )}
      </ScreenContainer>
    );
  }
}

export default VendorPage;
