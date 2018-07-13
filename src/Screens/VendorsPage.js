import { FeatureFlags } from "../../config/DebugConfig";
import React, { Component } from "react";
import ScreenContainer from "../Templates/ScreenContainer";
import {
  A_Button,
  A_View,
  A_Icon_All,
  A_Icon_Saved,
  A_Icon_Map,
  A_Icon_List
} from "../Atoms";
import { O_Map_Vendors, O_List_Vendors } from "../Organisms";
import {
  fetchAllVendorsAction,
  fetchFollowingVendorsAction
} from "../redux/actions/vendor.actions";

class VendorsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flavor: "all",
      map_view: true
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
    this.setState({ all_fetched: false, offset: 0, vendors: [] }, () => {
      this.fetchVendors(fetchAllVendorsAction).then(res => {
        if (res.end) return;
        this.setState({ flavor: "all" });
      });
    });
  };
  showFlavorFollowing = () => {
    if (this.state.flavor === "following") return;
    this.setState({ all_fetched: false, offset: 0, vendors: [] }, () => {
      this.fetchVendors(fetchFollowingVendorsAction).then(res => {
        if (res.end) return;
        this.setState({ flavor: "following" });
      });
    });
  };

  showMapView = () => this.setState({ map_view: true });
  showListView = () => this.setState({ map_view: false });
  renderPageOptions = () => {
    return (
      <View style={{ flexDirection: "row", flexWrap: "nowrap" }}>
        <A_Icon_Map onPress={this.showMapView} disabled={this.state.map_view} />
        <A_Icon_List
          onPress={this.showListView}
          disabled={!this.state.map_view}
        />
      </View>
    );
  };

  render() {
    return (
      <ScreenContainer
        title="Restarants"
        rightHeaderComponent={this.renderPageOptions()}
      >
        {this.state.map_view ? (
          <O_Map_Vendors vendors={this.state.vendors} />
        ) : (
          <A_View>
            <O_List_Vendors vendors={this.state.vendors} />
            <A_Button
              disabled={this.state.all_fetched}
              onPress={this.loadMore}
              value={this.state.all_fetched ? "ALL LOADED" : "LOAD MORE"}
            />
          </A_View>
        )}
        {FeatureFlags.FollowVendor && (
          <A_View
            style={{
              position: "absolute",
              top: 30,
              backgroundColor: "white",
              flexDirection: "row",
              flexWrap: "nowrap"
            }}
          >
            <A_Icon_All onPress={this.showFlavorAll} />
            <A_Icon_Saved onPress={this.showFlavorFollowing} />
          </A_View>
        )}
      </ScreenContainer>
    );
  }
}

export default VendorsPage;
