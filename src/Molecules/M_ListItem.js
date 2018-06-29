import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import {
  A_Text,
  A_Image,
  A_Button_Opacity,
  A_Button,
  A_Button_Location
} from "../Atoms";
import { M_Deal_Thumbnail } from "./M_Deal";
import { getResponsiveCSSFrom8 } from "../utils";

const M_ListItem = props => {
  return (
    <View style={[style.listItemStyle, props.listItemStyle]}>
      {props.source && <A_Image source={props.source} />}
      <View>
        <A_Text strong>{props.title}</A_Text>
        <A_Text>{props.desc}</A_Text>
      </View>
      {props.children}
    </View>
  );
};

const M_ListItem_Vendor_Favorite = props => (
  <View style={[style.listItemStyle, props.listItemStyle]}>
    {props.source && <A_Image source={props.source} />}
    <View>
      <A_Text strong>{props.name}</A_Text>
      <A_Button_Location
        location={props.location}
        value={props.address_locale}
      />
      <A_Text>{props.desc}</A_Text>
    </View>
    <A_Text strong>Current Deals</A_Text>

    {!props.deals.length ? (
      <A_Text>No new deals</A_Text>
    ) : (
      <View>
        {props.deals.map(deal => <M_Deal_Thumbnail {...deal} />)}
        <View>
          <A_Button
            value="View more"
            onPress={props.navigation.navigate(SCREEN_NAMES.VendorPage, {
              vendor: props.vendor
            })}
          />
        </View>
      </View>
    )}
    <A_Button_Opacity
      onPress={() => {
        console.warn("----todo...remove favorite");
      }}
      style={style.favoriteIconButton}
    >
      <A_Image source={require("../assets/favorites_icon.png")} />
    </A_Button_Opacity>
  </View>
);
M_ListItem_Vendor_Favorite.propTypes = {
  name: PropTypes.string.isRequired,
  address_locale: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  deals: PropTypes.array.isRequired,
  vendor: PropTypes.object.isRequired
};

export { M_ListItem, M_ListItem_Vendor_Favorite };

const style = StyleSheet.create({
  listItemStyle: {
    paddingVertical: getResponsiveCSSFrom8(10).height
  },
  favoriteIconButton: {
    position: "absolute",
    right: getResponsiveCSSFrom8(5).width,
    top: 0,
    width: getResponsiveCSSFrom8(25).width,
    height: getResponsiveCSSFrom8(25).width
  }
});
