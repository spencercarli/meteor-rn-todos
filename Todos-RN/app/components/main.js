let React = require('react-native');
let {
  StyleSheet,
  View,
  Text,
  Navigator,
} = React;

let Lists = require('./lists/lists');
let NavigationBar = require('react-native-navbar');
let AppOptions = require('./appOptions');

let ddpClient = require('../config/db/lib/ddpClient');

// Polyfill the process functionality needed for minimongo-cache
global.process = require("../config/db/lib/process.polyfill");

export default React.createClass({
  // Configuration
  displayName: 'Main',

  // Initial Value (State and Props)
  getInitialState() {
    return {
      loggedIn: false,
      loaded: false
    };
  },

  // Component Lifecycle
  componentWillMount() {
    ddpClient.initialize()
      .then((res) => {
        this.setState({loaded: true});
      });
  },

  componentWillUnmount() {
    ddpClient.close();
  },

  // Navigator Config
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
    if (!this.state.loaded) {
      return (
        <View>
          <Text>Connecting...</Text>
        </View>
      );
    }

    return (
      <Navigator
        initialRoute={{
          component: Lists,
          title: "Todo Lists",
          rightButton: <AppOptions loggedIn={this.state.loggedIn} />,
          passProps: {
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
