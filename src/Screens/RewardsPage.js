import React, { Component } from "react";
import { connect } from "../redux";
import { View } from "react-native";
import ScreenContainer from "../Templates/ScreenContainer";
import { O_Map_Rewards, O_List_Rewards } from "../Organisms";
import { A_Icon_All, A_Icon_Saved } from "../Atoms";
import {
  fetchAllRewardsCardsAction,
  fetchMyRewardsCardsAction
} from "../redux/actions/rewards.actions";

class RewardsPage extends Component {
  constructor(props) {
    super(props);
    this.limit = 20;
    this.state = {
      map_view: true,
      flavor: "all",
      rewards: props.rewards,
      offset: 0
    };
  }

  componentWillMount = () => {
    const limit = this.state.map_view ? 100 : this.limit;
    this.props.dispatch(fetchAllRewardsCardsAction(limit));
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
    this.state.flavor !== "all" &&
      this.setState({ flavor: "all", rewards: this.props.rewards });
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

  render() {
    return (
      <ScreenContainer title="Rewards">
        {this.state.map_view ? (
          <O_Map_Rewards rewards={this.state.rewards} />
        ) : (
          <View>
            <O_List_Rewards rewards={this.state.rewards} />
            <A_Button onPress={this.loadMore} value="Load More" />
          </View>
        )}
        <View
          style={{ position: "absolute", top: 30, backgroundColor: "white" }}
        >
          <A_Icon_All onPress={this.showFlavorAll} />
          <A_Icon_Saved onPress={this.showFlavorMine} />
        </View>
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({
  rewards: [] // TODO -- replace --> state.rewards
});
export default connect(mapStateToProps)(RewardsPage);
