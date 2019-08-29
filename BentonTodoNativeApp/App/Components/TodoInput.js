import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Button, Icon, Input, InputGroup} from 'native-base';

export default class TodoInput extends Component {
  constructor(props) {
    super(props);

    this.state = {inputText: ''};
  }

  addTodo() {
    this.props.add(this.state.inputText);

    this.setState({
      inputText: '',
    });
  }

  render() {
    return (
      <View style={styles.addView}>
        <InputGroup borderType="underline" style={styles.addInput}>
          <Input
            placeholder="Add Todo"
            value={this.state.inputText}
            onChangeText={inputText => this.setState({inputText})}
            onSubmitEditing={() => this.addTodo()}
            maxLength={35}
          />
        </InputGroup>
        <Button
          iconLeft
          transparent
          style={styles.addButton}
          onPress={() => this.addTodo()}>
          <Icon name="md-add" />
        </Button>
      </View>
    );
  }
}

TodoInput.propTypes = {
  add: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  addView: {
    alignSelf: 'flex-end',
    flex: 0,
    padding: 5,
    flexDirection: 'row',
  },
  addInput: {
    flex: 0.9,
  },
  addButton: {
    flex: 0.1,
    marginLeft: 15,
  },
});
