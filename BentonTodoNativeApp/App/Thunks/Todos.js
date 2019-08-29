import TodosActions from 'BentonTodoNativeApp/App/Redux/Todos';

import TodoApiService from 'BentonTodoNativeApp/App/Services/TodoApiService';

const getAllTodos = () => {
  return dispatch => {
    // Only show loading screen on initial get.
    dispatch(TodosActions.todosRequest());

    TodoApiService.getTodos()
      .then(res => {
        dispatch(TodosActions.setTodos(res.data));
      })
      .catch(error => {
        dispatch(TodosActions.setTodosError(error.message));
      });
  };
};

const createTodo = name => {
  return (dispatch, getState) => {
    TodoApiService.createTodo(name)
      .then(res => {
        // Set to current list plus new one.
        const {todos} = getState();
        dispatch(TodosActions.setTodos(todos.data.concat([res.data])));
      })
      .catch(error => {
        dispatch(TodosActions.setTodosError(error.message));
      });
  };
};

const updateTodo = todo => {
  return (dispatch, getState) => {
    // Update the list immideately for UI responsive. Revert on error.
    const {todos} = getState();
    dispatch(
      TodosActions.setTodos(
        todos.data.map(x => [todo].find(y => y.id === x.id) || x),
      ),
    );

    // Nothing to do on success.
    TodoApiService.updateTodo(todo).catch(error => {
      dispatch(TodosActions.setTodos(todos.data));
      dispatch(TodosActions.setTodosError(error.message));
    });
  };
};

const deleteTodo = id => {
  return (dispatch, getState) => {
    // Update the list immideately for UI responsive. Revert on error.
    const {todos} = getState();
    dispatch(TodosActions.setTodos(todos.data.filter(x => x.id !== id)));

    // Nothing to do on success.
    TodoApiService.deleteTodo(id).catch(error => {
      dispatch(TodosActions.setTodos(todos.data));
      dispatch(TodosActions.setTodosError(error.message));
    });
  };
};

export default {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
