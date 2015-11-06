import React from 'react-native';
import {
  ScrollView,
  TouchableHighlight
} from 'react-native';

let TodoItem = require('./todoItem');

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
      return <TodoItem todo={todo} />
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
