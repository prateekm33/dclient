import React, { Component } from "react";
import { connect } from "../redux";
import { withNavigation } from "react-navigation";
import MapView, { Marker, Callout } from "react-native-maps";
import { A_Button_Opacity, A_View, A_Text } from "chemics/Atoms";
import { M_MapMarkerCallout_Restaurant } from "../Molecules";
import { SCREEN_NAMES } from "../AppNavigator";
import { getResponsiveCSSFrom8 } from "../utils";

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
      map_ready: false
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

  onMapReady = () => {
    this.setState({ map_ready: true });
  };

  onRegionChange = region => {
    if (!this.state.map_ready) return;
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
          vendor={marker.data}
          onPress={this.props.onMarkerPress}
        />
      </Marker>
    );
  };

  render() {
    return (
      <MapView
        showsUserLocation={true}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
        onMapReady={this.onMapReady}
        style={[
          {
            flex: 1
          },
          this.props.mapStyles
        ]}
        loadingEnabled={true}
      >
        {this.props.markers.map(this.renderMarker)}
      </MapView>
    );
  }
}

function getMapMarkerObj(data) {
  // console.warn("----TODO....getMapMarkerObj", address, title);
  return {
    latlng: {
      latitude: 37.327797,
      longitude: -122.047632
    },
    data
  };
}

class O_Map_Deals_Pre extends Component {
  constructor(props) {
    super(props);
    this.rendered_vendors = {};
    this.state = {
      markers: this.getInitialMarkers()
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.deals !== this.props.deals)
      this.setState({ markers: this.getDealMarkers(nextProps.deals) });
  };

  getInitialMarkers = () => this.getDealMarkers(this.props.deals);

  getDealMarkers = deals => {
    return deals
      .map(deal => {
        if (deal.vendor_uuid in this.rendered_vendors) return false;
        this.rendered_vendors[deal.vendor_uuid] = true;
        return getMapMarkerObj(deal);
      })
      .filter(val => !!val);
  };

  renderDealMarker = (marker, idx) => {
    const deal = marker.data;
    return (
      <Marker
        coordinate={marker.latlng}
        key={`deal-marker-${deal.uuid}-${idx}`}
      >
        <Callout>
          <A_Button_Opacity
            style={[]}
            onPress={() => this.props.navigateToDeal(deal)}
          >
            <A_View>
              <A_Text
                strong
                style={{ fontSize: getResponsiveCSSFrom8(20).height }}
              >
                {deal.name}
              </A_Text>
              <A_Text
                strong
                style={{ fontSize: getResponsiveCSSFrom8(18).height }}
              >
                {deal.vendor.name}
              </A_Text>
              <A_Text style={{ fontSize: getResponsiveCSSFrom8(15).height }}>
                Expires on {deal.getFormattedExpiration()}
              </A_Text>
            </A_View>
          </A_Button_Opacity>
        </Callout>
      </Marker>
    );
  };

  render() {
    return (
      <A_View style={[{ flex: 1 }, this.props.mapContainerStyle]}>
        <O_Map
          markers={this.state.markers}
          renderMarker={this.renderDealMarker}
          mapStyles={this.props.mapStyles}
        />
      </A_View>
    );
  }
}
const O_Map_Deals = O_Map_Deals_Pre;

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

  getVendorMarkers = vendors => vendors.map(getMapMarkerObj);

  renderVendorMarker = (marker, idx) => {
    return (
      <Marker
        coordinate={marker.latlng}
        key={`vendor-marker-${marker.data.name}-${idx}`}
      >
        <M_MapMarkerCallout_Restaurant
          vendor={marker.data}
          onPress={this.props.onMarkerPress}
        />
      </Marker>
    );
  };

  render() {
    return (
      <A_View style={[{ flex: 1 }, this.props.mapContainerStyle]}>
        <O_Map
          markers={this.state.markers}
          renderMarker={this.renderVendorMarker}
          mapStyles={this.props.mapStyles}
        />
      </A_View>
    );
  }
}
const O_Map_Vendors = connect(state => ({}))(O_Map_Vendors_Pre);

export { O_Map, O_Map_Deals, O_Map_Vendors };
