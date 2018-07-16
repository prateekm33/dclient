import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "../redux";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import { A_View, A_ListContainer, A_Button_Opacity } from "chemics/Atoms";
import { M_Card_Deal_Mini, M_Card_LoyaltyReward_Mini } from "chemics/Molecules";
import { O_Vendor_Info } from "../Organisms";
import {
  fetchVendorDealsAction,
  fetchVendorRewardsAction
} from "../redux/actions/deals.actions";
import { TEAL_DARK_THREE, TEAL } from "../styles/Colors";
import { getResponsiveCSSFrom8 } from "../utils";
import { SCREEN_NAMES } from "../AppNavigator";

class VendorPage extends Component {
  constructor(props) {
    super(props);
    this.limit = 50;
    this.state = {
      vendor: props.navigation.state.params.vendor,
      deals: [],
      rewards: [],
      all_fetched: false,
      offset: 0,
      activeTab: 0
    };
  }

  componentWillMount = () => {
    this.fetchVendorDeals();
  };

  loadMore = () => {
    if (this.state.activeTab === 0) this.fetchVendorDeals();
    else if (this.state.activeTab === 1) this.fetchVendorRewards();
  };

  fetchVendorDeals = () => {
    const limit = this.limit;
    const offset = this.state.offset;
    this.props
      .dispatch(
        fetchVendorDealsAction({ vendor: this.state.vendor, limit, offset })
      )
      .then(res => {
        if (!res || res.end) return this.setState({ all_fetched: true });
        this.setState({
          deals: this.state.deals.concat(res.deals),
          offset: this.state.offset + this.limit
        });
      });
  };

  fetchVendorRewards = () => {
    const limit = this.limit;
    const offset = this.state.offset;
    this.props
      .dispatch(
        fetchVendorRewardsAction({ vendor: this.state.vendor, limit, offset })
      )
      .then(res => {
        if (!res || res.end) return this.setState({ all_fetched: true });
        this.setState({
          rewards: this.state.rewards.concat(res.loyalty_rewards),
          offset: this.state.offset + this.limit
        });
      });
  };

  renderDeals = () => {
    return (
      <A_ListContainer
        data={this.state.deals}
        renderItem={({ item }) => {
          return (
            <M_Card_Deal_Mini
              deal={item}
              onPress={() => {
                this.props.navigation.navigate(SCREEN_NAMES.DealPage, {
                  deal: item
                });
              }}
            />
          );
        }}
        keyExtractor={deal => `vendor-deal-${deal.code}`}
      />
    );
  };
  renderRewards = () => {
    return (
      <A_ListContainer
        data={this.state.rewards}
        renderItem={({ item }) => {
          return (
            <M_Card_LoyaltyReward_Mini
              reward={item}
              onPress={() => {
                this.props.navigation.navigate(SCREEN_NAMES.RewardPage, {
                  reward: item
                });
              }}
            />
          );
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
    this.setState(
      {
        activeTab: idx,
        deals: [],
        rewards: [],
        all_fetched: false,
        offset: 0
      },
      () => {
        if (idx === 0) return this.fetchVendorDeals();
        if (idx === 1) return this.fetchVendorRewards();
      }
    );
  };
  showDeals = () => this.setActiveTab(0);
  showRewards = () => this.setActiveTab(1);
  showInfo = () => this.setActiveTab(2);

  render() {
    return (
      <ScreenContainer title={this.state.vendor.name} scrollView>
        <A_View
          style={{
            flexDirection: "row",
            flexWrap: "nowrap",
            marginBottom: getResponsiveCSSFrom8(20).height
          }}
        >
          <A_Button_Opacity
            value="Deals"
            strong={this.state.activeTab === 0}
            onPress={this.showDeals}
            style={[
              style.tabOptionContainerStyles,
              this.state.activeTab === 0 && style.activeTabStyles
            ]}
            buttonTextStyles={[
              style.tabHeaderTextStyles,
              this.state.activeTab === 0 && style.activeTabTextStyles
            ]}
          />
          <A_Button_Opacity
            value="Rewards"
            strong={this.state.activeTab === 1}
            onPress={this.showRewards}
            style={[
              style.tabOptionContainerStyles,
              this.state.activeTab === 1 && style.activeTabStyles
            ]}
            buttonTextStyles={[
              style.tabHeaderTextStyles,
              this.state.activeTab === 1 && style.activeTabTextStyles
            ]}
          />
          <A_Button_Opacity
            value="Info"
            strong={this.state.activeTab === 2}
            onPress={this.showInfo}
            style={[
              style.tabOptionContainerStyles,
              this.state.activeTab === 2 && style.activeTabStyles
            ]}
            buttonTextStyles={[
              style.tabHeaderTextStyles,
              this.state.activeTab === 2 && style.activeTabTextStyles
            ]}
          />
        </A_View>
        {this.getActiveTabContent()}
        {this.state.activeTab !== 2 && (
          <A_Button_Opacity
            disabled={this.state.all_fetched}
            onPress={this.loadMore}
            value={this.state.all_fetched ? "ALL LOADED" : "LOAD MORE"}
            style={[
              {
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: TEAL_DARK_THREE
              },
              this.state.all_fetched && { borderWidth: 0 }
            ]}
            buttonTextStyles={[
              {
                color: TEAL_DARK_THREE,
                textAlign: "center"
              },
              this.state.all_fetched && { color: "grey" }
            ]}
            strong={!this.state.all_fetched}
          />
        )}
        <A_View style={{ marginBottom: getResponsiveCSSFrom8(100).height }} />
      </ScreenContainer>
    );
  }
}

export default connect()(VendorPage);

const style = StyleSheet.create({
  tabHeaderTextStyles: {
    color: "grey",
    fontSize: getResponsiveCSSFrom8(20).height
  },
  tabOptionContainerStyles: {
    paddingRight: getResponsiveCSSFrom8(15).width
  },
  activeTabStyles: {},
  activeTabTextStyles: {
    color: "black"
  }
});
