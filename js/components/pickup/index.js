import React, { Component } from "react";
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
          StoreKm,
          StoreHr,

        } from '../../actions/Map';

import { View, Image, TextInput, KeyboardAvoidingView,  Dimensions, Platform , StatusBar , TouchableOpacity} from "react-native";
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

const pickup = require("../../../img/pickup.png");
const deviceHeight = Dimensions.get("window").height;
/*
  <Image style = {styles.footer} source = {trame}/>
  */

class Pickup extends Component {

  componentDidMount() {
    if (this.props.pickup !== '' && this.props.destination !== '') {
      this.props.getDistance(this.props.pickup, this.props.destination);
    }


  }

componentWillUnmount() {
  this.props.fetchPrice(this.props.vehicle, this.props.emergency);

  var a = this.props.distance_info;
  var distance = a[0].elements[0].distance.value;
  var time = a[0].elements[0].duration.value;

  var km = Number(distance/1000);
  var time = Number(time/3600);


  this.calculatePriceThe(km, time, this.props.prices.per_km, this.props.prices.per_hr, this.props.prices.emergency, this.props.prices.base_price);
}

 calculatePriceThe (km, hr, price_per_km, price_per_hr, emergency, base) {
      var km_num = Number(km);
      var hr_num = Number(hr);
      var num_price_per_km = Number(price_per_km);
      var num_price_per_hr = Number(price_per_hr);
      var num_emergency = Number(emergency);
      var num_base = Number(base);

      var price = (km_num * num_price_per_km) + (hr_num * num_price_per_hr) + num_emergency + num_base;
      //dispatch({ type: GETTING_PRICE });
      var pricee= Math.ceil(price);
      this.props.StorePrice(pricee);
      this.props.StoreKm(Math.ceil(km_num));
      this.props.StoreHr(Math.ceil(hr_num*60));
      console.log("Price is "+price);

}



  render() {
    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />

        <AndroidBackButton
          onPress={() => this.props.navigation.navigate('Map')}
         />
        <Header style = {{borderBottomColor: "#FFF", backgroundColor: "#FFF"}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Map')}>
              <Icon style = {{color: '#888'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style = {{color: '#888'}}> Pickup <Image source = {pickup}/></Title>
          </Body>
          <Right />
        </Header>


        <KeyboardAvoidingView  style ={styles.mainContainer}>
          <View style ={styles.firstText}>
            <Text style = {{color: "#CCC"}}>
                ENTER THE PICK-UP ADDRESS
            </Text>
          </View>
          <View style = {styles.forms}>

          <TextInput
             placeholder="Name of Pickup collector"
             underlineColorAndroid= 'transparent'
             onSubmitEditing= {() => this.tel.focus()}
             returnKeyType = "next"
             value={this.props.user.fullname}
             placeholderTextColor="#CCC"
             style={styles.names}
             ref= {(input) => this.lastname = input}

          />
          <TextInput
           placeholder="Telephone"
           value={this.props.user.tel}
           underlineColorAndroid= 'transparent'
           placeholderTextColor="#CCC"
           returnKeyType = "next"
           style={styles.names}
        />
          <TextInput
             placeholder="Name of Drop-off collector"
             underlineColorAndroid= 'transparent'
             onSubmitEditing= {() => this.tel.focus()}
             returnKeyType = "next"
             placeholderTextColor="#CCC"
             style={styles.names}
             ref= {(input) => this.lastname = input}

          />

          <TextInput
             placeholder="Telephone"
             underlineColorAndroid= 'transparent'
             onSubmitEditing= {() => this.tel.focus()}
             returnKeyType = "next"
             placeholderTextColor="#CCC"
             style={styles.names}
             ref= {(input) => this.lastname = input}

          />
          <TextInput
             placeholder="Extra comments"
             underlineColorAndroid= 'transparent'
             onSubmitEditing= {() => this.tel.focus()}
             returnKeyType = "next"
             placeholderTextColor="#CCC"
             style={styles.names}
             ref= {(input) => this.lastname = input}

          />

          <TouchableOpacity style = {styles.continue}
            onPress = {() => this.props.navigation.navigate('Summary')} >
            <View style={styles.buttonContainer}>
              <Text style = {styles.continueText}>NEXT</Text>
            </View>
          </TouchableOpacity>


          </View>



        </KeyboardAvoidingView>

      </Container>
    );
  }
}
const trame = require("../../../img/TRAME.png");

const menu = require("../../../img/MENU.png");

const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    prices,
    error, region, user, distance_info, loading,emergency, status } = map;
  return {
    destination,
    pickup,
    vehicle,
    error,
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
  StoreKm,
  StoreHr,
})(Pickup);
