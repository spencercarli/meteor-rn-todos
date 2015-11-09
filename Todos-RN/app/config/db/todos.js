let ddpClient = require('./lib/ddpClient');
let _ = require('underscore');

let TodosDB = {};

TodosDB.subscribeToTodos = (listId) => {
  return ddpClient.subscribe('todos', [listId]);
};

TodosDB.observeTodos = (listId, cb) => {
  let observer = ddpClient.connection.collections.observe(() => {
    return ddpClient.connection.collections.todos.find({listId: listId});
  });

  observer.subscribe((results) => {
    cb(results);
  });
};

// TodosDB.getTodos = (listId) => {
//   return new Promise(function (resolve, reject){
//     resolve(ddpClient.connection.collections.todos.find({listId: listId}));
//   });
// };

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
