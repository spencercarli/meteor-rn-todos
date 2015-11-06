import React from 'react-native';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  PixelRatio,
  TouchableHighlight
} from 'react-native';

export default React.createClass({
  // Configuration
  displayName: 'Todos',
  propTypes: {
    todos: React.PropTypes.array
  },

  // Initial Value (State and Props)
  getDefaultProps() {
    return {
      todos: []
    };
  },

  // Sub-render
  renderItems() {
    return this.props.todos.map((todo, i) => {
      return (
        <View key={todo._id}>
          <View style={styles.row}>
            <Text>{todo.text}</Text>
          </View>
          <View style={styles.border} />
        </View>
      )
    });
  },

  // Component Render
  render() {
    return (
      <ScrollView>
        {this.renderItems()}
      </ScrollView>
    )
  }
});

const styles = StyleSheet.create({
  row: {
    padding: 15
  },
  border: {
    height: 1 / PixelRatio.get(),
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});
