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
    const { deal, reward } = props.screenProps;
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
      data.type = props.navigation.state.params.reward_type.toLowerCase();
      if (data.type === "reward_redeem")
        data.points_to_redeem = props.navigation.state.params.points_to_redeem;
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
    const { deal, reward } = this.props.screenProps;
    let help_text = "Present this code to the restaurant.";
    let header_text = "COUPON CODE";
    if (deal) {
      help_text = "Present your coupon code to the restaurant.";
      header_text = "COUPON CODE";
    } else if (reward) {
      help_text = "Present your rewards card code to the restaurant.";
      header_text = `${reward.vendor.name} LOYALTY REWARDS CARD`;
    }
    return (
      <ScreenContainer
        noHeader
        containerStyle={{ padding: getResponsiveCSSFrom8(10).width }}
      >
        <A_Icon_Close onPress={this.close} />
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            flex: 1,
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
