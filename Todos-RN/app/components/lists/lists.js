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

let Todos = require('../todos/todos');
let ListItemAdd = require('./listItemAdd');
let ListOptions = require('./listOptions');

let ListsDB = require('../../config/db/lists');

export default React.createClass({
  // Configuration
  displayName: 'Lists',
  propTypes: {
    loggedIn: React.PropTypes.bool
  },

  // Initial Value (State and Props)
  getInitialState() {
    return {
      lists: []
    }
  },

  // Component Lifecycle
  componentWillMount() {
    ListsDB.subscribeToLists()
      .then(() => {
        ListsDB.observeLists((results) => {
          this.setState({lists: results});
        });
      })
      .catch((err) => {
        console.log('Error: ', err);
      });

  },

  // Event Handlers
  handlePress(list) {
    let nav = this.props.navigator;

    if (!nav) return;

    let rightButton = (
      <ListOptions
        navigator={nav}
        loggedIn={this.props.loggedIn}
        listId={list._id}
        />
    );

    nav.push({
      component: Todos,
      title: list.name,
      leftButton: {
        title: "Back",
        handler: () => nav.pop()
      },
      rightButton: rightButton,
      passProps: {
        listId: list._id
      }
    });
  },

  // Sub-render
  renderItems() {
    return this.state.lists.map((list, i) => {
      return (
        <View key={list._id}>
          <TouchableHighlight
            underlayColor='rgba(0, 0, 0, 0.1)'
            onPress={() => this.handlePress(list)}
            >
            <View style={styles.row}>
              <View style={styles.incomplete}>
                <Text style={styles.incompleteText}>{list.incompleteCount}</Text>
              </View>

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
        <ListItemAdd />
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
    right: 15,
    tintColor: 'rgba(0, 0, 0, 0.25)'
  },
  incompleteText: {
    color: '#ffffff',
  },
  incomplete: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
