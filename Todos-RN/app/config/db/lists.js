let data = require('../data');

let ListsDB = {};

ListsDB.getLists = (userId) => {
  return new Promise(function (resolve, reject){
    resolve(data.lists);
  });
};

ListsDB.addNewList = (listName) => {
  console.log('TODO: Submit new list');
};

ListsDB.makeListPrivate = (listId, userId) => {
  console.log('TODO: Make List Private');
};

ListsDB.deleteList = (listId) => {
  console.log('Todo: Delete list and items');
};

module.exports = ListsDB;
