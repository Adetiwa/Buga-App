const React = require("react-native");

const { StyleSheet } = React;

export default {
  container: {
    backgroundColor: "#FFF"
  },

  buttons: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  login: {
    justifyContent: "center",
    alignItems: "center",
    borderColor:'#FFF',
    borderWidth: 2,
    padding: 10,
    width: "40%",
    height: 40,
    backgroundColor: "blue",
    marginLeft: 10,
  },
  register: {
    backgroundColor: "red",
    height: 40,
    borderColor:'#FFF',
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    padding: 10,
    marginRight: 10,
    width: "40%",
  },
  names: {
    flexDirection: "row",
    width: "100%",
  },
  signupButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '##f4dc42',
    padding: 10,
    width: "80%",
    height: 40,
    marginLeft: 10,
  },
  signupText: {
    //color: "#FFF",
    alignText: 'center',
    justifyContent: "center",
    alignItems: "center",

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
    backgroundColor: '#f4dc42',
    width: "70%",
    padding: 10,
  },
  continue: {
    marginTop: 25,
    width: "100%",
    justifyContent: "center",

  },
  forms: {
    alignItems: 'center',
    width: '100%',
  },
  continueText: {
    color: '#FFF',
    textAlign: 'center',
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
    backgroundColor: '#f4dc42',
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
};
