import config from "../../config";
import React, { Component } from "react";
import { KeyboardAvoidingView } from "react-native";
import { connect } from "../redux";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import {
  A_View,
  A_Button_Opacity,
  A_ListContainer,
  A_View_Scroll
} from "chemics/Atoms";
import {
  M_Card_LoyaltyReward_Mini,
  M_Searchbar,
  M_Card_Vendor_Mini
} from "chemics/Molecules";
import { SCREEN_NAMES } from "../AppNavigator";
import { getResponsiveCSSFrom8 } from "../utils";
import { fetchMyRewardsCardsAction } from "../redux/actions/rewards.actions";
import { TEAL_DARK_THREE, REALLY_HOT_PINK } from "../styles/Colors";
import { searchRewardsAction } from "../redux/actions/vendor.actions";
import { MAIN_SCREEN_NAMES } from "../MainNavigator";
import { MODAL_SCREEN_NAMES } from "../ModalNavigator";
import { BOTTOM_NAV_HEIGHT } from "../styles/defaults";

class MyRewardsPage extends Component {
  constructor(props) {
    super(props);
    this.limit = 50;
    this.search_limit = 25;
    this.state = {
      rewards: [],
      offset: 0,
      all_fetched: false,
      is_searching: false,
      vendors: [],
      search_offset: 0,
      all_search_fetched: false,
      search_term: ""
    };
  }

  componentDidMount = () => {
    this.fetchMyRewards();
  };

  fetchMyRewards = () => {
    this.props
      .dispatch(fetchMyRewardsCardsAction(this.limit, this.state.offset))
      .then(res => {
        if (!res || res.end) return this.setState({ all_fetched: true });
        return this.setState({
          rewards: this.state.rewards.concat(res.loyalty_rewards),
          offset: this.state.offset + this.limit
        });
      });
  };

  renderMyRewards = () => {
    return (
      <A_ListContainer
        data={this.state.rewards}
        keyExtractor={item => `reward-${item.code}`}
        renderItem={this.renderCard}
        noneLabel="Nothing here, for now. Let's go ahead and change that! Search for rewards programs by your favorite restaurants below."
      />
    );
  };

  renderCard = ({ item }) => {
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
  };

  loadMore = () => {
    if (this.state.search_term) {
      return this.setState(
        { search_offset: this.state.search_offset + this.search_limit },
        () => {
          return this.loadMoreSearches(this.state.search_term);
        }
      );
    } else return this.fetchMyRewards();
  };

  searchRewards = search => {
    if (!search)
      return this.setState({
        all_search_fetched: false,
        vendors: [],
        is_searching: false,
        search_offset: 0,
        search_term: ""
      });
    const limit = this.search_limit;
    const offset = this.state.search_offset;
    this.props
      .dispatch(searchRewardsAction({ search, limit, offset }))
      .then(vendors => {
        if (!vendors) return this.setState({ all_search_fetched: true });
        this.setState({
          search_term: search,
          vendors: vendors,
          all_search_fetched: !vendors.length
        });
      });
  };
  loadMoreSearches = search => {
    const limit = this.search_limit;
    const offset = this.state.search_offset;
    this.props
      .dispatch(searchRewardsAction({ search, limit, offset }))
      .then(vendors => {
        if (!vendors) return this.setState({ all_search_fetched: true });
        this.setState({
          vendors: this.state.vendors.concat(vendors),
          search_term: search,
          all_search_fetched: !vendors.length
        });
      });
  };

  navigateToVendor = vendor => {
    this.props.mainNavigation.navigate(MAIN_SCREEN_NAMES.ModalNavigator, {
      routeName: MODAL_SCREEN_NAMES.VendorModal,
      params: { vendor }
    });
  };
  renderVendorListItem = ({ item }) => {
    return (
      <M_Card_Vendor_Mini
        vendor={item}
        image={
          item.thumbnail_url
            ? `${config.cloudinary}/${item.thumbnail_url}`
            : null
        }
        imageStyles={{ width: "100%", height: "100%" }}
        onPress={() => {
          this.navigateToVendor(item);
        }}
      >
        <A_View_Scroll
          horizontal={true}
          style={{ marginTop: getResponsiveCSSFrom8(5).height }}
        >
          {item.cuisines.map(cuisine => (
            <A_Button_Opacity
              value={(cuisine || "").toUpperCase()}
              style={{
                marginRight: getResponsiveCSSFrom8(5).width,
                paddingVertical: getResponsiveCSSFrom8(2).width,
                paddingHorizontal: getResponsiveCSSFrom8(5).width,
                backgroundColor: REALLY_HOT_PINK,
                height: getResponsiveCSSFrom8(20).height,
                borderRadius: 0
              }}
              buttonTextStyles={{
                color: "white",
                fontSize: getResponsiveCSSFrom8(12).height
              }}
              strong
              disabled={true}
            />
          ))}
        </A_View_Scroll>
      </M_Card_Vendor_Mini>
    );
  };

  renderVendors = () => {
    return (
      <A_ListContainer
        data={this.state.vendors}
        keyExtractor={vendor => `vendor-${vendor.name}-${vendor.uuid}`}
        renderItem={this.renderVendorListItem}
      />
    );
  };

  render() {
    return (
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        style={{ position: "relative", flex: 1 }}
      >
        <A_View style={{ flex: 1 }}>
          <ScreenContainer
            title="My Rewards Cards"
            statusBarStyle="dark-content"
            scrollView
            innerContainerStyle={{ padding: 0 }}
          >
            <A_View style={{ marginBottom: BOTTOM_NAV_HEIGHT * 2 }}>
              {this.state.search_term
                ? this.renderVendors()
                : this.renderMyRewards()}
              {(this.state.search_term || this.state.rewards.length) && (
                <A_Button_Opacity
                  disabled={
                    this.state.search_term
                      ? this.state.all_search_fetched
                      : this.state.all_fetched
                  }
                  onPress={this.loadMore}
                  value={
                    (this.state.search_term
                    ? this.state.all_search_fetched
                    : this.state.all_fetched)
                      ? "ALL LOADED"
                      : "LOAD MORE"
                  }
                  style={[
                    {
                      backgroundColor: "white",
                      borderWidth: 1,
                      borderColor: TEAL_DARK_THREE
                    },
                    (this.state.search_term
                      ? this.state.all_search_fetched
                      : this.state.all_fetched) && { borderWidth: 0 }
                  ]}
                  buttonTextStyles={[
                    {
                      color: TEAL_DARK_THREE,
                      textAlign: "center"
                    },
                    (this.state.search_term
                      ? this.state.all_search_fetched
                      : this.state.all_fetched) && { color: "grey" }
                  ]}
                  strong={
                    !(this.state.search_term
                      ? this.state.all_search_fetched
                      : this.state.all_fetched)
                  }
                />
              )}
            </A_View>
          </ScreenContainer>
          <M_Searchbar
            onSearch={this.searchRewards}
            containerStyles={{
              borderTopWidth: 0.5,
              borderTopColor: "#bdbdbd",
              padding: getResponsiveCSSFrom8(10).width,
              backgroundColor: "white"
            }}
            inputStyles={{
              backgroundColor: "white",
              borderWidth: 0.6,
              borderColor: "lightgrey"
            }}
            close={() => this.searchRewards("")}
          />
        </A_View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(MyRewardsPage);
