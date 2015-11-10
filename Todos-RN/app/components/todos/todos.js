import React from 'react-native';
import {
  ScrollView,
  TouchableHighlight
} from 'react-native';

let TodoItem = require('./todoItem');
let TodoItemAdd = require('./todoItemAdd');

let TodosDB = require('../../config/db/todos');

export default React.createClass({
  // Configuration
  displayName: 'Todos',
  propTypes: {
    listId: React.PropTypes.string
  },

  // Initial Value (State and Props)
  getInitialState() {
    return {
      todos: []
    };
  },

  // Component Lifecycle
  componentWillMount() {
    let listId = this.props.listId;
    TodosDB.subscribeToTodos(listId)
      .then(() => {
        TodosDB.observeTodos(listId, (results) => {
          this.setState({todos: results});
        });
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  },

  // Sub-render
  renderItems() {
    return this.state.todos.map((todo, i) => {
      return <TodoItem todo={todo} key={todo._id} />
    });
  },

  // Component Render
  render() {
    return (
      <ScrollView>
        <TodoItemAdd listId={this.props.listId} />
        {this.renderItems()}
      </ScrollView>
    )
  }
});
