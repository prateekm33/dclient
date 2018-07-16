import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "../redux";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import { A_View, A_Text, A_Input, A_Button_Opacity } from "chemics/Atoms";
import {
  updateCustomerAction,
  sendPWChangeEmailAction
} from "../redux/actions/customer.actions";
import { getResponsiveCSSFrom8 } from "../utils";
import { RED_TWO, TEAL_DARK_THREE } from "../styles/Colors";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.customer.email
    };
  }

  savePersonalInfo = () => {
    const { email } = this.state;
    const updates = {
      email
    };
    this.props.dispatch(updateCustomerAction(updates));
  };

  changeEmail = email => this.setState({ email });

  sendPWChangeEmail = () => {
    this.props.dispatch(sendPWChangeEmailAction()).then(sent => {
      this.setState({ pwEmailSent: true });
    });
  };

  render() {
    const customer = this.props.customer;
    return (
      <ScreenContainer
        title="Profile"
        scrollView
        containerStyle={style.scrollContainerStyles}
        innerContainerStyle={style.scrollInnerContainerStyles}
      >
        <A_View style={[style.sectionContainerStyles]}>
          <A_Text style={[style.sectionTitleStyles, style.paddedContentStyles]}>
            GENERAL
          </A_Text>
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
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "white",
    alignItems: "center"
  },
  sectionTitleStyles: {
    color: "grey",
    fontSize: getResponsiveCSSFrom8(20).height,
    marginBottom: getResponsiveCSSFrom8(5).height
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
  paddedContentStyles: { paddingHorizontal: getResponsiveCSSFrom8(10).width }
});
