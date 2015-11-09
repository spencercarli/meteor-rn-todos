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
    TodosDB.subscribeToTodos(this.props.listId)
      .then(() => {
        return TodosDB.getTodos(this.props.listId)
      })
      .then((todos) => {
        this.setState({todos: todos});
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
        <TodoItemAdd />
        {this.renderItems()}
      </ScrollView>
    )
  }
});
