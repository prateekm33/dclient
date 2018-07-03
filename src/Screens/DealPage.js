import React, { Component } from "react";
import { connect } from "../redux";
import ScreenContainer from "../Templates/ScreenContainer";
import { A_Text, A_Icon_Saved, A_Icon_Save, A_Button } from "../Atoms";
import { O_Vendor_Info } from "../Organisms";
import { SCREEN_NAMES } from "../AppNavigator";

class DealPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal_saved: false,
      deal: props.navigation.state.params.deal
    };
  }

  componentDidMount = () => {
    console.warn("-----TODO...dispatch action to fetch deal details");
    // ie: whether or not deal was saved, the descriptions/details/restaurant info, etc
    // ie: fetch vendor details from deal.vendor_id
  };

  unsave = () => {
    console.warn("----TODO...UNSAVE");
  };
  save = () => {
    console.warn("----TODO...SAVE");
  };

  redeem = () => {
    this.props.navigation.navigate(SCREEN_NAMES.RedeemPage, {
      deal: this.state.deal
    });
  };

  render() {
    const { deal } = this.state.deal;
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
          {this.state.deal_saved ? (
            <A_Icon_Saved onPress={this.unsave} />
          ) : (
            <A_Icon_Save onPress={this.save} />
          )}
        </View>
        {deal.image && <A_Image source={deal.image.source} />}
        <A_Text strong>{deal.title}</A_Text>
        <A_Text>{deal.long_desc}</A_Text>
        <O_Vendor_Info vendor={deal.vendor} />
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(DealPage);
