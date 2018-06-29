import React, { Component } from "react";
import { connect } from "../redux";
import { View } from "react-native";
import ScreenContainer from "../Templates/ScreenContainer";
import { A_ListContainer, A_Icon, A_Button } from "../Atoms";
import { M_TabSelect_Pill, M_Deal_Card_Basic } from "../Molecules";

class CategoriesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIdx: 0
    };
  }

  componentWillMount = () => {
    // TODO...dispatch action to fetch all deals
  };

  showAllDeals = () => {
    // TODO...dispatch action to fetch all deals
    this.setState({ activeIdx: 0 });
  };
  showAllVendors = () => {
    // TODO...dispatch action to fetch all vendors
    this.setState({ activeIdx: 1 });
  };
  onTabSelect = idx => {
    if (idx === 0) return this.showAllDeals();
    if (idx === 1) return this.showAllVendors();
  };

  renderTabContent = () => {
    let list;
    switch (this.state.activeIdx) {
      case 0:
        list = this.renderAllDeals();
        break;
      case 1:
        list = this.renderAllVendors();
        break;
      default:
        return null;
    }
    return (
      <View>
        {list}
        <A_Button value="Load more" onPress={this.loadMore} />
      </View>
    );
  };

  loadMore = () => {
    switch (this.state.activeIdx) {
      case 0:
        // TODO...fetch action to load more deals
        console.warn("TODO...fetch action to load more deals");
        break;
      case 1:
        // TODO...fetch action to load more vendors
        console.warn("TODO...fetch action to load more vendors");
        break;
      default:
        return;
    }
  };

  renderAllDeals = () => {
    return (
      <A_ListContainer>
        {this.props.deals.map(deal => <M_Deal_Card_Basic {...deal} />)}
      </A_ListContainer>
    );
  };

  render() {
    return (
      <ScreenContainer>
        <M_TabSelect_Pill
          label="categories-page-pill"
          tabs={[
            <A_Icon source={require("../assets/global_icon.png")} />,
            <A_Icon source={require("../assets/global_icon.png")} />
          ]}
          onTabSelect={this.onTabSelect}
        />
        {this.renderTabContent()}
      </ScreenContainer>
    );
  }
}
const mapStateToProps = state => ({
  deals: state.deals,
  vendors: state.vendors
});
export default connect(mapStateToProps)(CategoriesPage);
