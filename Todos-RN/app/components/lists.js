let React = require('react-native');
let {
  StyleSheet,
  View,
  Text,
  ScrollView,
  PixelRatio,
  TouchableHighlight,
} = React;

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
  handlePress() {
    console.log('press!');
  },

  // Sub-render
  renderItems() {
    return this.props.lists.map((list, i) => {
      return (
        <View key={list._id}>
          <TouchableHighlight
            underlayColor='rgba(0, 0, 0, 0.1)'
            onPress={this.handlePress}
            >
            <View style={styles.row}>
              <Text>{list.name}</Text>
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
    padding: 15
  },
  border: {
    height: 1 / PixelRatio.get(),
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});
