import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { M_Vendor_Hours } from "../Molecules";
import {
  A_Text,
  A_View,
  A_Text_Email,
  A_Icon_Navigate,
  A_Button_Opacity
} from "chemics/Atoms";
import { callPhoneNumber, openMapTo, getResponsiveCSSFrom8 } from "../utils";
import { LIGHTGREY_ONE } from "../styles/Colors";

const O_Vendor_Info = props => {
  const vendor = props.vendor;
  return (
    <A_View>
      <A_View
        style={{
          paddingVertical: getResponsiveCSSFrom8(10).width,
          backgroundColor: LIGHTGREY_ONE,
          width: "100%"
        }}
      >
        <MapView
          style={{
            width: "100%",
            height: getResponsiveCSSFrom8(150).height
          }}
          initialRegion={{
            latitude: vendor.latitude,
            longitude: vendor.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          <Marker
            coordinate={{
              longitude: vendor.longitude,
              latitude: vendor.latitude
            }}
          />
        </MapView>
      </A_View>
      <A_View style={[{ backgroundColor: "white" }, style.paddedContentStyles]}>
        <A_View style={[style.infoDetailLineContainerStyles]}>
          <A_Text style={{ color: "grey" }}>Directions</A_Text>
          <A_Icon_Navigate
            onPress={() => {
              openMapTo(vendor.address);
            }}
          />
        </A_View>
        <A_View style={[style.infoDetailLineContainerStyles]}>
          <A_Text style={{ color: "grey" }}>Phone</A_Text>
          <A_Button_Opacity
            value={vendor.formattedPhoneNumber()}
            onPress={() => callPhoneNumber(vendor.business_phone)}
            strong
          />
        </A_View>
        <A_View style={[style.infoDetailLineContainerStyles]}>
          <A_Text style={{ color: "grey" }}>Email</A_Text>
          <A_Text_Email>{vendor.business_email}</A_Text_Email>
        </A_View>
        <M_Vendor_Hours hours={vendor.hours} />
      </A_View>
    </A_View>
  );
};

export { O_Vendor_Info };

const style = StyleSheet.create({
  paddedContentStyles: { paddingHorizontal: getResponsiveCSSFrom8(10).width },
  infoDetailLineContainerStyles: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
