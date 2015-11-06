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
  displayName: 'List Options',

  // Event Handlers
  handleOptions() {
    let buttons = ['Make Private', 'Delete', 'Cancel'];
    ActionSheetIOS.showActionSheetWithOptions({
      options: buttons,
      cancelButtonIndex: 2,
      destructiveButtonIndex: 1
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        // TODO: Check if user is logged in.
        // If yes, make private.
        // If no, prompt to sign up or sign in
        console.log('Todo: Make Private');
      } else if (buttonIndex === 1) {
        console.log('Todo: Delete list and items');
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
