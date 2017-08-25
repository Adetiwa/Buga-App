import React, { Component } from "react";
import { View, StatusBar, TouchableOpacity} from "react-native";
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
  Text
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";

import styles from "./styles";

class Register extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />
        <AndroidBackButton
          onPress={() => this.props.navigation.navigate('Home')}
         />
        <Header style = {{borderBottomColor: "#FFF", backgroundColor: "#FFF"}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
              <Icon style = {{color: '#888'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style = {{color: '#888'}}> Register</Title>
          </Body>
          <Right />
        </Header>
        <Content style = {{
          padding: 20,
        }}>
          <View style =  {styles.buttons}>

          <TouchableOpacity style={styles.login}>

            <Icon style={{color: '#FFF'}} name="logo-facebook" />
          </TouchableOpacity>


          <TouchableOpacity style={styles.register}>

            <Icon style={{color: '#FFF'}} name="logo-googleplus" />
          </TouchableOpacity>


          </View>
          <Form>
            <View style = {styles.names}>
              <Item style = { {width: '45%'} } floatingLabel>
                <Label>Firstname</Label>
                <Input />
              </Item>
              <Item style = { {width: '45%'} }  floatingLabel>
                <Label>Lastname</Label>
                <Input />
              </Item>
            </View>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Tel</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
          <TouchableOpacity style = {styles.continue}
            onPress = {() => this.props.navigation.navigate('Map')} >
            <View style={styles.buttonContainer}>
              <Text style = {styles.continueText}>REGISTER</Text>
            </View>
          </TouchableOpacity>

        </Content>
      </Container>
    );
  }
}

export default Register;
