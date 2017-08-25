import React, { Component } from "react";
import { View, ActivityIndicator, TouchableOpacity, StatusBar, Image, Text} from "react-native";
import AndroidBackButton from "react-native-android-back-button";
import { connect } from 'react-redux';

import {  destinationChanged,
          select_vehicle,
          hoverondesc,
          getCurrentLocation,
          get_name_of_loc,
          update_region,
          editUser,

        } from '../../actions/Map';
import UserAvatar from 'react-native-user-avatar';
import imagePicker from 'react-native-imagepicker';
import Spinner from 'react-native-spinkit';
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
  Form
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";

import style from "./style";


/*
<Item floatingLabel>
  <Label>Username</Label>
  <Input value = "adetiwa" />
</Item>
*/



class Profile extends Component {
  constructor(props) {
  super(props);
  this.state = {
    fullname: this.props.user.fullname,
    email: this.props.user.email,
    tel: this.props.user.tel,
    password: '',
  }

}

openModal() {
  imagePicker.open({
    takePhoto: true,
    useLastPhoto: true,
    chooseFromLibrary: true
  }).then(({ uri, width, height }) => {
    console.log('image asset', uri, width, height);
  }, (error) => {
    // Typically, user cancel  
    console.log('error', error);
  });
}




  editProfile() {
    this.props.editUser(this.state.fullname, this.state.email, this.state.tel, this.state.password, this.props.user.token, this.props.user.userid);
  }

  logout(){
    this.props.logoutUser();
  }
  render() {
    return (
      <Container style={style.container}>
        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />

        <AndroidBackButton
         onPress={() => this.props.navigation.navigate('Map')}
        />
       <Header   style = {{borderBottomColor: "#FFF", backgroundColor: "#FFF"}}>
         <Left>
           <Button transparent
             onPress={() => this.props.navigation.navigate("DrawerOpen")}>
           <Image source = {menu}/>

           </Button>
         </Left>
         <Body>
           <Title style = {{color: '#888'}}>Profile</Title>

         </Body>
         <Right>
           <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
             <Text style = {{fontSize: 12, color: '#AAA',}}>LOG OUT</Text>
           </Button>
         </Right>

       </Header>

        <Content>

          <Form>
            <View
              style = {{
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',

              }}
              >
              <TouchableOpacity
              onPress = {() => this.openModal()}>
              <UserAvatar
              name={this.props.user.fullname}  src={this.props.user.profile_image} size={50} />
							</TouchableOpacity>
              </View>
              

            <View style = {style.names}>
              <Item style = { {width: '100%'} } floatingLabel>
                <Label>Fullname</Label>
                <Input
                  ref = "fullname"
                  type="text"
                  onChangeText = {(input)=>this.setState({fullname: input})}
                  value = {this.state.fullname} />
              </Item>

            </View>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                ref = "email"
                type="email"
                onChangeText = {(input)=>this.setState({email: input})}
                value = {this.state.email}/>
            </Item>
            <Item floatingLabel>
              <Label>Tel</Label>
              <Input
                ref = "tel"
                type="tel"
                onChangeText = {(input)=>this.setState({tel: input})}
                value = {this.state.tel}/>
            </Item>

            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                onChangeText = {(input)=>this.setState({password: input})}
                ref = "password"
                secureTextEntry={true}
                 />
            </Item>
          </Form>

            <TouchableOpacity style = {style.continue}
              onPress = {() => this.editProfile()} >
              <View style={style.buttonContainer}>
                <Text style = {style.continueText}>Update</Text>
              </View>
            </TouchableOpacity>
            {this.props.edit_progress &&
              <ActivityIndicator style = {{
              justifyContent: 'center',
              alignItems: 'center',
            }} />
          }

            <Text
              style = {{
                fontSize: 15,
                marginTop: 10,
                alignSelf: 'center',
                color: '#f62e2e',
              }}>{this.props.edit_error}</Text>


        </Content>
      </Container>
    );
  }
}

const trame = require("../../../img/TRAME.png");
//
const menu = require("../../../img/MENU.png");



const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    edit_progress,
    error, region,
    edit_error, user, loading, status } = map;
  return {
    destination,
    pickup,
    vehicle,
    error,
    hoveron,
    loading,
    region,
    user,
    status,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    edit_progress,
    edit_error,
  };
};

export default connect(mapStateToProps, {
  destinationChanged,
  getCurrentLocation,
  hoverondesc,
  select_vehicle,
  get_name_of_loc,
  update_region,
  editUser,

})(Profile);
