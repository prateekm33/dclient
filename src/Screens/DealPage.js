import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "../redux";
import ScreenContainer from "../Templates/ScreenContainer";
import {
  A_Text,
  A_Icon_Saved,
  A_Icon_Save,
  A_Button,
  A_Icon_Share
} from "../Atoms";
import { O_Vendor_Info } from "../Organisms";
import { SCREEN_NAMES } from "../AppNavigator";
import {
  fetchDealDetailsAction,
  unSaveDealAction,
  saveDealAction,
  fetchDealCustomerDetailsAction,
  createMyDealAction
} from "../redux/actions/deals.actions";
import { MyDeal } from "../Models";

class DealPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_saved: false,
      deal: props.navigation.state.params.deal,
      vendor: props.navigation.state.params.deal.vendor
    };
  }

  componentDidMount = () => {
    const one = this.props.dispatch(
      fetchDealDetailsAction(this.state.deal.vendor_uuid, this.state.deal.uuid)
    );
    const two = this.props.dispatch(
      fetchDealCustomerDetailsAction(
        this.state.deal.vendor_uuid,
        this.state.deal.uuid
      )
    );

    Promise.all([one, two]).then(results => {
      let is_saved = false;
      const deal = results[1] || results[0];
      if (!deal) return;
      if (results[1]) is_saved = deal.is_saved;
      this.setState({ deal, vendor: deal.vendor, is_saved });
    });
  };

  unsave = () => {
    this.props
      .dispatch(unSaveDealAction(this.state.deal.uuid, this.state.vendor.uuid))
      .then(deal => {
        if (!deal) return;
        this.setState({ deal });
      });
  };
  save = () => {
    this.props
      .dispatch(
        saveDealAction(
          this.state.deal.uuid,
          this.state.vendor.uuid,
          this.state.deal
        )
      )
      .then(deal => {
        if (!deal) return;
        this.setState({ deal });
      });
  };

  redeem = () => {
    let promise = Promise.resolve(true);
    if (!(this.state.deal instanceof MyDeal)) {
      promise = this.props.dispatch(
        createMyDealAction(this.state.deal.uuid, this.state.deal.vendor_uuid)
      );
    }
    promise.then(done => {
      if (!done) {
        console.warn("--TODO: DISPLAY STATE ERROR : something went wrong");
        return;
      }
      this.props.navigation.navigate(SCREEN_NAMES.RedeemPage, {
        deal: this.state.deal
      });
    });
  };

  share = () => {
    console.warn("----TODO...share...");
  };

  render() {
    const { deal } = this.state;
    return (
      <ScreenContainer title={`Deal #${deal.code}`}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "flex-end",
            width: "100%"
          }}
        >
          <A_Button onPress={this.redeem} value="Redeem" />
          {this.state.is_saved ? (
            <A_Icon_Saved onPress={this.unsave} />
          ) : (
            <A_Icon_Save onPress={this.save} />
          )}
          <A_Icon_Share onPress={this.share} />
        </View>
        {deal.image && <A_Image source={deal.image.source} />}
        <A_Text strong>{deal.name}</A_Text>
        <A_Text>{deal.long_desc}</A_Text>
        <O_Vendor_Info vendor={this.state.vendor} />
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(DealPage);
