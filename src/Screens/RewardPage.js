import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "../redux";
import { FeatureFlags } from "../../config/DebugConfig";
import ScreenContainer from "../Templates/ScreenContainer";
import { O_Vendor_Info, O_RewardPurchaseHistory, O_Modal } from "../Organisms";
import { A_Icon_Share, A_Text, A_Button, A_Input } from "../Atoms";
import { M_RewardPointsGraphic } from "../Molecules";
import { SCREEN_NAMES } from "../AppNavigator";
import {
  unsubscribeFromRewardCardAction,
  fetchRewardCustomerDetailsAction,
  fetchRewardDetailsAction,
  subscribeToRewardCardAction
} from "../redux/actions/rewards.actions";
import { MAIN_SCREEN_NAMES } from "../MainNavigator";
import { MODAL_SCREEN_NAMES } from "../ModalNavigator";

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
    const one = this.props.dispatch(
      fetchRewardDetailsAction(
        this.state.reward.vendor_uuid,
        this.state.reward.uuid
      )
    );
    const two = this.props.dispatch(
      fetchRewardCustomerDetailsAction(
        this.state.reward.vendor_uuid,
        this.state.reward.uuid
      )
    );

    Promise.all([one, two]).then(results => {
      let reward_joined = false;
      const reward = results[1] || results[0];
      if (!reward) return;
      if (results[1]) reward_joined = true;
      this.setState({ reward, vendor: reward.vendor, reward_joined });
    });
  };

  leave = () => {
    this.props
      .dispatch(
        unsubscribeFromRewardCardAction(
          this.state.reward.vendor_uuid,
          this.state.reward.uuid
        )
      )
      .then(done => {
        if (!done) return;
        this.setState({ reward_joined: false });
      });
  };

  join = () => {
    this.props
      .dispatch(
        subscribeToRewardCardAction(
          this.state.reward.vendor_uuid,
          this.state.reward.uuid,
          this.state.reward
        )
      )
      .then(reward => {
        if (!reward) return;
        this.setState({ reward_joined: true, reward });
      });
  };

  showRedeemModal = () => {
    this.setState({ showRedeemModal: true });
  };
  closeRedeemModal = () => {
    this.setState({ showRedeemModal: false, points_to_redeem: 0 });
  };

  redeem = () => {
    this.props.mainNavigation.navigate(MAIN_SCREEN_NAMES.ModalNavigator, {
      routeName: MODAL_SCREEN_NAMES.RedeemModal,
      params: {
        reward: this.state.reward,
        reward_type: "reward_redeem",
        points_to_redeem: this.state.points_to_redeem
      }
    });

    // this.props.navigation.navigate(SCREEN_NAMES.RedeemPage, {
    //   reward: this.state.reward,
    //   reward_type: "reward_redeem",
    //   points_to_redeem: this.state.points_to_redeem
    // });
  };
  earn = () => {
    this.props.mainNavigation.navigate(MAIN_SCREEN_NAMES.ModalNavigator, {
      routeName: MODAL_SCREEN_NAMES.RedeemModal,
      params: {
        reward: this.state.reward,
        reward_type: "reward_earn"
      }
    });
    // this.props.navigation.navigate(SCREEN_NAMES.RedeemPage, {
    //   reward: this.state.reward,
    //   reward_type: "reward_earn"
    // });
  };

  setNumPointsToRedeem = points_to_redeem =>
    this.setState({ points_to_redeem });

  share = () => {
    console.warn("----TODO...share...");
  };

  render() {
    const reward = this.state.reward;
    return (
      <ScreenContainer title={`${reward.name}`}>
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
          <A_Icon_Share onPress={this.share} />
        </View>
        {this.state.reward_joined && (
          <View>
            <M_RewardPointsGraphic todo="TODOO...." />
            <A_Text>Member since {this.state.reward.memberSince()}</A_Text>
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
            {FeatureFlags.PurchaseHistory && (
              <O_RewardPurchaseHistory todo="TODO...figure out right props to send and finish component" />
            )}
          </View>
        )}
        <View>
          <A_Text strong>PROGRAM DETAILS</A_Text>
          <A_Text strong>{reward.name}</A_Text>
          <A_Text>{reward.long_desc}</A_Text>
        </View>
        <View>
          <A_Text strong>{reward.vendor.type.toUpperCase()} DETAILS</A_Text>
          <O_Vendor_Info vendor={reward.vendor} />
        </View>
        <A_Button
          value={this.state.reward_joined ? "LEAVE PROGRAM" : "JOIN PROGRAM"}
          onPress={this.state.reward_joined ? this.leave : this.join}
        />
        {this.state.reward_joined && (
          <O_Modal
            show={this.state.showRedeemModal}
            close={this.closeRedeemModal}
          >
            <View>
              <A_Text>How many points would you like to redeem?</A_Text>
              <A_Text strong>MAX: {reward.points}</A_Text>
              {!reward.points && (
                <A_Text>
                  You don't have enough points to redeem. Earn some by scanning
                  your loyalty card with each purchase!
                </A_Text>
              )}
              <A_Input
                onChangeText={this.setNumPointsToRedeem}
                placeholder="Num of points to redeem"
                editable={!reward.points}
              />
              <A_Button
                onPress={this.redeem}
                disabled={!reward.points}
                value="REDEEM"
              />
            </View>
          </O_Modal>
        )}
      </ScreenContainer>
    );
  }
}

export default connect()(RewardPage);
