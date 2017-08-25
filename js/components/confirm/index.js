import React, { Component } from "react";
import { View, StatusBar, Image, TextInput,  Dimensions, Platform , TouchableOpacity} from "react-native";
import { connect } from 'react-redux';
import {  destinationChanged,
          select_vehicle,
          hoverondesc,
          getCurrentLocation,
          get_name_of_loc,
          update_region,
          fetchPrice,
          getDistance,
          calculatePrice,
          StorePrice,

        } from '../../actions/Map';

import AndroidBackButton from "react-native-android-back-button";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Body,
  Left,
  Right,
  IconNB,
  Item,
  Input,
  Form
} from "native-base";

import styles from "./styles";

const dropoff = require("../../../img/dropoff.png");
const deviceHeight = Dimensions.get("window").height;

  const scooter_circle = require("../../../img/scooter_circle.png");

class Confirm extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#009AD5',
      }}>
      <StatusBar backgroundColor='#009AD5' barStyle='light-content' />
      <AndroidBackButton
          onPress={() => this.props.navigation.navigate('Summary')}
         />
        <View style ={{
          flex: 6,
          padding: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>

          <Text style = {{
              fontSize: 50,
              color: '#FFF',
              textAlign: 'center',
          }}>
            Your order has been confirmed !
          </Text>
            <Image source={scooter_circle} style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}/>
        </View>
        <View style ={{
          flex: 4,
          padding: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TouchableOpacity style = {styles.continue}
            onPress = {() => this.props.navigation.navigate('Route')} >
            <View style={styles.buttonContainer}>
              <Text style = {styles.continueText}>SEE THE ROUTE</Text>
            </View>
          </TouchableOpacity>

           <TouchableOpacity style = {styles.continue}
              onPress = {() => this.props.navigation.navigate('Map')} >
              <View style={styles.buttonContainer2}>
                <Text style = {styles.continueText2}>RETURN BACK TO MAP</Text>
              </View>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const trame = require("../../../img/TRAME.png");
const bike_circle = require("../../../img/bike_circle.png");
const loc= require("../../../img/loc.png");
const flag = require("../../../img/flag.png");

const menu = require("../../../img/MENU.png");


const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    estimated_price,
    distanceInKM,
    distanceInHR,
    prices,
    error, region, user, distance_info, loading,emergency, status } = map;
  return {
    destination,
    pickup,
    vehicle,
    error,
    distanceInKM,
    distanceInHR,
    hoveron,
    distance_info,
    loading,
    region,
    user,
    status,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    emergency,
    prices,
    estimated_price,
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
  calculatePrice,
  StorePrice,
})(Confirm);
