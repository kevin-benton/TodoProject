import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {
  Body,
  Button,
  CheckBox,
  Content,
  Icon,
  List,
  ListItem,
  Spinner,
  Text,
} from 'native-base';

import Colors from 'BentonTodoNativeApp/App/Config/Colors';

export default class Todos extends Component {
  constructor(props) {
    super(props);
  }

  toggleComplete(todo) {
    const update = {
      id: todo.id,
      name: todo.name,
      completed: !todo.completed,
      created: todo.created,
    };

    this.props.update(update);
  }

  render() {
    if (this.props.isLoading) {
      return (
        <Content>
          <Spinner />
        </Content>
      );
    }

    return (
      <Content contentContainerStyle={styles.content}>
        <List>
          {this.props.todos.map(x => (
            <ListItem key={x.id} button>
              <CheckBox
                checked={x.completed}
                onPress={() => this.toggleComplete(x)}
              />
              <Body>
                <Text>{x.name}</Text>
              </Body>

              <Button
                iconLeft
                transparent
                onPress={() => this.props.delete(x.id)}>
                <Icon name="md-trash" style={styles.trashIcon} />
              </Button>
            </ListItem>
          ))}
        </List>
      </Content>
    );
  }
}

Todos.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  todos: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  trashIcon: {
    color: Colors.BRAND_DANGER,
  },
  content: {
    justifyContent: 'space-between',
  },
});
