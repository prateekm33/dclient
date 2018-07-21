import { FeatureFlags } from "../../config/DebugConfig";
import React, { Component } from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { connect } from "../redux";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import { A_View, A_Text, A_Input, A_Button_Opacity } from "chemics/Atoms";
import {
  updateCustomerAction,
  sendPWChangeEmailAction,
  logoutAction
} from "../redux/actions/customer.actions";
import { getResponsiveCSSFrom8 } from "../utils";
import { RED_TWO, TEAL_DARK_THREE } from "../styles/Colors";
import { SCREEN_NAMES } from "../AppNavigator";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.customer.email,
      first_name: props.customer.first_name,
      last_name: props.customer.last_name,
      changes_made: false
    };
  }

  savePersonalInfo = () => {
    const { email, first_name, last_name } = this.state;
    const updates = {
      email,
      last_name,
      first_name
    };
    this.props.dispatch(updateCustomerAction(updates));
  };

  getChangesMade = () => {
    if (
      this.state.first_name !== this.props.customer.first_name ||
      this.state.last_name !== this.props.customer.last_name
    ) {
      this.setState({ changes_made: true });
    } else this.setState({ changes_made: false });
  };
  changeEmail = email => this.setState({ email });
  changeFirstName = first_name => {
    const newState = { first_name };
    this.setState(newState, () => {
      this.getChangesMade();
    });
  };
  changeLastName = last_name => {
    const newState = { last_name };
    this.setState(newState, () => {
      this.getChangesMade();
    });
  };

  sendPWChangeEmail = () => {
    this.props.dispatch(sendPWChangeEmailAction()).then(sent => {
      this.setState({ pwEmailSent: true });
    });
  };

  logout = () => {
    this.props.dispatch(logoutAction()).then(success => {
      if (!success) return;
      this.props.navigation.resetTo(SCREEN_NAMES.SplashScreen);
    });
  };

  navigateToHistory = () => {
    console.warn("-----TODO...");
  };

  render() {
    const customer = this.props.customer;
    return (
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        style={{ position: "relative", flex: 1 }}
      >
        <ScreenContainer
          title="Profile"
          scrollView
          containerStyle={style.scrollContainerStyles}
          innerContainerStyle={style.scrollInnerContainerStyles}
          statusBarStyle="dark-content"
        >
          <A_View style={[style.sectionContainerStyles]}>
            <A_View
              style={[
                {
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: getResponsiveCSSFrom8(30).height
                },
                style.paddedContentStyles
              ]}
            >
              <A_Text style={[style.sectionTitleStyles]}>GENERAL</A_Text>
              {this.state.changes_made && (
                <A_Button_Opacity
                  value="Save"
                  onPress={this.savePersonalInfo}
                  style={{}}
                  buttonTextStyles={[{ color: "blue" }]}
                  strong
                />
              )}
            </A_View>
            <A_Text
              style={[
                {
                  color: "grey",
                  fontSize: getResponsiveCSSFrom8(15).height,
                  marginBottom: getResponsiveCSSFrom8(10).height
                },
                style.paddedContentStyles
              ]}
            >
              Email remains fixed as the one used during signup.
            </A_Text>
            <A_View
              style={[style.infoDetailLineStyles, style.paddedContentStyles]}
            >
              <A_Text style={[style.infoLabelStyles]}>First name</A_Text>
              <A_Input
                placeholder="First name"
                defaultValue={customer.first_name}
                onChangeText={this.changeFirstName}
                style={[style.infoDetailStyles]}
              />
            </A_View>
            <A_View
              style={[style.infoDetailLineStyles, style.paddedContentStyles]}
            >
              <A_Text style={[style.infoLabelStyles]}>Last name</A_Text>
              <A_Input
                placeholder="Last name"
                defaultValue={customer.last_name}
                onChangeText={this.changeLastName}
                style={[style.infoDetailStyles]}
              />
            </A_View>
            <A_View
              style={[style.infoDetailLineStyles, style.paddedContentStyles]}
            >
              <A_Text style={[style.infoLabelStyles]}>Email</A_Text>
              <A_Input
                placeholder="Email"
                defaultValue={customer.email}
                onChangeText={this.changeEmail}
                editable={false}
                style={[style.infoDetailStyles]}
              />
            </A_View>
            {FeatureFlags.PurchaseHistory && (
              <A_View
                style={[style.infoDetailLineStyles, style.paddedContentStyles]}
              >
                <A_Text style={[style.infoLabelStyles]}>History</A_Text>
                <A_Button_Opacity
                  style={[style.infoDetailArrowStyles, { borderRadius: 0 }]}
                  onPress={this.navigateToHistory}
                />
              </A_View>
            )}
          </A_View>
          <A_View style={[style.paddedContentStyles]}>
            <A_Button_Opacity
              strong
              disabled={this.state.pwEmailSent}
              onPress={this.sendPWChangeEmail}
              value={
                this.state.pwEmailSent
                  ? "Check email for recovery link"
                  : "Change Password"
              }
              style={{
                borderWidth: 1,
                borderColor: TEAL_DARK_THREE,
                marginBottom: getResponsiveCSSFrom8(20).height
              }}
              buttonTextStyles={{ textAlign: "center", color: TEAL_DARK_THREE }}
            />
            {/* <A_Button_Opacity
            strong
            value="SAVE"
            onPress={this.savePersonalInfo}
            style={[style.saveButtonStyles]}
            buttonTextStyles={style.saveButtonTextStyles}
          /> */}
            <A_Button_Opacity
              onPress={this.logout}
              value="LOGOUT"
              style={style.logoutButtonStyles}
              buttonTextStyles={style.logoutButtonTextStyles}
              strong
            />
          </A_View>
        </ScreenContainer>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(state => ({
  customer: state.customer
}))(ProfilePage);

const style = StyleSheet.create({
  logoutButtonStyles: {
    marginBottom: getResponsiveCSSFrom8(50).height,
    backgroundColor: RED_TWO,
    alignItems: "center"
  },
  logoutButtonTextStyles: {
    color: "white",
    fontSize: getResponsiveCSSFrom8(20).height
  },
  saveButtonStyles: {
    alignItems: "center",
    marginVertical: getResponsiveCSSFrom8(20).height,
    backgroundColor: "#3D9990"
  },
  saveButtonTextStyles: {
    color: "white",
    fontSize: getResponsiveCSSFrom8(20).height
  },
  infoDetailLineStyles: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "white",
    alignItems: "center",
    height: getResponsiveCSSFrom8(60).height
  },
  sectionTitleStyles: {
    color: "grey"
    // fontSize: getResponsiveCSSFrom8(20).height,
    // marginBottom: getResponsiveCSSFrom8(5).height
  },
  sectionContainerStyles: {
    marginVertical: getResponsiveCSSFrom8(40).height
  },
  scrollContainerStyles: { backgroundColor: "rgba(255,255,255,0.6)" },
  scrollInnerContainerStyles: { padding: 0 },
  infoDetailStyles: {
    fontSize: getResponsiveCSSFrom8(18).height
  },
  infoLabelStyles: {
    fontSize: getResponsiveCSSFrom8(20).height
  },
  paddedContentStyles: { paddingHorizontal: getResponsiveCSSFrom8(10).width },
  infoDetailArrowStyles: {
    width: getResponsiveCSSFrom8(20).width,
    height: getResponsiveCSSFrom8(20).width,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: "grey",
    transform: [{ rotate: "45deg" }],
    marginRight: getResponsiveCSSFrom8(10).width
  }
});
