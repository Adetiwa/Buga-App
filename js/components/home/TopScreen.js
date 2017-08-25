'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';

import ViewPager from 'react-native-viewpager';
//var ViewPager = require('./ViewPager');
var deviceWidth = Dimensions.get('window').width;

var IMGS = [
  {
    title: 'One',
    file: require('../../../img/slide3.png'),
  },
  {
    title: 'Two',
    file: require('../../../img/slide3.png'),
  },
  {
    title: 'Three',
    file: require('../../../img/slide3.png'),
  },

  //require('../../../img/slide1.png'),
  //require('../../../img/slide2.png'),
  //require('../../../img/slide3.png'),
];

var TopScreen = React.createClass({
  getInitialState: function() {
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    return {
      dataSource: dataSource.cloneWithPages(IMGS),
    };
  },

  render: function() {
    return (
      <ViewPager
        style={this.props.style}
        dataSource={this.state.dataSource}
        renderPage={this._renderPage}
        isLoop={true}
        autoPlay={true}/>
    );
  },

  _renderPage: function(
    data: Object,
    pageID: number | string,) {
    return (
      <Image
        source={IMGS.file}
        //source={require(data)}
        //source={require('../../../img/slide1.png')}
        style={styles.page} />
    );
  },
});

var styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFF",
    width: undefined,
    height: undefined,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    resizeMode: 'contain'
  },

});

module.exports = TopScreen;
