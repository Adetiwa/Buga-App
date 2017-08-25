'use strict';

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import styless from "./styles";
var TopScreen = require('./TopScreen');
var BottomScreen = require('./BottomScreen');

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BottomScreen style={styles.viewpager}/>

        <View style = {styless.buttons}>
					<TouchableOpacity style = {styless.login}
						onPress = {() => this.props.navigation.navigate('Login')} >
						<Text style = {{color: '#f4dc42'}}>SIGN IN</Text>
					</TouchableOpacity>
					<TouchableOpacity style = {styless.register}
						onPress = {() => this.props.navigation.navigate('Register')} >
						<Text style = {styless.registerText}>REGISTER</Text>
					</TouchableOpacity>
				</View>

      </View>
    )
  }
}




var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  viewpager: {
    flex: 1,
  },

});

module.exports = Home;
