let React = require('react-native');
let {AsyncStorage} = React;
let ddpClient = require('./lib/ddpClient');

let login = (loginObj, resolve, reject) => {
  let obj = { loggedIn: false};
  let loginParams = {};

  if (loginObj.email && loginObj.password) {
    loginParams = { user : { email : loginObj.email }, password : loginObj.password };
  } else if (loginObj.resume) {
    loginParams = { resume: loginObj.resume };
  }

  ddpClient.connection.call("login", [loginParams], (err, res) => {
    if (err) {
      reject(err);
    }

    if (res) {
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
};

let Accounts = {};

Accounts.signOut = () => {
  return new Promise((resolve, reject) => {
    ddpClient.connection.call("logout", [], (err, res) => {
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
  return new Promise((resolve, reject) => {
    login({email: email, password: password}, resolve, reject);
  });
};

Accounts.signInWithToken = () => {
  return new Promise((resolve, reject) => {
    // Check if we have a loginToken in persistent client storage
    AsyncStorage.getItem('loginToken')
      .then((token) => {
        if (token) {
          login({resume: token}, resolve, reject);
        } else {
          resolve({loggedIn: false});
        }
      });
  });
};

Accounts.signUp = (email, password) => {
  console.log('TODO: Handle Sign Up', email, password);
};

module.exports = Accounts;
