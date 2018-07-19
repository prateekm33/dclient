import React, { Component } from "react";
import { connect } from "../redux";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import { A_View, A_Button_Opacity, A_ListContainer } from "chemics/Atoms";
import { M_Card_LoyaltyReward_Mini } from "chemics/Molecules";
import { SCREEN_NAMES } from "../AppNavigator";
import { getResponsiveCSSFrom8 } from "../utils";
import { fetchMyRewardsCardsAction } from "../redux/actions/rewards.actions";
import { TEAL_DARK_THREE } from "../styles/Colors";

class MyRewardsPage extends Component {
  constructor(props) {
    super(props);
    this.limit = 50;
    this.state = {
      rewards: [],
      offset: 0,
      all_fetched: false
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
    return this.fetchMyRewards();
  };

  render() {
    return (
      <ScreenContainer
        title="My Rewards Cards"
        statusBarStyle="dark-content"
        scrollView
        innerContainerStyle={{ padding: 0 }}
      >
        {this.renderMyRewards()}
        {this.state.rewards.length && (
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

export default connect()(MyRewardsPage);
