let React = require('react-native');
let {
  StyleSheet,
  View,
  Text,
  Navigator,
} = React;

let data = require('../config/data');
let Lists = require('./lists/lists');
let NavigationBar = require('react-native-navbar');
let AppOptions = require('./appOptions');

export default React.createClass({
  // Configuration
  displayName: 'Main',

  // Initial Value (State and Props)
  getInitialState() {
    return {
      lists: data.lists,
      loggedIn: false
    };
  },

  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }
    return Navigator.SceneConfigs.HorizontalSwipeJump;
  },

  renderScene(route, navigator) {
    let Component = route.component;

    let title = {};
    if (route.title) {
      title.title = route.title;
    }

    let leftButton = undefined;
    if (route.leftButton) {
      leftButton = route.leftButton;
    }

    let rightButton = undefined;
    if (route.rightButton) {
      rightButton = React.cloneElement(route.rightButton, {navigator: navigator});
    }

    return (
      <View style={styles.container}>
        <NavigationBar
          title={title}
          leftButton={leftButton}
          rightButton={rightButton}
          />

        <Component
          navigator={navigator}
          {...route.passProps}
          />
      </View>
    );
  },

  // Component Render
  render() {
    return (
      <Navigator
        initialRoute={{
          component: Lists,
          title: "Todo Lists",
          rightButton: <AppOptions loggedIn={this.state.loggedIn} />,
          passProps: {
            lists: this.state.lists,
            loggedIn: this.state.loggedIn
          }
        }}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});