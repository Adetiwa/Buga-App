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

        } from '../../actions/Map';

import { View, Image, StatusBar, TextInput,  Dimensions, Platform , TouchableOpacity} from "react-native";
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





class Summary extends Component {

  componentWillMount() {
    this.props.fetchPrice(this.props.vehicle, this.props.emergency);
  }

  
  formatDollar(num) {
      var p = num.toFixed(2).split(".");
      return "₦" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
          return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
      }, "") + "." + p[1];
  }



  render() {
    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />
        <AndroidBackButton
          onPress={() => this.props.navigation.navigate('Pickup')}
         />

        <Header style = {{borderBottomColor: "#FFF", backgroundColor: "#FFF"}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Pickup')}>
              <Icon  style = {{color: '#888'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title  style = {{color: '#888'}}> SUMMARY </Title>
          </Body>
          <Right />
        </Header>


        <View style ={styles.mainContainer}>
            <View style ={styles.firstText}>
              <Text style = {{color: "#CCC"}}>
                  YOUR ROUTE
              </Text>
              
              <View style = {styles.route}>
                <Image source={scooter_circle} style={styles.drawerCover}/>
                <Text style = {{fontSize: 13,color: "#CCC"}}>
                    {this.props.distanceInHR} mins
                </Text>
                  <Text style = {{fontSize: 13,color: "#CCC"}}>
                      {this.props.distanceInKM} KM
                  </Text>
                <Image source={flag} style={styles.drawerCover}/>
              </View>
            </View>

            <View style = {styles.dispatcher}>
              <Text style = {{color: "#CCC"}}>
                  DISPATCHER
              </Text>
              <Text style ={{padding: 20, color: '#888', fontSize: 13,}}> A dispatcher
              will be assigned to you shortly </Text>
            </View>
            <View style = {styles.cost}>
              <Text style = {{color: "#CCC"}}>
                  ESTIMATED COST
              </Text>
              <View style={styles.costText}>
                <Text style={styles.costTextText}>

                  ₦ {this.props.estimated_price}
                </Text>
              </View>

              <View style={styles.confirmButton}>
                <TouchableOpacity style = {styles.continue}
                  onPress = {() => this.props.navigation.navigate('Confirm')} >
                  <View style={styles.buttonContainer}>
                    <Text style = {styles.continueText}>CONFIRM</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <Image style = {styles.footer} source = {trame}/>
            </View>



        </View>

      </Container>
    );
  }
}
const trame = require("../../../img/TRAME.png");
const bike_circle = require("../../../img/bike_circle.png");
const loc= require("../../../img/loc.png");
const flag = require("../../../img/flag.png");
const truck = require("../../../img/truck_circle.png");
const scooter_circle = require("../../../img/scooter_circle.png");
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
})(Summary);
