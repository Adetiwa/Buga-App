import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import {  destinationChanged,
          select_vehicle,
          hoverondesc,
          getCurrentLocation,
          get_name_of_loc,
          update_region,
          fetchPrice,
          getDistance,
          getRoute,
          calculatePrice,
          StorePrice,
          StoreKm,
          StoreHr,
        } from '../../actions/Map';
import Polyline from '@mapbox/polyline';
import Pulse from 'react-native-pulse';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { View, Image, Dimensions, Animated, PermissionsAndroid,
  Platform, TextInput,AsyncStorage, StatusBar, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
//import mapStyle from './mapStyle';
import * as Animatable from 'react-native-animatable';
import Header_Search from './header_search';
import Location from "./location_result";

//import GooglePlacesAutocomplete from 'react-native-google-places-autocomplete';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Footer,
  FooterTab,
  Text
} from "native-base";
import isEqual from 'lodash/isEqual';

import styles from "./style";
import SearchBox from "../searchbar"

const STORAGE_KEY = "user_access_token";
var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

// (Initial Static Location) Lagos Island
const LATITUDE = 6.4549;
const LONGITUDE = 3.4246;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var isHidden = true;




class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.state = {
      region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    marker: {
       latitude: LATITUDE,
       longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
       longitudeDelta: LONGITUDE_DELTA,
    },
    bounceValue: new Animated.Value(200),
    buttonText: "GET ESTIMATE",
    markers: {},
    
  }
  }


  createMarker(type) {
    if (type === 'pickup') {
      return {
        latitude: this.props.pickup_coords.lat,
        longitude: this.props.pickup_coords.lng,
      }
    } else {
      return {
        latitude: this.props.dropoff_coords.lat,
        longitude: this.props.dropoff_coords.lng,
      }
      
    };
  }

 
  _toggleSubview() {    
    this.setState({
      buttonText: !isHidden ? "GET ESTIMATE" : "CONFIRM"
    });

    var toValue = 100;

    if(isHidden) {
      toValue = 0;
    }

    //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //100 comes from the style below, which is the height of the subview.
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 3,
        tension: 2,
        friction: 8,
      }
    ).start();

    isHidden = !isHidden;
  }
  
  async inputter() {
    const b = await this.calculatePriceThe(this.props.distanceInKM, this.props.distanceInHR, this.props.prices.per_km, this.props.prices.per_hr, this.props.prices.emergency, this.props.prices.base_price);
  }

  calculatePriceThe (km, hr, price_per_km, price_per_hr, emergency, base) {
    var km_num = Number(km);
    var hr_num = Number(hr/60);
    var num_price_per_km = Number(price_per_km);
    var num_price_per_hr = Number(price_per_hr);
    var num_emergency = Number(emergency);
    var num_base = Number(base);

    var price = (km_num * num_price_per_km) + (hr_num * num_price_per_hr) + num_emergency + num_base;
    //dispatch({ type: GETTING_PRICE });
    var pricee= Math.ceil(price);
    this.props.StorePrice(pricee);
    //console.log("Price is "+price);

}

  componentDidMount() {
    if(this.props.route_set === false) {
      this.props.getCurrentLocation();
    } else {
      this.inputter();
    }

    
    this.props.fetchPrice(this.props.vehicle, this.props.emergency);
  
  }

  componentWillUnmount() {
    this.props.fetchPrice(this.props.vehicle, this.props.emergency);
  }

  onDestChange(text) {
    this.props.destinationChanged(text);
  }

dist() {
  if (this.props.pickup !== '' && this.props.destination !== '') {
      this.props.getDistance(this.props.pickup, this.props.destination);
    }
  }
  onDestHover() {
    this.props.hoverondesc();
  }



  storeToken(token) {
    AsyncStorage.removeItem(token);
    // console.log(token);
    //this.getToken();

  }

  getToken() {
    const token = AsyncStorage.getItem('user_access_token');
    console.log("TOken is "+token);

  }



  renderProps() {
    if(this.props.route_set !== false) {
      
  
      return (
      <View style={styles.map}>
        <MapView
        customMapStyle={mapStyle}
        style={{ flex: 1,
                  zIndex: -1,
                }}
        provider={PROVIDER_GOOGLE}
        //region={this.props.region}
        region={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: this.props.latitudeDelta * 12,
          longitudeDelta: this.props.longitudeDelta * 12,
        }}
        //onRegionChange={this.onRegionChange.bind(this)}
        //loadingEnabled={true}
        ref="map"
        initialRegion={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: this.props.latitudeDelta * 12,
          longitudeDelta: this.props.longitudeDelta * 12,
        }}
        //loadingEnabled={true}
        showsUserLocation={true}
       >
      <MapView.Polyline
        coordinates={this.props.route}
        strokeWidth={4}
        strokeColor="#444">
                  
        </MapView.Polyline>
    
        <MapView.Marker 
          coordinate={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
          }}
          title="Pick-up"
                      />
        <MapView.Marker 
           coordinate={{
            latitude: this.props.dropoff_coords.lat,
            longitude: this.props.dropoff_coords.lng,
            }}
          title="Drop-off"
        />
      </MapView>
      </View>
      
      )
    } else {
      return (
        <View style={styles.map}>
        
        <MapView
        ref="map"
        customMapStyle={mapStyle}
        style={{ flex: 1,
                  zIndex: -1,
                }}
        provider={PROVIDER_GOOGLE}
        //region={this.props.region}
        region={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: this.props.latitudeDelta,
          longitudeDelta: this.props.longitudeDelta
        }}
        onRegionChange={this.onRegionChange.bind(this)}
        //loadingEnabled={true}
        zoomEnabled={true}
        
        initialRegion={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: this.props.latitudeDelta,
          longitudeDelta: this.props.longitudeDelta
        }}
        
        //loadingEnabled={true}
        showsUserLocation={true}
        //coordinates= {this.props.route}
        
      >
 
      <MapView.Marker 
        coordinate={{ 
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        }}
        title="Pick-up"
        />
    </MapView>
    </View>
      )
    }
  }

  onRegionChange(region) {
    this.props.update_region(region);
    this.props.get_name_of_loc(this.props.latitude, this.props.longitude)

    //console.log("This region is "+ JSON.stringify(region));
  }


  onRegionChangeCompleted(region) {
    this.props.update_region(region);
    this.props.get_name_of_loc(this.props.latitude, this.props.longitude);
  }

  render() {

    return (

      <Container style={styles.container}>
        
        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />
        {!this.props.hoveron ?

        

             this.renderProps()
            :
            <Location/>
            }
              {!this.props.hoveron &&
                <TouchableOpacity
                   style ={styles.menubar}
                    transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}
                  >

                    <Image source = {menu}/>
                  </TouchableOpacity>
                }
                
                      <Header_Search/>


       {(this.props.pickup !== '') && (this.props.destination !== '') && (this.props.hoveron === false) &&
       <Animated.View
       animation="slideInUp"
       style={styles.okayokay}>
                <TouchableOpacity style = {styles.continue}
                onPress={()=> {this._toggleSubview()}} >
                  <View
                  style={styles.buttonContainer}
                  >
                    <Text style = {styles.continueText}>CONFIRM</Text>
                  </View>
                </TouchableOpacity>
               {this.props.estimated_price !== 0 && this.props.hoveron === false &&
                <View
                  style={styles.subView}
                >
                  <Animatable.Text 
                  style = {{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    padding: 20,
                  }}
                  animation="fadeIn">
                    
                    {this.props.distanceInKM !== 0 && 
                    `NGN `+ this.props.estimated_price+ ` | ` + this.props.distanceInKM + ` KM | `+ this.props.distanceInHR + ` MIN`}
                    </Animatable.Text>
                </View>
                }
               
            </Animated.View>
           
        }
      </Container>
    );
  }
}
const trame = require("../../../img/TRAME.png");

const menu = require("../../../img/MENU.png");


mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]


const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    longitude,
    latitudeDelta,
    route,
    longitudeDelta,
    error, region,
    distanceInKM,
    distanceInHR, 
    prices,
    estimated_price,
    user,dropoff_coords,pickup_coords, loading,emergency,route_set, status } = map;
  return {
    destination,
    pickup,
    vehicle,
    error,
    hoveron,
    loading,
    route,
    region,
    user,
    status,
    latitude,
    distanceInKM,
    distanceInHR,
    longitude,
    latitudeDelta,
    longitudeDelta,
    dropoff_coords,
    pickup_coords,
    emergency,route_set,
    estimated_price,
    
    prices,
  };
};
export default connect(mapStateToProps, {
  destinationChanged,
  getCurrentLocation,
  hoverondesc,
  select_vehicle,
  get_name_of_loc,
  update_region,
  fetchPrice,
  getDistance,
  getRoute,
  calculatePrice,
  StorePrice,
  StoreKm,
  StoreHr,

})(Map);
