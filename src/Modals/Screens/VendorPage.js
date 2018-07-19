import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "../../redux";
import MapView, { Marker } from "react-native-maps";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import {
  A_View,
  A_ListContainer,
  A_Button_Opacity,
  A_Text
} from "chemics/Atoms";
import { M_Card_Deal_Mini, M_Card_LoyaltyReward_Mini } from "chemics/Molecules";
import { O_Vendor_Info } from "../../Organisms";
import {
  fetchVendorDealsAction,
  fetchVendorRewardsAction
} from "../../redux/actions/deals.actions";
import { TEAL_DARK_THREE, TEAL } from "../../styles/Colors";
import { getResponsiveCSSFrom8, callPhoneNumber } from "../../utils";
import { SCREEN_NAMES } from "../../AppNavigator";
import { getVendorReviewsAction } from "../../redux/actions/reviews.actions";
import { VENDOR_MODAL_SCREEN_NAMES } from "../VendorModal";

class VendorPage extends Component {
  constructor(props) {
    super(props);
    this.limit = 50;
    this.state = {
      vendor: props.screenProps.params.vendor,
      deals: [],
      rewards: [],
      all_fetched: false,
      offset: 0,
      activeTab: 0,
      reviews: []
    };
    this.map_marker = {
      latitude: this.state.vendor.latitude,
      longitude: this.state.vendor.longitude
    };
    this.tab_headers = [
      { title: "Deals", onPress: this.showDeals },
      { title: "Rewards", onPress: this.showRewards },
      { title: "Reviews", onPress: this.showReviews }
    ];
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

  navigateToDeal = deal => {
    this.props.navigation.navigate(VENDOR_MODAL_SCREEN_NAMES.DealPage, {
      deal
    });
  };
  navigateToReward = reward => {
    this.props.navigation.navigate(VENDOR_MODAL_SCREEN_NAMES.RewardPage, {
      reward
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
                this.navigateToDeal(item);
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
                this.navigateToReward(item);
              }}
            />
          );
        }}
        keyExtractor={reward => `vendor-reward-${reward.code}`}
      />
    );
  };
  renderInfo = () => <O_Vendor_Info vendor={this.state.vendor} />;
  renderReviews = () => null;

  getActiveTabContent = () => {
    if (this.state.activeTab === 0) return this.renderDeals();
    if (this.state.activeTab === 1) return this.renderRewards();
    if (this.state.activeTab === 2) return this.renderReviews();
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
        if (idx === 2) return this.fetchVendorReviews();
      }
    );
  };
  showDeals = () => this.setActiveTab(0);
  showRewards = () => this.setActiveTab(1);
  showReviews = () => this.setActiveTab(2);

  fetchVendorReviews = () => {
    const limit = 50;
    const offset = this.state.offset;
    this.props
      .dispatch(
        getVendorReviewsAction({
          vendor_uuid: this.state.vendor.uuid,
          limit,
          offset
        })
      )
      .then(res => {
        if (!res || res.end) return this.setState({ all_fetched: true });
        this.setState({
          offset: this.state.offset + limit,
          reviews: this.state.reviews.concat(res.reviews)
        });
      });
  };

  renderLoadMoreButton = () => {
    if (this.state.activeTab === 2) return null;
    return (
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
    );
  };

  close = () => this.props.screenProps.mainNavigation.goBack();

  callVendor = () => {
    callPhoneNumber(this.state.vendor.business_phone);
  };
  render() {
    return (
      <ScreenContainer
        title={this.state.vendor.name}
        scrollView
        statusBarStyle="dark-content"
        onClose={this.close}
      >
        <A_View>
          <A_View>
            <A_Text>GLASSDOOR METRICS TODO</A_Text>
            {/* <O_ReviewMetrics vendor={this.state.vendor}/> */}
          </A_View>
          <MapView
            style={{
              width: "100%",
              height: getResponsiveCSSFrom8(150).height
            }}
            initialRegion={{
              latitude: this.state.vendor.latitude,
              longitude: this.state.vendor.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
            showsUserLocation={true}
            loadingEnabled={true}
          >
            <Marker
              coordinate={{
                longitude: this.state.vendor.longitude,
                latitude: this.state.vendor.latitude
              }}
            />
          </MapView>
          {/* <A_Text>GET DIRECTIONS BUTTON TODO</A_Text> */}
          <A_View
            style={{
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <A_Text strong>Phone</A_Text>
            <A_Button_Opacity
              value={this.state.vendor.business_phone}
              onPress={this.callVendor}
            />
          </A_View>
        </A_View>
        <A_View
          style={{
            borderBottomWidth: 0.8,
            borderColor: "lightgrey",
            marginTop: getResponsiveCSSFrom8(20).height
          }}
        />
        <A_View
          style={{
            flexDirection: "row",
            flexWrap: "nowrap",
            marginVertical: getResponsiveCSSFrom8(20).height
          }}
        >
          {this.tab_headers.map((header, idx) => (
            <A_Button_Opacity
              value={header.title}
              strong={this.state.activeTab === idx}
              onPress={header.onPress}
              style={[
                style.tabOptionContainerStyles,
                this.state.activeTab === idx && style.activeTabStyles
              ]}
              buttonTextStyles={[
                style.tabHeaderTextStyles,
                this.state.activeTab === idx && style.activeTabTextStyles
              ]}
            />
          ))}
        </A_View>
        {this.getActiveTabContent()}
        {this.renderLoadMoreButton()}
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