const React = require("react-native");

const { StyleSheet } = React;

export default {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  menubar: {
    position: 'absolute',
    left: 20,
    top: 30,
  },
  map: {
    flex: 7,
    backgroundColor: '#CCC',
    borderBottomColor: '#009AD5',
    borderBottomWidth: 1,
  },
  checks: {
    flex: 3,

  },
  iconss: {
    marginTop: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#009AD5',
    width: "70%",
    padding: 10,
  },
  continue: {
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 5,
  },
  continueText: {
    color: '#FFF',
  }

};
