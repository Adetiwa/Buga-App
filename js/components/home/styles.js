const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 100
  },
  text: {
    color: "#f4dc42",
    bottom: 6,
    marginTop: 5
  },
  container: {
    flex: 1,
  },
  logoSide: {
    backgroundColor: '#f4dc42',
    flex: 9,
  },
  /*buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    backgroundColor: '#FFF',
  }, */
  buttons: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    backgroundColor: '#FFF',
    position: "absolute",
    bottom: 10,
    left: "10%",
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'red',
    opacity: 0.3
  },
  login: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: '#f4dc42',
    padding: 10,
    width: "40%",
    height: 40,

    marginLeft: 10,
  },
  register: {
    backgroundColor: "#f4dc42",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: '#f4dc42',
    borderWidth: 2,
    padding: 10,
    marginRight: 10,
    width: "40%",
  },
  registerText: {
    color: "#FFF",
  }
};
