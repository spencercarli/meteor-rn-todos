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
    user: React.PropTypes.object,
    list: React.PropTypes.object
  },

  // Event Handlers
  handleOptions() {
    let buttons = ['Make Private', 'Delete', 'Cancel'];
    let {user, list} = this.props;

    if (list.userId) {
      buttons[0] = "Make Public";
    }

    ActionSheetIOS.showActionSheetWithOptions({
      options: buttons,
      cancelButtonIndex: 2,
      destructiveButtonIndex: 1
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        if (Object.keys(user).length > 0) {
          if (list.userId) {
            ListsDB.changeListVisibility(list._id, null);
          } else {
            ListsDB.changeListVisibility(list._id, user._id);            
          }
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
        this.props.navigator.pop();
        ListsDB.deleteList(this.props.list._id);
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
