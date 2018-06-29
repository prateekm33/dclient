import React, { Component } from "react";
import { connect } from "../redux";
import ScreenContainer from "../Templates/ScreenContainer";
import { M_Deal_Card_Detailed } from "../Molecules";
import { A_ListContainer } from "../Atoms";

class VendorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deals: []
    };
  }

  renderDeals = () => {
    return (
      <A_ListContainer>
        {this.state.deals.map(deal => <M_Deal_Card_Detailed {...deal} />)}
      </A_ListContainer>
    );
  };

  render() {
    const { vendor } = props.navigation.state.params || {};
    return (
      <ScreenContainer title={`${vendor.name} Deals`}>
        {this.renderDeals()}
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
export default connect()(VendorPage);
