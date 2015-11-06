import React from 'react-native';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActionSheetIOS
} from 'react-native';

let icon = require('image!fa-cog');

export default React.createClass({
  // Configuration
  displayName: 'App Options',

  // Event Handlers
  handleOptions() {
    let buttons = ['Sign Up', 'Sign In', 'Cancel'];
    ActionSheetIOS.showActionSheetWithOptions({
      options: buttons,
      cancelButtonIndex: 2,
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        console.log('Todo: Sign Up');
      } else if (buttonIndex === 1) {
        console.log('Todo: Sign In');
      }
    });
  },

  // Component Render
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.handleOptions}
        >
        <Image source={icon} />
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    marginRight: 8
  }
});
