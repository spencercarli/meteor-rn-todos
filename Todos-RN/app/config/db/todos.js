let data = require('../data');
let _ = require('underscore');

let TodosDB = {};

TodosDB.getTodos = (listId) => {
  let todos = _.where(data.todos, {listId: listId});

  return new Promise(function (resolve, reject){
    resolve(todos);
  });
};

TodosDB.addTodo = (todo) => {
  console.log('TODO: Submit new todo', todo);
};

TodosDB.deleteTodo = (todoId) => {
  console.log('TODO: Delete todo', todoId);
};

TodosDB.changeTodoState = (todoId, status) => {
  console.log('TODO: Change todo status', todoId, status);
};

module.exports = TodosDB;
