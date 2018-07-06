import React, { Component } from "react";
import { connect } from "../redux";
import { View } from "react-native";
import ScreenContainer from "../Templates/ScreenContainer";
import { A_Icon_Close, A_Text } from "../Atoms";
import QRCode from "react-native-qrcode-svg";
import { getResponsiveCSSFrom8 } from "../utils";

class RedeemPage extends Component {
  constructor(props) {
    super(props);
    const { deal, reward } = props.navigation.state.params;
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
      data = { type: "deal", ...deal };
    } else if (reward) {
      data.type = props.navigation.state.params.reward_type.toLowerCase();
      data.code = reward.code;
      if (data.type === "reward_redeem")
        data.points_to_redeem = props.navigation.state.params.points_to_redeem;
      data = { ...data, ...reward };
    }
    this.data = data;
  }

  render() {
    const { deal, reward } = props.navigation.state.params;
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
        <A_Icon_Close onPress={() => this.props.navigation.goBack()} />
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
  user: state.user
}))(RedeemPage);
