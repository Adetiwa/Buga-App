import React, { Component } from "react";
import { View, Image, Dimensions, PermissionsAndroid,
  Platform,StatusBar, TextInput, TouchableOpacity} from "react-native";
import MapView from 'react-native-maps';
import AndroidBackButton from "react-native-android-back-button";

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
/*

compile(project(':react-native-maps')){
        exclude group: 'com.google.android.gms', module: 'play-services-base'
        exclude group: 'com.google.android.gms', module: 'play-services-maps'
    }
    compile 'com.google.android.gms:play-services-base:10.0.1'
    compile 'com.google.android.gms:play-services-maps:10.0.1'
*/
import styles from "./style";

const {width, height} = Dimensions.get("window");
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const ASPECT_RATIO = width/ height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truck: false,
      littletruck: false,
      bike: false,
      scooter: false,
      bikeImage: require("../../../img/bike.png"),
      truckImage: require("../../../img/truck.png"),
      scooterImage: require("../../../img/scooter.png"),
      littleImage: require("../../../img/littletruck.png"),

      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta:0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0,
      }
  }
}

watchID : ?number = null

  componentDidMount() {
      navigator.geolocation.getCurrentPosition((position) => {
        var lat = parseFloat(position.coords.latitude);
        var lng = parseFloat(position.coords.longitude);

        var initialRegion = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }

        this.setState({initialPosition: initialRegion})
        this.setState({markerPosition: initialRegion})
      },
      //(error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 30000, maximumAge: 100}),

      // eslint-disable-next-line no-undef
      this.watchID = navigator.geolocation.watchPosition((position) => {
        var lat = parseFloat(position.coords.latitude);
        var lng = parseFloat(position.coords.longitude);

        var lastRegion = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
        this.setState({initialPosition: lastRegion})
        this.setState({markerPosition: lastRegion})
      })

    }

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }


  toggleTruck() {
    this.setState({
      truck: true,
      littletruck: false,
      bike: false,
      scooter: false,
      bikeImage: require("../../../img/bike.png"),
      truckImage: require("../../../img/truck_active.png"),
      scooterImage: require("../../../img/scooter.png"),
      littleImage: require("../../../img/littletruck.png"),
    });
  }

  toggleBike() {
    this.setState({
      truck: false,
      littletruck: false,
      bike: true,
      scooter: false,
      bikeImage: require("../../../img/bike_active.png"),
      truckImage: require("../../../img/truck.png"),
      scooterImage: require("../../../img/scooter.png"),
      littleImage: require("../../../img/littletruck.png"),
    });
  }
  toggleLittle() {
    this.setState({
      truck: false,
      littletruck: true,
      bike: false,
      scooter: false,
      bikeImage: require("../../../img/bike.png"),
      truckImage: require("../../../img/truck.png"),
      scooterImage: require("../../../img/scooter.png"),
      littleImage: require("../../../img/littletruck_active.png"),
    });
  }
  toggleScooter() {
    this.setState({
      truck: false,
      littletruck: false,
      bike: false,
      scooter: true,
      bikeImage: require("../../../img/bike.png"),
      truckImage: require("../../../img/truck.png"),
      scooterImage: require("../../../img/scooter_active.png"),
      littleImage: require("../../../img/littletruck.png"),
    });
  }



  onRegionChange(region) {
    this.setState({ region });
  }


  render() {
    return (


      <Container style={styles.container}>
        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />
        <AndroidBackButton
          onPress={() => this.props.navigation.navigate('Map')}
         />
        <View style={styles.map}>

          <View style = {{
          //  flex: 1,
          }}>
              <TouchableOpacity
                 style ={styles.menubar}
                  transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}
                >

                  <Image source = {menu}/>
                </TouchableOpacity>
              </View>

              <MapView
                style={{ flex: 1 }}
                region={this.state.initialPosition}
                customMapStyle={mapStyle}
              >
                <MapView.Marker
                   draggable
                    //onDragEnd={this.onUserPinDragEnd.bind(this)}
                    title={'You are here'}

                    coordinate={this.state.markerPosition}
                  >
                  <View style = {styles.radius}>
                    <View style = {styles.marker}/>

                  </View>

                </MapView.Marker>
                </MapView>




      </View>
      </Container>
    );
  }
}
const trame = require("../../../img/TRAME.png");

const menu = require("../../../img/MENU.png");

const mapStyle =  [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]


export default Route;
