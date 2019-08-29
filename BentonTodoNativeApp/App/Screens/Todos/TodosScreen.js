import React, {Component} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container} from 'native-base';

import AppHeader from 'BentonTodoNativeApp/App/Components/AppHeader';
import TodoInput from 'BentonTodoNativeApp/App/Components/TodoInput';
import Todos from 'BentonTodoNativeApp/App/Components/Todos';
import Actions from 'BentonTodoNativeApp/App/Thunks/Todos';

class TodosScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    return this.props.getAllTodos();
  }

  render() {
    return (
      <Container>
        <AppHeader
          title="Todos"
          icon="menu"
          onPress={this.props.navigation.openDrawer}
        />

        <SafeAreaView style={styles.safeArea}>
          <Todos
            isLoading={this.props.todos.isLoading}
            todos={this.props.todos.data}
            update={this.props.updateTodo}
            delete={this.props.deleteTodo}
          />

          <TodoInput add={this.props.createTodo} />
        </SafeAreaView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

TodosScreen.navigationOptions = ({navigation}) => {
  return {
    header: null,
  };
};

const mapStateToProps = state => {
  return {...state};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...Actions,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodosScreen);
