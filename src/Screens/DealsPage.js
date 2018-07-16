import { FeatureFlags } from "../../config/DebugConfig";
import React, { Component } from "react";
import { Platform } from "react-native";
import { connect } from "../redux";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import { O_Map_Deals } from "../Organisms";
import {
  A_Icon_All,
  A_Icon_Saved,
  A_Icon_Map,
  A_Icon_List,
  A_Button_Opacity,
  A_View,
  A_ListContainer
} from "chemics/Atoms";
import { M_Card_Deal_Mini } from "chemics/Molecules";
import {
  fetchAllDealsAction,
  fetchSavedDealsAction
} from "../redux/actions/deals.actions";
import { SCREEN_NAMES } from "../AppNavigator";
import { getResponsiveCSSFrom8 } from "../utils";
import { TEAL_DARK_THREE } from "../styles/Colors";

class DealsPage extends Component {
  constructor(props) {
    super(props);
    this.limit = 50;
    this.state = {
      map_view: false,
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
    this.setState(
      { all_fetched: false, offset: 0, deals: [], flavor: "all" },
      () => {
        this.fetchDeals(fetchAllDealsAction);
      }
    );
  };
  showFlavorSaved = () => {
    if (this.state.flavor === "saved") return;
    this.setState(
      { all_fetched: false, offset: 0, deals: [], flavor: "saved" },
      () => {
        this.fetchDeals(fetchSavedDealsAction);
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
  renderDeal = ({ item }) => {
    return (
      <M_Card_Deal_Mini
        deal={item}
        onPress={() => {
          return this.props.navigation.navigate(SCREEN_NAMES.DealPage, {
            deal: item
          });
        }}
      />
    );
  };
  render() {
    return (
      <ScreenContainer
        title={this.state.flavor === "all" ? "All Deals" : "Saved Deals"}
        statusBarStyle="dark-content"
        rightHeaderComponent={this.renderPageOptions()}
        rightHeaderComponentStyle={{}}
        scrollView={!this.state.map_view}
        innerContainerStyle={{ padding: 0 }}
      >
        {this.state.map_view ? (
          <O_Map_Deals deals={this.state.deals} />
        ) : (
          <A_View>
            <A_ListContainer
              data={this.state.deals}
              keyExtractor={item => `deal-${item.code}`}
              renderItem={this.renderDeal}
            />
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
          </A_View>
        )}
        {FeatureFlags.SaveDeals && (
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
            <A_Icon_Saved onPress={this.showFlavorSaved} />
          </A_View>
        )}
        <A_View style={{ marginBottom: getResponsiveCSSFrom8(100).height }} />
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(DealsPage);
