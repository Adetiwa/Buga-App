import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import { destinationChanged,
          select_vehicle,
          hoverondesc,
          pickupChanged,
          input_everything,
          get_name_of_loc,
          getAddressPrediction,
          geocodeTheAddress_pickup,
          geocodeTheAddress_dest,
          getDistance,
          getRoute,
          StorePrice,
        } from '../../actions/Map';
import { View, Image, Dimensions, Animated, PermissionsAndroid,
  Platform, TextInput, StyleSheet,
  LayoutAnimation,
  StatusBar, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
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

import styles from "./style";
import SearchBox from "../searchbar";

import * as Animatable from 'react-native-animatable'

const transitionProps = {
  hoverbar: ['top', 'left', 'height', 'width', 'shadowRadius'],
  square: ['top', 'left'],
  destinationBox: ['left', 'height', 'opacity'],
  sourceBox: ['top', 'opacity'],
  destination: ['top', 'left', 'fontSize', 'color', 'opacity'],
  sourceText: ['top', 'opacity'],
  verticalBar: ['top', 'left', 'opacity'],
  dot: ['top', 'left', 'opacity'],
}

const SQUARE_SIZE = 6

const AnimatableTouchable = Animatable.createAnimatableComponent(TouchableWithoutFeedback)

const {width, height} = Dimensions.get("window");
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const ASPECT_RATIO = width/ height;


class Header_Search extends Component {
  componentWillMount() {
    }

  componentWillUpdate() {
    //Animated.spring(height, {toValue: 300, friction: 0.8}).start()
    //LayoutAnimation.linear();
  }


  onDestChange(text) {
    this.props.destinationChanged(text);
    this.props.getAddressPrediction(text);
    //this.props.geocodeTheAddress_dest(this.props.destination);

  }

  onPickupChange(text) {
    this.props.pickupChanged(text);
    this.props.getAddressPrediction(text);
    //this.props.geocodeTheAddress_pickup(this.props.destination);
  }


  onDestHover() {
    //this.props.get_name_of_loc(this.props.latitude, this.props.longitude);
    this.props.hoverondesc();
  }
  choose(type) {
    //const { email, password } = this.props;
    this.props.select_vehicle(type);
  }

  async inputter() {
    if ((this.props.pickup != '') && (this.props.destination !== '')) {
      const d = await this.props.geocodeTheAddress_dest(this.props.destination);
      const c = await this.props.geocodeTheAddress_pickup(this.props.pickup);
      const rf = await this.props.getDistance(this.props.pickup, this.props.destination);
      const n = await this.props.getRoute(this.props.pickup, this.props.destination);
      
      this.calculatePriceThe(this.props.distanceInKM, this.props.distanceInHR, this.props.prices.per_km, this.props.prices.per_hr, this.props.prices.emergency, this.props.prices.base_price);
      this.props.input_everything();
       } else {
      if(this.props.pickup != '') {
        this.refs.pickupInput.focus();
      } else {
        this.refs.destInput.focus();
      }
    }
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

  getAnimatableStyles = () => {
    const {width: windowWidth} = Dimensions.get('window')
    const width = windowWidth - 24 * 2


    return {
      names: {
        //14px 28px
        marginTop: this.props.hoveron ? 20 : 0,
        height: 40,
        zIndex: 6,
        backgroundColor: '#FFF',
        width: this.props.hoveron ? 0.8 * width : 0.8 * width,
        borderColor: this.props.hoveron ? '#CCC' : '#fff',
        shadowColor: '#888',
        shadowOffset: this.props.hoveron ? { width: 0, height: 0} : { width: 5, height: 5},
        shadowOpacity: this.props.hoveron ? 0 : 0.7,
        elevation: 10,
        color: '#111',
        fontSize: 15,
        marginBottom: this.props.hoveron ? 0 : 10,
        borderWidth: 1,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: this.props.hoveron ? "center" : "auto",

      },
      names1: {
        //14px 28px
        height: 40,
        zIndex: 6,
        backgroundColor: '#FFF',
        width: this.props.hoveron ? 0.8 * width : 0.8 * width,
        borderColor: this.props.hoveron ? '#CCC' : '#fff',
        shadowColor: '#888',
        shadowOffset: this.props.hoveron ? { width: 0, height: 0} : { width: 5, height: 5},
        shadowOpacity: this.props.hoveron ? 0 : 0.7,
        elevation: 10,
        color: '#111',
        fontSize: 15,
        marginBottom: 10,
        borderWidth: 1,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        //opacity: !this.props.hoveron && !this.props.input_done ? 1 : 0,
        opacity: (this.props.hoveron || this.props.input_done) ? 1 : 0,
        alignSelf: this.props.hoveron ? "center" : "auto",

      },

      hoverbar: {
        top: this.props.hoveron ? 20 : 96,
        left: this.props.hoveron ? 0 : 24,
        height: this.props.hoveron ? 136 : 56,
        width: this.props.hoveron ? windowWidth : width,
        shadowRadius: this.props.hoveron ? 10 / 2 : 60 / 2,
      },
      square: {
        top: this.props.hoveron ? 109 : 96 + 56 / 2 - SQUARE_SIZE / 2,
        left: this.props.hoveron ? 29 : 24 + 22,
      },
      destinationBox: {
        position: "absolute",
        top: this.props.hoveron ? 0 : 60,
        left: this.props.hoveron ? 0 : 50,
        justifyContent: "center",
        borderWidth: this.props.hoveron ? 0 : 1,
        width: this.props.hoveron ? windowWidth : width,
        borderBottomColor:  this.props.hoveron ? '#CCC' : 'transparent',
        backgroundColor: this.props.hoveron ? '#FFF' : 'transparent',
        //shadowRadius: this.props.hoveron ? 10 / 2 : 60 / 2,
        borderColor: this.props.hoveron ? '#CCC' : 'transparent',
        shadowColor: '#888',
        shadowOffset: this.props.hoveron ? { width: 5, height: 5} : { width: 0, height: 0},
        shadowOpacity: this.props.hoveron ? 0.7 : 0,

      },

      destinationText: {
        left: this.props.hoveron ? 65 : 75,
        top: this.props.hoveron ? 103 : 112,
        fontSize: this.props.hoveron ? 15 : 20,
        color: this.props.hoveron ? '#A4A4AC' : '#525760',
        opacity: (this.props.hoveron && this.props.destination.length !== 0) ? 0 : 1,
      },
      sourceBox: {
        left: 56,
        right: 24,
        height: 32,
        top: this.props.hoveron ? 56 : 96,
        opacity: this.props.hoveron ? 1 : 0,
      },
      sourceText: {
        left: 65,
        top: this.props.hoveron ? 64 : 76,
        opacity: this.props.hoveron ? 1 : 0,
      },
      verticalBar: {
        top: this.props.hoveron ? 78 : 78 + 22 - 5,
        left: this.props.hoveron ? 32 : 32 + 22 - 5,
        opacity: this.props.hoveron ? 1 : 0,
      },
      dot: {
        top: this.props.hoveron ? 69 : 69 + 22 - 5,
        left: this.props.hoveron ? 29.5 : 29.5 + 22 - 5,
        opacity: this.props.hoveron ? 1 : 0,
      },
    }
  }

  render() {
    /*
    {
      position: "absolute",
      top: 60,
      left: 30,
      justifyContent: "center",

    }
    */
    //const {expanded, sourceText, destination} = this.props
    const animatableStyles = this.getAnimatableStyles()

    const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
    const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};



    return (



                    <Animated.View style = {animatableStyles.destinationBox}>
                      <AndroidBackButton
                          onPress={() => this.props.input_everything()}
                         />
                         <TextInput
                          placeholder="Pick up Address"
                          value = {this.props.pickup}
                          ref='pickupInput'
                          underlineColorAndroid= 'transparent'
                          placeholderTextColor="#CCC"
                          returnKeyType = "go"
                          onFocus = {this.onDestHover.bind(this)}
                          onChangeText = {this.onPickupChange.bind(this)}
                          onSubmitEditing= {() => this.inputter()}
                          style={animatableStyles.names}
                        />

                        <TextInput
                          placeholder="Drop off Address"
                          ref='destInput'
                          value = {this.props.destination}
                          underlineColorAndroid= 'transparent'
                          placeholderTextColor="#CCC"
                          returnKeyType = "go"
                          onFocus = {this.onDestHover.bind(this)}
                          onChangeText = {this.onDestChange.bind(this)}
                          //onChangeText ={(val) => this.setState({firstname: val})}
                          onSubmitEditing= {() => this.inputter()}
                          style={animatableStyles.names1}
                        />

                  </Animated.View>



    );
  }
}




const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle, error,
    input_done,
     loading,
     region,
     user,
     status,
     latitude,
     longitude,
     latitudeDelta,
     longitudeDelta,
     predictions,
     prediction_error,
     pickup_location,
     distanceInKM,
     distanceInHR,
     destination_location,
     error_geoecoding,
     prices,
   } = map;
  return {
    destination,
    pickup,
    vehicle,
    error,
    input_done,
    hoveron,
    loading,
    status,
    region,
    user,
    distanceInKM,
    distanceInHR,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    predictions,
    prediction_error,
    pickup_location,
    destination_location,
    error_geoecoding,
    prices,
  };
};

export default connect(mapStateToProps, {
  destinationChanged,
  hoverondesc,
  select_vehicle,
  pickupChanged,
  input_everything,
  get_name_of_loc,
  getAddressPrediction,
  geocodeTheAddress_pickup,
  geocodeTheAddress_dest,
  getDistance,
  getRoute,
  StorePrice,
  

})(Header_Search);
