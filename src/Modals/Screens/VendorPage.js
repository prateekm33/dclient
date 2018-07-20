import config from "../../../config";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "../../redux";
import MapView, { Marker } from "react-native-maps";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import {
  A_View,
  A_ListContainer,
  A_Button_Opacity,
  A_Text,
  A_Text_Email,
  A_Icon_Navigate
} from "chemics/Atoms";
import { M_Card_Deal_Mini, M_Card_LoyaltyReward_Mini } from "chemics/Molecules";
import { O_Vendor_Info, O_VendorReviewMetrics } from "../../Organisms";
import {
  fetchVendorDealsAction,
  fetchVendorRewardsAction
} from "../../redux/actions/deals.actions";
import {
  TEAL_DARK_THREE,
  REALLY_HOT_PINK,
  LIGHTGREY_ONE
} from "../../styles/Colors";
import {
  getResponsiveCSSFrom8,
  callPhoneNumber,
  openGoogleMapTo
} from "../../utils";
import { VENDOR_MODAL_SCREEN_NAMES } from "../VendorModal";
import { M_Vendor_Hours } from "../../Molecules";

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
      activeTab: 0
    };
    this.map_marker = {
      latitude: this.state.vendor.latitude,
      longitude: this.state.vendor.longitude
    };
    this.tab_headers = [
      { title: "General", onPress: this.showGeneral },
      { title: "Deals", onPress: this.showDeals },
      { title: "Rewards", onPress: this.showRewards }
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

  renderGeneral = () => {
    return (
      <A_View>
        <O_VendorReviewMetrics
          vendor={this.state.vendor}
          containerStyles={{
            backgroundColor: "white"
          }}
        />
        <A_View
          style={{
            paddingVertical: getResponsiveCSSFrom8(10).width,
            backgroundColor: LIGHTGREY_ONE,
            width: "100%"
          }}
        >
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
        </A_View>
        <A_View
          style={[{ backgroundColor: "white" }, style.paddedContentStyles]}
        >
          <A_View style={[style.infoDetailLineContainerStyles]}>
            <A_Text style={{ color: "grey" }}>Directions</A_Text>
            <A_Icon_Navigate onPress={this.getDirections} />
          </A_View>
          <A_View style={[style.infoDetailLineContainerStyles]}>
            <A_Text style={{ color: "grey" }}>Phone</A_Text>
            <A_Button_Opacity
              value={this.state.vendor.formattedPhoneNumber()}
              onPress={this.callVendor}
              strong
            />
          </A_View>
          <A_View style={[style.infoDetailLineContainerStyles]}>
            <A_Text style={{ color: "grey" }}>Email</A_Text>
            <A_Text_Email>{this.state.vendor.business_email}</A_Text_Email>
          </A_View>
          <M_Vendor_Hours hours={this.state.vendor.hours} />
        </A_View>
      </A_View>
    );
  };
  renderDeals = () => {
    return (
      <A_View
        style={[
          {
            backgroundColor: "white",
            paddingBottom: getResponsiveCSSFrom8(20).height
          },
          style.paddedContentStyles
        ]}
      >
        <A_ListContainer
          data={this.state.deals}
          renderItem={({ item }) => {
            return (
              <M_Card_Deal_Mini
                deal={item}
                onPress={() => {
                  this.navigateToDeal(item);
                }}
                image={
                  item.thumbnail_url
                    ? `${config.cloudinary}/${item.thumbnail_url}`
                    : null
                }
                imageStyles={{ width: "100%", height: "100%" }}
              />
            );
          }}
          keyExtractor={deal => `vendor-deal-${deal.code}`}
        />
        {this.state.deals.length && this.renderLoadMoreButton()}
      </A_View>
    );
  };
  renderRewards = () => {
    return (
      <A_View
        style={[
          {
            backgroundColor: "white",
            paddingBottom: getResponsiveCSSFrom8(20).height
          },
          style.paddedContentStyles
        ]}
      >
        <A_ListContainer
          data={this.state.rewards}
          renderItem={({ item }) => {
            return (
              <M_Card_LoyaltyReward_Mini
                reward={item}
                image={
                  item.thumbnail_url
                    ? `${config.cloudinary}/${item.thumbnail_url}`
                    : null
                }
                imageStyles={{ width: "100%", height: "100%" }}
                onPress={() => {
                  this.navigateToReward(item);
                }}
              />
            );
          }}
          keyExtractor={reward => `vendor-reward-${reward.code}`}
        />
        {this.state.rewards.length && this.renderLoadMoreButton()}
      </A_View>
    );
  };
  renderInfo = () => <O_Vendor_Info vendor={this.state.vendor} />;

  getActiveTabContent = () => {
    if (this.state.activeTab === 0) return this.renderGeneral();
    if (this.state.activeTab === 1) return this.renderDeals();
    if (this.state.activeTab === 2) return this.renderRewards();
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
        if (idx === 1) return this.fetchVendorDeals();
        if (idx === 2) return this.fetchVendorRewards();
      }
    );
  };
  showGeneral = () => this.setActiveTab(0);
  showDeals = () => this.setActiveTab(1);
  showRewards = () => this.setActiveTab(2);

  renderLoadMoreButton = () => {
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
  getDirections = () => {
    openGoogleMapTo(this.state.vendor.address);
  };

  render() {
    return (
      <ScreenContainer
        title={this.state.vendor.name}
        scrollView
        statusBarStyle="dark-content"
        onClose={this.close}
        innerContainerStyle={{ padding: 0 }}
        containerStyle={{
          backgroundColor: LIGHTGREY_ONE
        }}
      >
        <A_View
          style={[
            {
              flexDirection: "row",
              flexWrap: "nowrap",
              marginBottom: getResponsiveCSSFrom8(5).height,
              borderBottomWidth: 1,
              borderColor: LIGHTGREY_ONE,
              backgroundColor: "white"
            },
            style.paddedContentStyles
          ]}
        >
          {this.tab_headers.map((header, idx) => (
            <A_Button_Opacity
              value={header.title}
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
        <A_View style={{ marginBottom: getResponsiveCSSFrom8(30).height }} />
      </ScreenContainer>
    );
  }
}

export default connect()(VendorPage);

const style = StyleSheet.create({
  tabHeaderTextStyles: {
    color: "lightgrey",
    fontSize: getResponsiveCSSFrom8(20).height
  },
  tabOptionContainerStyles: {
    paddingRight: getResponsiveCSSFrom8(15).width
  },
  activeTabStyles: {},
  activeTabTextStyles: {
    color: REALLY_HOT_PINK
  },
  infoDetailLineContainerStyles: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center"
  },
  paddedContentStyles: {
    paddingHorizontal: getResponsiveCSSFrom8(10).width
  }
});

/**
 * fetchVendorReviews = () => {
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
 */
