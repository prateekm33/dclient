import React, { Component } from "react";
import { connect } from "../redux";
import { View } from "react-native";
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
      region_set: false
    };
  }
  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
      a => {
        const { latitude, longitude } = a.coords;
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3
          }
        });
      },
      () => {
        console.warn("geolocation current position get error");
      }
    );
  };

  onMapReady = () => this.setState({ region_set: true });

  onRegionChange = region => {
    if (!this.state.region_set) return;
    this.setState({ region });
  };

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
          onMapReady={this.onMapReady}
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          {this.props.markers.map(this.renderMarker)}
        </MapView>
      </View>
    );
  }
}

function getMapMarkerObj(address, title) {
  // console.warn("----TODO....getMapMarkerObj", address, title);
  return {
    latlng: {
      latitude: 37.327797,
      longitude: -122.047632
    },
    title: "house",
    description: " the crib "
  };
}

class O_Map_Deals_Pre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: this.getInitialMarkers()
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.deals !== this.props.deals)
      this.setState({ markers: this.getDealMarkers(nextProps.deals) });
  };

  getInitialMarkers = () => this.getDealMarkers(this.props.deals);

  getDealMarkers = deals =>
    deals.map(deal => getMapMarkerObj(deal.vendor.address, deal.vendor.name));

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
      getMapMarkerObj(reward.vendor.address, reward.vendor.name)
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

class O_Map_Vendors_Pre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: this.getInitialMarkers()
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.vendors !== this.props.vendors)
      this.setState({ markers: this.getVendorMarkers(nextProps.vendors) });
  };

  getInitialMarkers = () => this.getVendorMarkers(this.props.vendors);

  getVendorMarkers = vendors =>
    vendors.map(vendor => getMapMarkerObj(vendor.address, vendor.name));

  renderVendorMarker = (marker, idx) => {
    return (
      <Marker
        coordinate={marker.latlng}
        key={`vendor-marker-${marker.title}-${idx}`}
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
          renderMarker={this.renderVendorMarker}
        />
      </View>
    );
  }
}
const O_Map_Vendors = connect(state => ({}))(O_Map_Vendors_Pre);

export { O_Map, O_Map_Deals, O_Map_Rewards, O_Map_Vendors };
