import React, { Component } from "react";
import { connect } from "../redux";
import { View } from "react-native";
import ScreenContainer from "../Templates/ScreenContainer";
import { O_Map_Rewards, O_List_Rewards } from "../Organisms";
import {
  A_Icon_All,
  A_Icon_Saved,
  A_Icon_Map,
  A_Icon_List,
  A_Button
} from "../Atoms";
import {
  fetchAllRewardsCardsAction,
  fetchMyRewardsCardsAction
} from "../redux/actions/rewards.actions";

class RewardsPage extends Component {
  constructor(props) {
    super(props);
    this.limit = 50;
    this.state = {
      map_view: true,
      flavor: "all",
      rewards: [],
      offset: 0
    };
  }

  componentWillMount = () => {
    this.fetchRewardsCards(fetchAllRewardsCardsAction);
  };

  loadMore = () => {
    let action;
    if (this.state.flavor === "all") {
      action = fetchAllRewardsCardsAction;
    } else if (this.state.flavor === "mine") {
      action = fetchMyRewardsCardsAction;
    }

    return this.fetchRewardsCards(action);
  };

  fetchRewardsCards = fetchAction => {
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
            rewards: this.state.rewards.concat(res.loyalty_rewards)
          });
        }
        return res;
      });
  };

  showFlavorAll = () => {
    if (this.state.flavor === "all") return;
    this.setState({ all_fetched: false, offset: 0, rewards: [] }, () => {
      this.fetchRewardsCards(fetchAllRewardsCardsAction).then(res => {
        if (res.end) return;
        this.setState({ flavor: "all" });
      });
    });
  };
  showFlavorMine = () => {
    if (this.state.flavor === "mine") return;
    this.setState({ all_fetched: false, offset: 0, rewards: [] }, () => {
      this.fetchRewardsCards(fetchMyRewardsCardsAction).then(res => {
        if (res.end) return;
        this.setState({ flavor: "mine" });
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
        title="Rewards"
        rightHeaderComponent={this.renderPageOptions()}
      >
        {this.state.map_view ? (
          <O_Map_Rewards rewards={this.state.rewards} />
        ) : (
          <View>
            <O_List_Rewards rewards={this.state.rewards} />
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
          <A_Icon_Saved onPress={this.showFlavorMine} />
        </View>
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(RewardsPage);
