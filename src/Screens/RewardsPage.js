import React, { Component } from "react";
import { connect } from "../redux";
import ScreenContainer from "../Templates/ScreenContainer";
import { O_Map_Rewards, O_List_Rewards } from "../Organisms";
import {
  A_Icon_All,
  A_Icon_Saved,
  A_Icon_Favorites,
  A_Button_Opacity
} from "../Atoms";

class RewardsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map_view: true,
      flavor: "all",
      rewards: props.rewards
    };
  }

  showFlavorAll = () => {
    this.state.flavor !== "all" &&
      this.setState({ flavor: "all", rewards: this.props.rewards });
  };
  showFlavorFavorites = () => {
    this.state.flavor !== "favorites" &&
      this.setState({
        flavor: "favorites",
        rewards: this.props.favoriteRewards
      });
  };
  showFlavorSaved = () => {
    this.state.flavor !== "saved" &&
      this.setState({
        flavor: "saved",
        rewards: this.props.savedRewards
      });
  };

  render() {
    return (
      <ScreenContainer title="Rewards">
        {this.state.map_view ? (
          <View>
            <View>
              <A_Icon_All onPress={this.showFlavorAll} />
              <A_Icon_Saved onPress={this.showFlavorSaved} />
              <A_Icon_Favorites onPress={this.showFlavorFavorites} />
            </View>
            <O_Map_Rewards rewards={this.state.rewards} />
          </View>
        ) : (
          <O_List_Rewards rewards={this.state.rewards} />
        )}
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({
  rewards: [], // TODO -- replace --> state.rewards
  favoriteRewards: [], // TODO -- parse state to get user's fav rewards
  savedRewards: [] // TODO -- parse state to get user's saved rewards
});
export default connect(mapStateToProps)(RewardsPage);
