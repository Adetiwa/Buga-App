
//import React, { Component } from "react";
//import { View, Image, TextInput,  Dimensions, Platform , TouchableOpacity} from "react-native";

import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  StatusBar
} from 'react-native';

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
          save_summary_state,
          getHistory,

        } from '../../actions/Map';

import {
  Container,
  Header,
  Title,
  Content,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form
} from "native-base";

import AndroidBackButton from "react-native-android-back-button";
import { Card, Button } from 'react-native-material-design';



//import Button from 'react-native-button';

import styless from "./styles";
const pickup = require("../../../img/pickup.png");
const deviceHeight = Dimensions.get("window").height;



class History extends Component {

 componentDidMount() {
   this.props.getHistory(this.props.user.userid);
 }

  render () {
    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />
        <AndroidBackButton
          onPress={() => this.props.navigation.navigate('Map')}
         />
        <Header style = {{borderBottomColor: "#FFF", backgroundColor: "#FFF"}}>
          <Left>
            <TouchableOpacity
                transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}
              >
                <Image source = {menu}/>
              </TouchableOpacity>
          </Left>
          <Body>
            <Title style = {{color: '#888'}}>History</Title>
          </Body>
          <Right />
        </Header>
      <ScrollView>
        <View>
                <Card>

                    <Card.Body>
                        <Text>Pick-up: Unilag, University Road</Text>
                        <Text>Drop-off: Unilag, University Road</Text>
                    </Card.Body>

                    <Card.Actions>
                        <Card.Actions position="left">
                          <Text style = {{fontSize: 10,}}>20/21/2017</Text>
                        </Card.Actions>
                      <Card.Actions position="right">
                      <Button value="VIEW" />
                    </Card.Actions>
                    </Card.Actions>
                </Card>

                <Card>

                    <Card.Body>
                        <Text>Pick-up: Unilag, University Road</Text>
                        <Text>Drop-off: Unilag, University Road</Text>
                    </Card.Body>

                    <Card.Actions>
                        <Card.Actions position="left">
                          <Text style = {{fontSize: 10,}}>20/21/2017</Text>
                        </Card.Actions>
                      <Card.Actions position="right">
                      <Button
                        onPress = {this.lol}
                        value="VIEW" />
                    </Card.Actions>
                    </Card.Actions>
                </Card>
                <Card>

                    <Card.Body>
                        <Text>Pick-up: Unilag, University Road</Text>
                        <Text>Drop-off: Unilag, University Road</Text>
                    </Card.Body>

                    <Card.Actions>
                        <Card.Actions position="left">
                          <Text style = {{fontSize: 10,}}>20/21/2017</Text>
                        </Card.Actions>
                      <Card.Actions position="right">
                      <Button value="VIEW" />
                    </Card.Actions>
                    </Card.Actions>
                </Card>
                <Card>

                    <Card.Body>
                        <Text>Pick-up: Unilag, University Road</Text>
                        <Text>Drop-off: Unilag, University Road</Text>
                    </Card.Body>

                    <Card.Actions>
                        <Card.Actions position="left">
                          <Text style = {{fontSize: 10,}}>20/21/2017</Text>
                        </Card.Actions>
                      <Card.Actions position="right">
                      <Button value="VIEW" />
                    </Card.Actions>
                    </Card.Actions>
                </Card>
                <Card>

                    <Card.Body>
                        <Text>Pick-up: Unilag, University Road</Text>
                        <Text>Drop-off: Unilag, University Road</Text>
                    </Card.Body>

                    <Card.Actions>
                        <Card.Actions position="left">
                          <Text style = {{fontSize: 10,}}>20/21/2017</Text>
                        </Card.Actions>
                      <Card.Actions position="right">
                      <Button value="VIEW" />
                    </Card.Actions>
                    </Card.Actions>
                </Card>
            </View>
      </ScrollView>

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
    estimated_price,
    distanceInKM,
    distanceInHR,
    prices,
    done,
    history,
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
    done,
    estimated_price,
    history,
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
  getHistory,
})(History);



const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  title: {
    fontSize: 38,
    backgroundColor: 'transparent'
  },
  button: {
    marginRight: 10
  },
  card: {
    width: 300
  }
});
