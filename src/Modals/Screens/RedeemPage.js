import React, { Component } from "react";
import { connect } from "../../redux";
import { View } from "react-native";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import { A_Icon_Close, A_Text } from "chemics/Atoms";
import QRCode from "react-native-qrcode-svg";
import { getResponsiveCSSFrom8 } from "../../utils";

class RedeemPage extends Component {
  constructor(props) {
    super(props);
    const _props = props.navigation.state.params || {};
    const { deal, reward } = _props;
    /**
     * data shape
     *
     * type: String ('deal', 'reward_redeem', 'reward_earn')
     * code: String - deal code or reward code
     * customer_id: Number
     * points_to_redeem: Number (only if type === 'reward_redeem')
     */
    let data = {
      customer: this.props.customer.getScannableCustomer()
    };
    if (deal) {
      const { code, uuid, vendor, is_used } = deal;
      const vendor_uuid = vendor.uuid;
      const customer_uuid = this.props.customer.uuid;
      data = {
        type: "deal",
        code,
        uuid,
        is_used,
        vendor_uuid,
        customer_uuid
      };
    } else if (reward) {
      const { code, uuid, vendor, num_points_redeemed, points } = reward;
      const vendor_uuid = vendor.uuid;
      const customer_uuid = this.props.customer.uuid;
      data.type = _props.reward_type.toLowerCase();
      if (data.type === "reward_redeem")
        data.points_to_redeem = _props.points_to_redeem;
      data = {
        ...data,
        code,
        uuid,
        customer_uuid,
        vendor_uuid,
        num_points_redeemed,
        points
      };
    }
    this.data = data;
  }

  close = () => this.props.screenProps.mainNavigation.goBack();

  render() {
    const { deal, reward } = this.props.screenProps.params;
    let help_text = "Present this code to the restaurant.";
    let header_text = "COUPON CODE";
    let title = "";
    if (deal) {
      help_text = "Present your coupon code to the restaurant.";
      header_text = "COUPON CODE";
      title = "Redeem Deal";
    } else if (reward) {
      help_text = "Present your rewards card code to the restaurant.";
      header_text = `${reward.vendor.name} LOYALTY REWARDS CARD`;
      title = "Redeem Points";
    }
    title = this.props.screenProps.params.title || title;
    return (
      <ScreenContainer
        title={title}
        containerStyle={{ padding: getResponsiveCSSFrom8(10).width }}
        onClose={this.close}
      >
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            paddingBottom: getResponsiveCSSFrom8(50).height
          }}
        >
          <A_Text style={{ fontSize: getResponsiveCSSFrom8(25).height }} strong>
            {header_text}
          </A_Text>
          <QRCode value={JSON.stringify(this.data)} size={200} />
          <A_Text
            style={{
              fontSize: getResponsiveCSSFrom8(25).height,
              textAlign: "center"
            }}
          >
            {help_text}
          </A_Text>
        </View>
      </ScreenContainer>
    );
  }
}

export default connect(state => ({
  customer: state.customer
}))(RedeemPage);
