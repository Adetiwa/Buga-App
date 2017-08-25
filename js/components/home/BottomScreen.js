'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ToastAndroid,
  Platform,
  AlertIOS,
  Image,
} from 'react-native';

var ViewPager = require('react-native-viewpager');
//var ViewPager = require('./ViewPager');
var deviceWidth = Dimensions.get('window').width;

/*
var PAGES = [
  'Delivery made easy with our easy-to-use app',
  'Easily estimate your delivery time and cost with our calculator',
  'Sit back, relax and watch the progress of your delivery with our tracking solution',

];

 <Image style = {{
          backgroundColor: "#FFF",
          flex: 1,
          width: deviceWidth,
          //height: 100,
          //resizeMode: 'contain'
        }} source={data.imagePath}/>
*/


var PAGES = [
  {
    text         : "Buga App description 1",
    //imagePath  : require("../../../img/slide1.png"),
    imagePath  : require("../../../img/slide1.png"),
    Heading   : "Buga App title 1",
  },
  {
    text         : "Buga App description 2",
    imagePath  : require("../../../img/slide2.png"),
    Heading   : "Buga App title 2",

  },
  {
    text         : "Buga App description 3",
    imagePath  : require("../../../img/slide3.png"),
    Heading   : "Buga App title 3",

  },
];

function notifyMessage(msg: string) {
  if (Platform.OS === 'android') {
    //ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    //AlertIOS.alert(msg);
  }
}

var ImagesScreen = React.createClass({
  getInitialState: function() {
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    return {
      dataSource: dataSource.cloneWithPages(PAGES),
    };
  },

  render: function() {
    return (
      <ViewPager
        style={this.props.style}
        dataSource={this.state.dataSource}
        renderPage={this._renderPage}
        onChangePage={this._onChangePage}
        isLoop={true}
        autoPlay={true}/>
    );
  },

  _renderPage: function(
    data: Object,
    pageID: number | string,) {
    return (
      <View style={styles.page}>
        <View style = {{
          flex: 7,
        }}>
       
        </View>
        <View style = {{
          flex: 3,
        }}>
          <Text style={styles.heading}>{data.Heading}</Text>
          <Text style={styles.text}>{data.text}</Text>
        </View>
      </View>
    );
  },

  _onChangePage: function(
    page: number | string
  ) {
    //notifyMessage('Current page: ' + page);
  },

});

var styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  Img: {
    //flex: 7,
  },
  heading: {
    alignSelf: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 13,
    padding: 20,
    textAlign: 'center',
  },
});

module.exports = ImagesScreen;
