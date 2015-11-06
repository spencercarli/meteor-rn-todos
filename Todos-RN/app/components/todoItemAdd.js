import React from 'react-native';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  PixelRatio
} from 'react-native';

let addIcon = require('image!fa-plus-circle');

export default React.createClass({
  // Configuration
  displayName: 'Todo Item Add',

  // Initial State
  getInitialState() {
    return {
      task: ''
    }
  },

  // Event Handlers
  handleSubmit() {
    if (this.state.task.length) {
      console.log('TODO: Submit new task');
      this.setState({task: ''});
      this.refs.input.clear();
    }
  },

  // Component Render
  render() {
    return (
      <View>
        <View style={styles.row}>
          <Image
            source={addIcon}
            style={styles.icon}
            />
          <TextInput
            ref='input'
            style={styles.input}
            placeholder="Type to add new tasks"
            onSubmitEditing={this.handleSubmit}
            onChangeText={(task) => this.setState({task: task})}
            />
        </View>
        <View style={styles.border} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  row: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    height: 20
  },
  icon: {
    marginRight: 10
  },
  border: {
    height: 1 / PixelRatio.get(),
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
});