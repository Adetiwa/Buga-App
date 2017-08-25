const React = require("react-native");

const { StyleSheet } = React;

export default {
  container: {
    flex: 1,
    alignItems: 'stretch',
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
    margin: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: 'center',
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
  },
  search: {
    zIndex: 100,
    marginTop: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderColor: '#FFF',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 20,
    height: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: "#007AFF",
  }

};
