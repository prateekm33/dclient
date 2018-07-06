import React, { Component } from "react";
import { connect } from "../redux";
import { View } from "react-native";
import ScreenContainer from "../Templates/ScreenContainer";
import { O_Map_Deals, O_List_Deals } from "../Organisms";
import {
  A_Icon_All,
  A_Icon_Saved,
  A_Icon_Map,
  A_Icon_List,
  A_Button
} from "../Atoms";
import {
  fetchAllDealsAction,
  fetchSavedDealsAction
} from "../redux/actions/deals.actions";

class DealsPage extends Component {
  constructor(props) {
    super(props);
    this.limit = 50;
    this.state = {
      map_view: true,
      flavor: "all",
      deals: [],
      offset: 0,
      all_fetched: false
    };
  }

  componentWillMount = () => {
    this.fetchDeals(fetchAllDealsAction);
  };

  loadMore = () => {
    let action;
    if (this.state.flavor === "all") {
      action = fetchAllDealsAction;
    } else if (this.state.flavor === "saved") {
      action = fetchSavedDealsAction;
    }

    return this.fetchDeals(action);
  };

  fetchDeals = fetchAction => {
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
            deals: this.state.deals.concat(res.deals)
          });
        }
        return res;
      });
  };

  showFlavorAll = () => {
    if (this.state.flavor === "all") return;
    this.setState({ all_fetched: false, offset: 0, deals: [] }, () => {
      this.fetchDeals(fetchAllDealsAction).then(res => {
        if (res.end) return;
        this.setState({ flavor: "all" });
      });
    });
  };
  showFlavorSaved = () => {
    if (this.state.flavor === "saved") return;
    this.setState({ all_fetched: false, offset: 0, deals: [] }, () => {
      this.fetchDeals(fetchSavedDealsAction).then(res => {
        if (res.end) return;
        this.setState({ flavor: "saved" });
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
        title="Deals"
        rightHeaderComponent={this.renderPageOptions()}
      >
        {this.state.map_view ? (
          <O_Map_Deals deals={this.state.deals} />
        ) : (
          <View>
            <O_List_Deals deals={this.state.deals} />
            <A_Button
              disabled={this.state.all_fetched}
              onPress={this.loadMore}
              value={this.state.all_fetched ? "ALL LOADED" : "LOAD MORE"}
            />
          </View>
        )}
        <View
          style={{
            position: "absolute",
            top: 30,
            backgroundColor: "white",
            flexDirection: "row",
            flexWrap: "nowrap"
          }}
        >
          <A_Icon_All onPress={this.showFlavorAll} />
          <A_Icon_Saved onPress={this.showFlavorSaved} />
        </View>
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({
  savedDeals: state.customer.getFavoriteDeals()
});
export default connect(mapStateToProps)(DealsPage);
