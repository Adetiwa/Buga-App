
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
  ScrollView
} from 'react-native';

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



class Support extends Component {



  render () {
    return (
      <Container style={styles.container}>
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
            <Title style = {{color: '#888'}}>Support</Title>
          </Body>
          <Right />
        </Header>
      <ScrollView>
        <View>
                <Card>
                    <Card.Body>
                        <Text>How do I start up a transaction ?</Text>
                    </Card.Body>
                    <Card.Actions>

                      <Card.Actions position="right">
                      <Button value="VIEW" />
                    </Card.Actions>
                    </Card.Actions>
                </Card>


                <Card>
                    <Card.Body>
                        <Text>How do I start up a transaction ?</Text>
                    </Card.Body>
                    <Card.Actions>

                      <Card.Actions position="right">
                      <Button value="VIEW" />
                    </Card.Actions>
                    </Card.Actions>
                </Card>

                  <Card>
                      <Card.Body>
                          <Text>How do I start up a transaction ?</Text>
                      </Card.Body>
                      <Card.Actions>

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

export default Support;



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
