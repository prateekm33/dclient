import React, { Component } from "react";
import { connect } from "../../redux";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import {
  A_Text,
  A_Icon_Saved,
  A_Icon_Save,
  A_Image,
  A_View,
  A_Button_Opacity
} from "chemics/Atoms";
import { O_Vendor_Info } from "../../Organisms";
import {
  fetchDealDetailsAction,
  unSaveDealAction,
  saveDealAction,
  fetchDealCustomerDetailsAction,
  createMyDealAction
} from "../../redux/actions/deals.actions";
import { MyDeal } from "../../Models";
import { getResponsiveCSSFrom8 } from "../../utils";
import { DEAL_MODAL_SCREEN_NAMES } from "../DealModal";
import { LIGHTGREY_ONE } from "../../styles/Colors";

class DealPage extends Component {
  constructor(props) {
    super(props);
    let deal, vendor;
    if (props.navigation.state.params) {
      deal = props.navigation.state.params.deal;
    } else if (props.screenProps) {
      deal = props.screenProps.params.deal;
    }
    vendor = deal.vendor;
    this.state = {
      is_saved: false,
      deal,
      vendor
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
      console.warn(is_saved);
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
      this.props.navigation.navigate(DEAL_MODAL_SCREEN_NAMES.RedeemPage, {
        deal: this.state.deal
      });
    });
  };

  share = () => {
    console.warn("----TODO...share...");
  };

  close = () => this.props.screenProps.mainNavigation.goBack();

  renderRowOne = () => {
    return (
      <A_View
        style={[
          {
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            alignItems: "center"
          }
        ]}
      >
        <A_Text
          strong
          style={[{ fontSize: getResponsiveCSSFrom8(24).height, flex: 1 }]}
        >
          {this.state.deal.name}
        </A_Text>
        <A_View
          style={{
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "flex-end",
            flex: 1
          }}
        >
          <A_Button_Opacity onPress={this.redeem} value="Redeem" />
          {this.state.is_saved ? (
            <A_Icon_Saved onPress={this.unsave} />
          ) : (
            <A_Icon_Save onPress={this.save} />
          )}
        </A_View>
      </A_View>
    );
  };

  renderDesc = () => {
    return <A_Text style={[]}>{this.state.deal.long_desc}</A_Text>;
  };

  renderInfo = () => {
    return <O_Vendor_Info vendor={this.state.vendor} />;
  };

  render() {
    const { deal } = this.state;
    return (
      <ScreenContainer
        title={`Deal #${deal.code}`}
        statusBarStyle="dark-content"
        containerStyle={{
          backgroundColor: LIGHTGREY_ONE
        }}
        innerContainerStyle={{ padding: 0 }}
        onClose={this.close}
        scrollView
      >
        <A_Image
          source={{ uri: deal.thumbnail_url }}
          style={{
            width: "100%",
            height: getResponsiveCSSFrom8(150).height
          }}
        />
        <A_View
          style={[
            {
              backgroundColor: LIGHTGREY_ONE
            }
          ]}
        >
          <A_View
            style={[
              {
                backgroundColor: "white",
                padding: getResponsiveCSSFrom8(10).width
              }
            ]}
          >
            {this.renderRowOne()}
            {this.renderDesc()}
          </A_View>
          {this.renderInfo()}
        </A_View>
        <A_View style={{ marginBottom: getResponsiveCSSFrom8(30).height }} />
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(DealPage);
