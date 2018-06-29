import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { M_MapMarkerCallout_Restaurant } from "../Molecules";

class O_Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      markers: [
        {
          latlng: {
            latitude: 37.32759,
            longitude: -122.050716
          },
          title: "Memorial Park",
          description: "Park behind house"
        }
      ]
    };
  }
  componentWillMount = () => {
    navigator.geolocation.getCurrentPosition(
      a => {
        const { latitude, longitude } = a.coords;
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }
        });
      },
      () => {
        console.warn("error");
      }
    );
  };

  onRegionChange = region => {
    this.setState({ region });
  };

  render() {
    return (
      <View>
        <MapView
          showsUserLocation={true}
          followsUserLocation={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          {this.state.markers.map((marker, idx) => (
            <Marker
              coordinate={marker.latlng}
              key={`map-${this.props.flavor || "generic"}-marker-${
                marker.title
              }-${idx}`}
            >
              <M_MapMarkerCallout_Restaurant
                title={marker.title}
                description={marker.description}
              />
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }
}
O_Map.propTypes = {
  flavor: PropTypes.oneOf(["all", "saved", "favorites"])
};

export default O_Map;
