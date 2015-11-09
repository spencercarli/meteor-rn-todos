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
let SignUp = require('./accounts/signUp');
let SignIn = require('./accounts/signIn');

export default React.createClass({
  // Configuration
  displayName: 'App Options',
  propTypes: {
    loggedIn: React.PropTypes.bool
  },

  // Event Handlers
  handleLoggedIn(nav) {
    let buttons = ['Sign Out', 'Cancel'];
    ActionSheetIOS.showActionSheetWithOptions({
      options: buttons,
      cancelButtonIndex: 1,
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        console.log('TODO: Handle Logout');
      }
    });
  },

  handleLoggedOut(nav) {
    let buttons = ['Sign Up', 'Sign In', 'Cancel'];
    ActionSheetIOS.showActionSheetWithOptions({
      options: buttons,
      cancelButtonIndex: 2,
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
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

  handleOptions() {
    let nav = this.props.navigator;

    if (this.props.loggedIn) {
      this.handleLoggedIn(nav);
    } else {
      this.handleLoggedOut(nav);
    }
  },

  // Component Render
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.handleOptions}
        >
        <Image
          source={icon}
          style={styles.icon}
          />
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    marginRight: 8
  },
  icon: {
    tintColor: 'rgba(0, 0, 0, 0.5)'
  }
});
