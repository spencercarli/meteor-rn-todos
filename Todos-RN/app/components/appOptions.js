import React from 'react-native';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActionSheetIOS,
  Navigator
} from 'react-native';

let icon = require('image!fa-cog');
let SignUp = require('./signUp');
let SignIn = require('./signIn');

export default React.createClass({
  // Configuration
  displayName: 'App Options',

  // Event Handlers
  handleOptions() {
    let buttons = ['Sign Up', 'Sign In', 'Cancel'];
    let nav = this.props.navigator;

    ActionSheetIOS.showActionSheetWithOptions({
      options: buttons,
      cancelButtonIndex: 2,
    }, (buttonIndex) => {
      if (buttonIndex === 0 && nav) {
        nav.push({
          title: 'Sign Up',
          component: SignUp,
          sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump,
          leftButton: {
            title: 'Cancel',
            handler: () => nav.pop()
          }
        });
      } else if (buttonIndex === 1) {
        nav.push({
          title: 'Sign In',
          component: SignIn,
          sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump,
          leftButton: {
            title: 'Cancel',
            handler: () => nav.pop()
          }
        });
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
