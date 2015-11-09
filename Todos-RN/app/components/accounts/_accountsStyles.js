import React from 'react-native';
import {
  StyleSheet,
  PixelRatio,
} from 'react-native';

let device = require('Dimensions').get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 30,
    marginBottom: 30,
    marginTop: 60
  },
  input: {
    width: device.width - 40,
    height: 40,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1 / PixelRatio.get(),
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginBottom: 2
  },
  button: {
    width: device.width - 40,
    height: 40,
    backgroundColor: '#2cc5d2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18
  },
  buttonText: {
    color: '#ffffff'
  },
  error: {
    color: 'red',
    marginTop: 10
  }
});
