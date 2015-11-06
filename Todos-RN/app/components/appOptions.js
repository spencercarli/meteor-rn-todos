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
  propTypes: {
    loggedIn: React.PropTypes.bool
  },

  // Event Handlers
  handleOptions() {
    let nav = this.props.navigator;

    if (this.props.loggedIn) {
      let buttons = ['Sign Out', 'Cancel'];
      ActionSheetIOS.showActionSheetWithOptions({
        options: buttons,
        cancelButtonIndex: 1,
      }, (buttonIndex) => {
        if (buttonIndex === 0 && nav) {
          console.log('TODO: Handle Logout');
        }
      });
    } else {
      let buttons = ['Sign Up', 'Sign In', 'Cancel'];
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
    }
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
