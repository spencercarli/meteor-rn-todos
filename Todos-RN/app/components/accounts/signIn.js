import React from 'react-native';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  PixelRatio,
  TouchableOpacity
} from 'react-native';

let device = require('Dimensions').get('window');

export default React.createClass({
  // Configuration
  displayName: 'Sign In',

  // Initial State
  getInitialState() {
    return {
      email: '',
      password: '',
      error: null
    }
  },

  // Event Handlers
  handleSignIn() {
    let { email, password } = this.state;
    if (!email || !password) {
      return this.setState({error: 'Please enter all fields.'});
    }

    this.setState({email: '', password: ''}, () => {
      this.props.navigator.pop();
      console.log('TODO: Handle Sign In');
    });
  },

  // Component Render
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Sign In</Text>
        <TextInput
          ref='email'
          style={styles.input}
          placeholder="email address"
          autoFocus={true}
          onChangeText={(text) => this.setState({email: text})}
          />

        <TextInput
          ref='password'
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
          />

        <TouchableOpacity
          onPress={this.handleSignIn}
          style={styles.button}
          >
          <Text style={styles.buttonText}>
            Sign In
          </Text>
        </TouchableOpacity>

        <Text style={styles.error}>{this.state.error}</Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
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
