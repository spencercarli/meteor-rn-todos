let React = require('react-native');
let {
  StyleSheet,
  View,
  Text,
  Navigator,
} = React;

let data = require('./config/data');
let Lists = require('./components/lists');
let NavigationBar = require('react-native-navbar');

export default React.createClass({
  // Configuration
  displayName: 'Main',

  // Initial Value (State and Props)
  getInitialState() {
    return {
      lists: data.lists
    };
  },

  renderScene(route, navigator) {
    let Component = route.component;

    let title = {};
    if (route.title) {
      title.title = route.title;
    }

    let leftButton = {};
    if (route.leftButton) {
      leftButton = route.leftButton;
    }

    return (
      <View style={styles.container}>
        <NavigationBar
          title={title}
          leftButton={leftButton}
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
          passProps: {
            lists: this.state.lists
          }
        }}
        renderScene={this.renderScene}
      />
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
