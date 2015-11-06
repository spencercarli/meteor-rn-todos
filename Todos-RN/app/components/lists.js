let React = require('react-native');
let {
  StyleSheet,
  View,
  Text,
  ScrollView,
  PixelRatio,
  TouchableHighlight,
  Image,
} = React;

let Todos = require('./todos');
let data = require('../config/data');
let _ = require('underscore');

export default React.createClass({
  // Configuration
  displayName: 'Lists',
  propTypes: {
    lists: React.PropTypes.array
  },

  // Initial Value (State and Props)
  getDefaultProps() {
    return {
      lists: []
    };
  },

  // Click Handlers
  handlePress(list) {
    let nav = this.props.navigator;

    if (!nav) return;

    let todos = _.where(data.todos, {listId: list._id});

    nav.push({
      component: Todos,
      title: list.name,
      leftButton: {
        title: "Back",
        handler: () => nav.pop()
      },
      passProps: {
        todos: todos
      }
    });
  },

  // Sub-render
  renderItems() {
    return this.props.lists.map((list, i) => {
      return (
        <View key={list._id}>
          <TouchableHighlight
            underlayColor='rgba(0, 0, 0, 0.1)'
            onPress={() => this.handlePress(list)}
            >
            <View style={styles.row}>
              <Text>{list.name}</Text>

              <Image
                source={require('image!fa-chevron-right')}
                style={styles.rightIcon}
                />
            </View>
          </TouchableHighlight>
          <View style={styles.border} />
        </View>
      )
    });
  },

  // Component Render
  render() {
    return (
      <ScrollView>
        {this.renderItems()}
      </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  row: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  border: {
    height: 1 / PixelRatio.get(),
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  rightIcon: {
    position: 'absolute',
    right: 15
  }
});
