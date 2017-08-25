import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  StatusBar,
} from "react-native";
import AndroidBackButton from "react-native-android-back-button";

import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
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

const s = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});

const USE_LITE_CREDIT_CARD_INPUT = false;
const menu = require("../../../img/MENU.png");

export default class CardView extends Component {
  _onChange = formData => {
    /* eslint no-console: 0 */
    console.log(JSON.stringify(formData, null, " "));
  };

  _onFocus = field => {
    /* eslint no-console: 0 */
    console.log(field);
  };

  render() {
    return (
      <View style={s.container}>
        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />

        <AndroidBackButton
          onPress={() => this.props.navigation.navigate('Map')}
         />

        <Header  style = {{borderBottomColor: "#FFF", backgroundColor: "#FFF"}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Payment')}>
              <Icon name="arrow-back" style = {{color: 'black'}} />
            </Button>
          </Left>
          <Body>
            <Title>Payment</Title>
          </Body>
          <Right />
        </Header>
        <View style = {{marginTop: 20}}>

        { USE_LITE_CREDIT_CARD_INPUT ?
          (<LiteCreditCardInput
              autoFocus
              inputStyle={s.input}

              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />) :
            (<CreditCardInput
                autoFocus

                requiresName
                requiresCVC
                requiresPostalCode

                labelStyle={s.label}
                inputStyle={s.input}
                validColor={"black"}
                invalidColor={"red"}
                placeholderColor={"darkgray"}

                onFocus={this._onFocus}
                onChange={this._onChange} />)
        }
      </View>
    </View>
    );
  }
}
