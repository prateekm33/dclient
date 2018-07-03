import React, { Component } from "react";
import { connect } from "../redux";
import ScreenContainer from "../Templates/ScreenContainer";
import { O_Map_Deals, O_List_Deals } from "../Organisms";
import {
  A_Icon_All,
  A_Icon_Saved,
  A_Icon_Favorites,
  A_Button_Opacity,
  A_Icon_Map,
  A_Icon_List
} from "../Atoms";

class DealsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map_view: true,
      flavor: "all",
      deals: props.deals
    };
  }

  showFlavorAll = () => {
    this.state.flavor !== "all" &&
      this.setState({ flavor: "all", deals: this.props.deals });
  };
  showFlavorFavorites = () => {
    this.state.flavor !== "favorites" &&
      this.setState({
        flavor: "favorites",
        deals: this.props.favoriteDeals
      });
  };
  showFlavorSaved = () => {
    this.state.flavor !== "saved" &&
      this.setState({
        flavor: "saved",
        deals: this.props.savedDeals
      });
  };

  toggleView = () => this.setState({ map_view: !this.state.map_view });
  renderPageOptions = () => {
    return (
      <View>
        <A_Icon_Map onPress={this.toggleView} />
        <A_Icon_List onPress={this.toggleView} />
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
          <View>
            <View>
              <A_Icon_All onPress={this.showFlavorAll} />
              <A_Icon_Saved onPress={this.showFlavorSaved} />
              <A_Icon_Favorites onPress={this.showFlavorFavorites} />
            </View>
            <O_Map_Deals deals={this.state.deals} />
          </View>
        ) : (
          <O_List_Deals deals={this.state.deals} />
        )}
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({
  deals: [], // TODO -- replace --> state.deals
  favoriteDeals: [], // TODO -- parse state to get user's fav deals
  savedDeals: [] // TODO -- parse state to get user's saved deals

  // rewards: [], // TODO -- replace --> state.rewards
  // favoriteRewards: [], // TODO -- parse state to get user's fav rewards
  // savedRewards: [] // TODO -- parse state to get user's saved rewards
});
export default connect(mapStateToProps)(DealsPage);
