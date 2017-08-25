
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

import { Examples } from '@shoutem/ui';



 class HelloWorld extends Component {
  render() {
    return (
      <Examples />
    );
  }
}



const trame = require("../../../img/TRAME.png");

const menu = require("../../../img/MENU.png");

export default HelloWorld;

