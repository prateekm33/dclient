import { FeatureFlags } from "../../config/DebugConfig";
import React, { Component } from "react";
import { connect } from "../redux";
import { KeyboardAvoidingView } from "react-native";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import {
  A_Button,
  A_View,
  A_Icon_All,
  A_Icon_Saved,
  A_Icon_Map,
  A_Icon_List,
  A_ListContainer,
  A_Button_Opacity,
  A_View_Scroll
} from "chemics/Atoms";
import { M_Card_Vendor_Mini, M_Searchbar } from "chemics/Molecules";
import { O_Map_Vendors } from "../Organisms";
import {
  fetchAllVendorsAction,
  fetchFollowingVendorsAction,
  searchVendorsAction
} from "../redux/actions/vendor.actions";
import { TEAL_DARK_THREE, REALLY_HOT_PINK } from "../styles/Colors";
import { getResponsiveCSSFrom8 } from "../utils";
import { BOTTOM_NAV_HEIGHT } from "../styles/defaults";
import { MAIN_SCREEN_NAMES } from "../MainNavigator";
import { MODAL_SCREEN_NAMES } from "../ModalNavigator";

class VendorsPage extends Component {
  constructor(props) {
    super(props);
    this.limit = 50;
    this.state = {
      flavor: "all",
      map_view: true,
      vendors: [],
      offset: 0,
      all_fetched: false,
      searched_vendors: [],
      search_term: "",
      search_offset: 0,
      all_search_fetched: false
    };
  }

  componentWillMount = () => {
    this.fetchVendors(fetchAllVendorsAction);
  };

  loadMore = () => {
    let action;
    if (this.state.search_term) {
      return this.setState(
        { search_offset: this.state.search_offset + this.search_limit },
        () => {
          return this.loadMoreSearches(this.state.search_term);
        }
      );
    } else if (this.state.flavor === "all") {
      action = fetchAllVendorsAction;
    } else if (this.state.flavor === "following") {
      action = fetchFollowingVendorsAction;
    }

    return this.fetchVendors(action);
  };

  fetchVendors = fetchAction => {
    if (this.state.all_fetched) return;
    const limit = this.state.map_view ? 100 : this.limit;
    return this.props
      .dispatch(fetchAction(limit, this.state.offset))
      .then(res => {
        if (res.end) {
          this.setState({ all_fetched: true });
        } else {
          this.setState({
            offset: this.state.offset + limit,
            vendors: this.state.vendors.concat(res.vendors)
          });
        }
        return res;
      });
  };

  loadMoreSearches = search => {
    const limit = this.search_limit;
    const offset = this.state.search_offset;
    this.props
      .dispatch(searchVendorsAction({ search, limit, offset }))
      .then(vendors => {
        if (!vendors || !vendors.length)
          return this.setState({ all_search_fetched: true });
        this.setState({
          searched_vendors: this.state.searched_vendors.concat(vendors),
          search_term: search,
          all_search_fetched: false
        });
      });
  };
  searchVendors = search => {
    if (!search) {
      return this.setState({
        search_term: "",
        searched_vendors: [],
        search_offset: 0,
        all_search_fetched: false
      });
    } else
      this.setState(
        {
          search_term: search,
          search_offset: 0
        },
        () => this.executeSearch(search)
      );
  };

  executeSearch = search => {
    const limit = this.search_limit;
    const offset = this.state.search_offset;
    this.props
      .dispatch(searchVendorsAction({ search, limit, offset }))
      .then(vendors => {
        this.setState({
          searched_vendors: vendors ? vendors : [],
          all_search_fetched: (vendors || []).length ? false : true
        });
      });
  };

  showFlavorAll = () => {
    if (this.state.flavor === "all") return;
    this.setState(
      { all_fetched: false, offset: 0, vendors: [], flavor: "all" },
      () => {
        this.fetchVendors(fetchAllVendorsAction);
      }
    );
  };
  showFlavorFollowing = () => {
    if (this.state.flavor === "following") return;
    this.setState(
      { all_fetched: false, offset: 0, vendors: [], flavor: "following" },
      () => {
        this.fetchVendors(fetchFollowingVendorsAction);
      }
    );
  };

  showMapView = () => this.setState({ map_view: true });
  showListView = () => this.setState({ map_view: false });
  renderPageOptions = () => {
    return (
      <A_View style={{ flexDirection: "row", flexWrap: "nowrap" }}>
        {!this.state.map_view ? (
          <A_Icon_Map
            onPress={this.showMapView}
            disabled={this.state.map_view}
          />
        ) : (
          <A_Icon_List
            onPress={this.showListView}
            disabled={!this.state.map_view}
          />
        )}
      </A_View>
    );
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

  navigateToVendor = vendor => {
    this.props.mainNavigation.navigate(MAIN_SCREEN_NAMES.ModalNavigator, {
      routeName: MODAL_SCREEN_NAMES.VendorModal,
      params: { vendor }
    });
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
            title="Restarants"
            rightHeaderComponent={this.renderPageOptions()}
            scrollView={!this.state.map_view}
            innerContainerStyle={{ padding: 0 }}
            statusBarStyle="dark-content"
          >
            {this.state.map_view ? (
              <O_Map_Vendors
                vendors={
                  this.state.search_term
                    ? this.state.searched_vendors
                    : this.state.vendors
                }
                mapContainerStyle={{
                  flex: 1
                }}
                onMarkerPress={this.navigateToVendor}
              />
            ) : (
              <A_View style={{ marginBottom: BOTTOM_NAV_HEIGHT * 2 }}>
                <A_ListContainer
                  data={
                    this.state.search_term
                      ? this.state.searched_vendors
                      : this.state.vendors
                  }
                  keyExtractor={vendor =>
                    `vendor-${vendor.name}-${vendor.uuid}`
                  }
                  renderItem={this.renderVendorListItem}
                />
                {this.state.vendors.length && (
                  <A_Button
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
            )}
            {FeatureFlags.FollowVendor && (
              <A_View
                style={[
                  {
                    backgroundColor: "white",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    padding: getResponsiveCSSFrom8(10).width
                  },
                  this.state.map_view && {
                    position: "absolute",
                    ...Platform.select({
                      ios: { zIndex: 1000 },
                      android: { elevation: 1000 }
                    }),
                    borderBottomWidth: 1,
                    borderBottomColor: "lightgrey",
                    borderRightWidth: 1,
                    borderRightColor: "lightgrey"
                  }
                ]}
              >
                <A_Icon_All onPress={this.showFlavorAll} />
                <A_Icon_Saved onPress={this.showFlavorFollowing} />
              </A_View>
            )}
          </ScreenContainer>
          <M_Searchbar
            onSearch={this.searchVendors}
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
            close={() => this.searchVendors("")}
          />
        </A_View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(VendorsPage);
