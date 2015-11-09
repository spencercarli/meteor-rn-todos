/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;

let Main = require('./app/components/main.js');

var Todos = React.createClass({
  render: function() {
    return (
      <Main />
    );
  }
});

AppRegistry.registerComponent('Todos', () => Todos);
