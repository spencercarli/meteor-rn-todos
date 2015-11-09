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
  displayName: 'Sign Up',

  // Initial State
  getInitialState() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      error: null
    }
  },

  // Event Handlers
  handleSignUp() {
    let { email, password, confirmPassword } = this.state;
    if (!email || !password || !confirmPassword) {
      return this.setState({error: 'Please enter all fields.'});
    }

    if (password !== confirmPassword) {
      return this.setState({error: 'Passwords must match.'});
    }

    this.setState({email: '', password: '', confirmPassword: ''}, () => {
      this.props.navigator.pop();
      console.log('TODO: Handle Sign Up');
    });
  },

  // Component Render
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Sign Up</Text>
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

        <TextInput
          ref='confirmPassword'
          style={styles.input}
          placeholder="confirm password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({confirmPassword: text})}
          />

        <TouchableOpacity
          onPress={this.handleSignUp}
          style={styles.button}
          >
          <Text style={styles.buttonText}>
            Sign Up
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
