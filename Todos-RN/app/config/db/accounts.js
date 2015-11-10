let React = require('react-native');
let {AsyncStorage} = React;
let ddpClient = require('./lib/ddpClient');

let Accounts = {};

Accounts.signOut = () => {
  return new Promise(function(resolve, reject) {
    ddpClient.connection.call("logout", [], function (err, res) {
      console.log('Logged out.');
      if (err) {
        console.log('err', err);
      } else {
        console.log('delete the tokens');
        AsyncStorage.multiRemove(['userId', 'loginToken', 'loginTokenExpires']);
      }
    });
    resolve(true);
  });
};

Accounts.signIn = (email, password) => {
  return new Promise(function(resolve, reject) {
    var obj = {
      loggedIn: false
    };

    ddpClient.connection.call("login", [
      { user : { email : email }, password : password }
    ], function (err, res) {
      if (err) {
        reject(err);
      }

      if (res) {
        console.log('sucess!');
        AsyncStorage.setItem('userId', res.id)
        AsyncStorage.setItem('loginToken', res.token);
        AsyncStorage.setItem('loginTokenExpires', res.tokenExpires);

        obj.loggedIn = true;
        obj.userId = res.id;

        resolve(obj);
      } else {
        resolve(obj);
      }
    });
  });
};

Accounts.signInWithToken = () => {
  return new Promise(function(resolve, reject) {
    // Check if we have a loginToken in persistent client storage
    AsyncStorage.getItem('loginToken')
      .then(function(token) {
        var obj = {
          loggedIn: false
        };

        // Login with said token
        if (token) {
          ddpClient.connection.call("login", [{ resume: token }], function (err, res) {
            console.log('Logged in with resume token.');
            if (res) {
              // Update information.
              AsyncStorage.setItem('userId', res.id)
              AsyncStorage.setItem('loginToken', res.token);
              AsyncStorage.setItem('loginTokenExpires', res.tokenExpires);

              obj = {
                loggedIn: true,
                userId: res.id
              };

              resolve(obj);
            } else {
              resolve(obj);
            }
          });
        } else {
          console.log('No token found');
          resolve(obj);
        }
      });
  });
};

Accounts.signUp = (email, password) => {
  console.log('TODO: Handle Sign Up', email, password);
};

module.exports = Accounts;
