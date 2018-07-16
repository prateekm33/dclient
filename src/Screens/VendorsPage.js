import { FeatureFlags } from "../../config/DebugConfig";
import React, { Component } from "react";
import { connect } from "../redux";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import {
  A_Button,
  A_View,
  A_Icon_All,
  A_Icon_Saved,
  A_Icon_Map,
  A_Icon_List,
  A_ListContainer
} from "chemics/Atoms";
import { O_Map_Vendors } from "../Organisms";
import { M_Card_Vendor_Mini } from "chemics/Molecules";
import {
  fetchAllVendorsAction,
  fetchFollowingVendorsAction
} from "../redux/actions/vendor.actions";
import { TEAL_DARK_THREE } from "../styles/Colors";
import { getResponsiveCSSFrom8 } from "../utils";
import { SCREEN_NAMES } from "../AppNavigator";

class VendorsPage extends Component {
  constructor(props) {
    super(props);
    this.limit = 50;
    this.state = {
      flavor: "all",
      map_view: false,
      vendors: [],
      offset: 0,
      all_fetched: false
    };
  }

  componentWillMount = () => {
    this.fetchVendors(fetchAllVendorsAction);
  };

  loadMore = () => {
    let action;
    if (this.state.flavor === "all") {
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
        onPress={() => {
          this.props.navigation.navigate(SCREEN_NAMES.VendorPage, {
            vendor: item
          });
        }}
      />
    );
  };

  render() {
    return (
      <ScreenContainer
        title="Restarants"
        rightHeaderComponent={this.renderPageOptions()}
        scrollView
      >
        {this.state.map_view ? (
          <O_Map_Vendors vendors={this.state.vendors} />
        ) : (
          <A_View>
            <A_ListContainer
              data={this.state.vendors}
              keyExtractor={vendor => `vendor-${vendor.name}-${vendor.uuid}`}
              renderItem={this.renderVendorListItem}
            />
            <A_Button
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
        <A_View style={{ marginBottom: getResponsiveCSSFrom8(100).height }} />
      </ScreenContainer>
    );
  }
}

export default connect()(VendorsPage);
