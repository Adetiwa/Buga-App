import React, { Component } from "react";
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


class Dropoff extends Component {
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
            <Title  style = {{color: '#888'}}> Drop-off <Image source = {dropoff}/></Title>
          </Body>
          <Right />
        </Header>


        <View style ={styles.mainContainer}>
          <View style ={styles.firstText}>
            <Text style = {{color: "#CCC"}}>
                ENTER THE DROP-OFF INFO
            </Text>
          </View>
          <View style = {styles.forms}>
            <TextInput
             placeholder="Pick up Address"
             underlineColorAndroid= 'transparent'
             placeholderTextColor="#CCC"
             returnKeyType = "next"
             onChangeText ={(val) => this.setState({firstname: val})}
             onSubmitEditing= {() => this.lastname.focus()}
             style={styles.names}
          />
          <TextInput
             placeholder="Name of Pickup collector"
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

          <TextInput
             placeholder="Extra comments"
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



        </View>

      </Container>
    );
  }
}
const trame = require("../../../img/TRAME.png");

const menu = require("../../../img/MENU.png");

export default Dropoff;
