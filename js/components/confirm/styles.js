const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    flex: 1,
  },
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
  container: {
    backgroundColor: '#009AD5',
    flex: 1,
  },
  mainContainer: {
    flex: 7,

  },
  buttonSide: {
    flex: 3,
  },
  route: {
    flex: 3,
    alignItems: 'center',
    padding:20,
  },
  dispatcher: {
    flex: 2,
    padding:20,
  },
  cost: {
    flex: 5,
    padding:20,
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  },
  container: {
    flex: 1,
  },
  logoSide: {
    backgroundColor: 'black',
    flex: 9,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#4070EC',
    width: "70%",
    padding: 10,
  },
  buttonContainer2: {
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#4070EC',
    width: "70%",
    padding: 10,
  },
  continue: {
    marginTop: 5,
    width: "80%",

  },
  continueText: {
    color: '#FFF',
    textAlign: 'center',
  },
  continueText2: {
    color: '#4070EC',
    textAlign: 'center',
  },

  names: {
    height: 40,
    backgroundColor: '#DDD',
    borderColor: '#009AD5',
    borderBottomColor: '#28C63D',
    color: '#FFF',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  input: {
    borderBottomColor: 'rgba(255,255,255,0.2)',
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: '#2980b9',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10,

  },
  buttonContainer: {
    backgroundColor: '#4070EC',
    paddingVertical: 15,
  },
  buttonContainer2: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
  },
  roww: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'

  },
  error: {
    color: 'red',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  }
};
