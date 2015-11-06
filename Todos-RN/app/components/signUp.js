import React from 'react-native';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default React.createClass({
  // Configuration
  displayName: 'Sign Up',

  // Component Render
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
});
