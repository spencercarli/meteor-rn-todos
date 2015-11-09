import React from 'react-native';
import {
  StyleSheet,
  View,
  Text,
  PixelRatio,
  Image,
} from 'react-native';

let openSquare = require('image!fa-square-o');
let checkedSquare = require('image!fa-check-square-o');
let trash = require('image!fa-trash-o');

export default React.createClass({
  // Configuration
  displayName: 'Todo Item',
  propTypes: {
    todo: React.PropTypes.object.isRequired
  },

  // Component Render
  render() {
    let todo = this.props.todo;

    let actionIcon = openSquare;
    let trashIcon = null;
    let textStyle = [];
    if (todo.checked) {
      actionIcon = checkedSquare;
      trashIcon = trash;
      textStyle.push(styles.textChecked);
    }

    return (
      <View key={todo._id}>
        <View style={styles.row}>
          <Image
            source={actionIcon}
            style={styles.leftIcon}
            />

          <Text style={textStyle}>
            {todo.text}
          </Text>

          <Image
            source={trashIcon}
            style={styles.rightIcon}
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
    flex: 1
  },
  border: {
    height: 1 / PixelRatio.get(),
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  leftIcon: {
    marginRight: 10,
    tintColor: 'rgba(0, 0, 0, 0.25)'
  },
  rightIcon: {
    position: 'absolute',
    right: 15,
    tintColor: 'rgba(0, 0, 0, 0.25)'
  },
  textChecked: {
    textDecorationLine: 'line-through'
  }
});
