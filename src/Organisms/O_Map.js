import React, { Component } from "react";
import { connect } from "../redux";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { M_MapMarkerCallout_Restaurant } from "../Molecules";
import {
  A_Icon_Favorites,
  A_Icon_All,
  A_Icon_Saved,
  A_Button_Opacity
} from "../Atoms";

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
      markers: []
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
        console.warn("geolocation current position get error");
      }
    );
  };

  onRegionChange = region => this.setState({ region });

  renderMarker = (marker, idx) => {
    if (this.props.renderMarker) return this.props.renderMarker(marker, idx);
    return (
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
    );
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
          {this.state.markers.map(this.renderMarker)}
        </MapView>
      </View>
    );
  }
}

class O_Map_Deals_Pre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: this.getInitialMarkers()
    };
  }

  getInitialMarkers = () => this.getDealMarkers(this.props.deals);

  getDealMarkers = deals =>
    deals.map(deal =>
      getMapMarkerObj(deal.vendor.location.coordinates, deal.vendor.name)
    );

  renderDealMarker = (marker, idx) => {
    return (
      <Marker
        coordinate={marker.latlng}
        key={`deal-marker-${marker.title}-${idx}`}
      >
        <M_MapMarkerCallout_Restaurant
          title={marker.title}
          description={marker.description}
        />
      </Marker>
    );
  };

  render() {
    return (
      <View style={this.props.mapContainerStyle}>
        <O_Map
          markers={this.state.markers}
          renderMarker={this.renderDealMarker}
        />
      </View>
    );
  }
}
const O_Map_Deals = connect(state => ({}))(O_Map_Deals_Pre);

class O_Map_Rewards_Pre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: this.getInitialMarkers()
    };
  }

  getInitialMarkers = () => this.getRewardMarkers(this.props.rewards);

  getRewardMarkers = rewards =>
    rewards.map(reward =>
      getMapMarkerObj(reward.vendor.location.coordinates, reward.vendor.name)
    );

  renderRewardMarker = (marker, idx) => {
    return (
      <Marker
        coordinate={marker.latlng}
        key={`deal-marker-${marker.title}-${idx}`}
      >
        <M_MapMarkerCallout_Restaurant
          title={marker.title}
          description={marker.description}
        />
      </Marker>
    );
  };

  render() {
    return (
      <View style={this.props.mapContainerStyle}>
        <O_Map
          markers={this.state.markers}
          renderMarker={this.renderRewardMarker}
        />
      </View>
    );
  }
}
const O_Map_Rewards = connect(state => ({}))(O_Map_Rewards_Pre);

export { O_Map, O_Map_Deals, O_Map_Rewards };
