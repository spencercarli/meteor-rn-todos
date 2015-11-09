let ddpClient = require('./lib/ddpClient');

let ListsDB = {};

ListsDB.subscribeToLists = () => {
  return ddpClient.subscribe('publicLists', []);
};

ListsDB.observeLists = (cb) => {
  let observer = ddpClient.connection.collections.observe(() => {
    return ddpClient.connection.collections.lists.find();
  });

  observer.subscribe((results) => {
    cb(results);
  });
};

// ListsDB.getLists = (userId) => {
//   return new Promise(function (resolve, reject){
//     resolve(ddpClient.connection.collections.lists.find());
//   });
// };

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
