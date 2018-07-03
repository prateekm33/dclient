import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "../redux";
import ScreenContainer from "../Templates/ScreenContainer";
import { O_Vendor_Info, O_RewardPurchaseHistory } from "../Organisms";
import { A_Icon_Share, A_Text, A_Button, A_Icon_Save, A_Input } from "../Atoms";
import { M_RewardPointsGraphic } from "../Molecules";
import { SCREEN_NAMES } from "../AppNavigator";

class RewardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reward_joined: false,
      reward_saved: false,
      reward: this.props.navigation.state.params.reward,
      showRedeemModal: false,
      points_to_redeem: null
    };
  }

  componentDidMount = () => {
    console.warn("-----TODO...dispatch action to fetch reward details");
    // ie: whether or not reward program was joined, the descriptions/details/restaurant info, etc
    // ie: fetch vendor details from reward.vendor_id
  };
  leave = () => {
    console.warn("----TODO...LEAVE");
  };
  join = () => {
    console.warn("----TODO...JOIN");
  };

  showRedeemModal = () => {
    this.setState({ showRedeemModal: true });
  };
  closeRedeemModal = () => {
    this.setState({ showRedeemModal: false, points_to_redeem: 0 });
  };

  redeem = () => {
    this.props.navigation.navigate(SCREEN_NAMES.RedeemPage, {
      reward: this.state.reward,
      reward_type: "reward_redeem",
      points_to_redeem: this.state.points_to_redeem
    });
  };
  earn = () => {
    this.props.navigation.navigate(SCREEN_NAMES.RedeemPage, {
      reward: this.state.reward,
      reward_type: "reward_earn"
    });
  };

  save = () => {
    console.warn("-----SAVE REWARD");
  };

  unsave = () => {
    console.warn("------UNSAVE REWARD");
  };

  setNumPointsToRedeem = points_to_redeem =>
    this.setState({ points_to_redeem });

  render() {
    const reward = this.state.reward;
    return (
      <ScreenContainer title={`${reward.title}`}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "flex-end",
            width: "100%"
          }}
        >
          {!this.state.reward_joined && (
            <A_Button onPress={this.join} value="JOIN" />
          )}
          {this.state.reward_saved ? (
            <A_Icon_Saved onPress={this.unsave} />
          ) : (
            <A_Icon_Save onPress={this.save} />
          )}
          <A_Icon_Share />
        </View>
        {this.state.reward_joined && (
          <View>
            <M_RewardPointsGraphic todo="TODOO...." />
            <A_Text>Member since {"TODO..."}</A_Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between"
              }}
            >
              <A_Button onPress={this.showRedeemModal} value="REDEEM" />
              <A_Button onPress={this.earn} value="EARN" />
            </View>
            <O_RewardPurchaseHistory todo="TODO...figure out right props to send and finish component" />
          </View>
        )}
        <View>
          <A_Text strong>PROGRAM DETAILS</A_Text>
          <A_Text strong>{reward.title}</A_Text>
          <A_Text>{reward.long_desc}</A_Text>
        </View>
        <View>
          <A_Text strong>{reward.vendor.type.toUpperCase()} DETAILS</A_Text>
          <O_Vendor_Info vendor={reward.vendor} />
        </View>
        <A_Button value="JOIN PROGRAM" onPress={this.join} />
        {reward.customer && (
          <Modal
            show={this.state.showRedeemModal}
            close={this.closeRedeemModal}
          >
            <View>
              <A_Text>How many points would you like to redeem?</A_Text>
              <A_Text strong>MAX: {reward.customer.total_points}</A_Text>
              <A_Input onChangeText={this.setNumPointsToRedeem} />
              <A_Button onPress={this.redeem} value="REDEEM" />
            </View>
          </Modal>
        )}
      </ScreenContainer>
    );
  }
}

export default connect()(RewardPage);
