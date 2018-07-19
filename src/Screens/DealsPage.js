import config from "../../config";
import { FeatureFlags } from "../../config/DebugConfig";
import React, { Component } from "react";
import { Platform, Dimensions } from "react-native";
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
import { M_Card_Deal_Mini, M_Searchbar } from "chemics/Molecules";
import {
  fetchAllDealsAction,
  fetchSavedDealsAction,
  searchDealsAction
} from "../redux/actions/deals.actions";
import { SCREEN_NAMES } from "../AppNavigator";
import { getResponsiveCSSFrom8 } from "../utils";
import { TEAL_DARK_THREE } from "../styles/Colors";
import { BOTTOM_NAV_HEIGHT } from "../styles/defaults";
import { MODAL_SCREEN_NAMES } from "../ModalNavigator";
import { MAIN_SCREEN_NAMES } from "../MainNavigator";

class DealsPage extends Component {
  constructor(props) {
    super(props);
    this.limit = 10;
    this.search_limit = 25;
    this.state = {
      map_view: true,
      flavor: "all",
      deals: [],
      offset: 0,
      all_fetched: false,
      searched_deals: [],
      search_term: "",
      search_offset: 0,
      all_search_fetched: false
    };
  }

  componentWillMount = () => {
    this.fetchDeals(fetchAllDealsAction);
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

  loadMoreSearches = search => {
    const limit = this.search_limit;
    const offset = this.state.search_offset;
    this.props
      .dispatch(searchDealsAction({ search, limit, offset }))
      .then(deals => {
        if (!deals || !deals.length)
          return this.setState({ all_search_fetched: true });
        this.setState({
          searched_deals: this.state.searched_deals.concat(deals),
          search_term: search,
          all_search_fetched: false
        });
      });
  };
  searchDeals = search => {
    if (!search) {
      return this.setState({
        search_term: "",
        searched_deals: [],
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
      .dispatch(searchDealsAction({ search, limit, offset }))
      .then(deals => {
        this.setState({
          searched_deals: deals ? deals : [],
          all_search_fetched: (deals || []).length ? false : true
        });
      });
  };

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
  renderDeal = ({ item, index }) => {
    return (
      <M_Card_Deal_Mini
        image={
          item.thumbnail_url
            ? `${config.cloudinary}/${item.thumbnail_url}`
            : null
        }
        imageStyles={{ width: "100%", height: "100%" }}
        deal={item}
        onPress={() => {
          this.navigateToDeal(item);
        }}
      />
    );
  };

  navigateToDeal = deal => {
    this.props.mainNavigation.navigate(MAIN_SCREEN_NAMES.ModalNavigator, {
      routeName: MODAL_SCREEN_NAMES.DealModal,
      params: {
        deal
      }
    });
  };

  render() {
    return (
      <A_View>
        <ScreenContainer
          title={this.state.flavor === "all" ? "All Deals" : "Saved Deals"}
          statusBarStyle="dark-content"
          rightHeaderComponent={this.renderPageOptions()}
          scrollView={!this.state.map_view}
          innerContainerStyle={{ padding: 0 }}
        >
          {this.state.map_view ? (
            <O_Map_Deals
              deals={
                this.state.search_term
                  ? this.state.searched_deals
                  : this.state.deals
              }
              mapContainerStyle={{
                width: "100%",
                marginBottom:
                  BOTTOM_NAV_HEIGHT * 2 + getResponsiveCSSFrom8(50).height
              }}
              navigateToDeal={this.navigateToDeal}
            />
          ) : (
            <A_View style={{ marginBottom: BOTTOM_NAV_HEIGHT * 2 }}>
              <A_ListContainer
                data={
                  this.state.search_term
                    ? this.state.searched_deals
                    : this.state.deals
                }
                keyExtractor={(item, index) => `deal-${item.code}-${index}`}
                renderItem={this.renderDeal}
              />
              <A_Button_Opacity
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
        </ScreenContainer>
        <M_Searchbar
          onSearch={this.searchDeals}
          containerStyles={{
            position: "absolute",
            bottom: BOTTOM_NAV_HEIGHT - getResponsiveCSSFrom8(10).height,
            backgroundColor: "white",
            borderTopWidth: 0.5,
            borderTopColor: "#bdbdbd"
          }}
        />
      </A_View>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(DealsPage);
