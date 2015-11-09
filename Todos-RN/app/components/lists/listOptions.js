import React from 'react-native';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActionSheetIOS,
  AlertIOS,
} from 'react-native';

let icon = require('image!fa-cog');

let ListsDB = require('../../config/db/lists');

export default React.createClass({
  // Configuration
  displayName: 'List Options',
  propTypes: {
    loggedIn: React.PropTypes.bool
  },

  // Event Handlers
  handleOptions() {
    let buttons = ['Make Private', 'Delete', 'Cancel'];
    let loggedIn = this.props.loggedIn; // Pull from props

    ActionSheetIOS.showActionSheetWithOptions({
      options: buttons,
      cancelButtonIndex: 2,
      destructiveButtonIndex: 1
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        if (loggedIn) {
          ListsDB.makeListPrivate()
        } else {
          AlertIOS.alert(
            'Not Logged In',
            'Please sign in or create an account to make private lists.',
            [
              { text: 'Okay'}
            ]
          );
        }
      } else if (buttonIndex === 1) {
        ListsDB.deleteList()
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
