import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Actions ------------- */

const {Types, Creators} = createActions({
  todosRequest: null,
  setTodos: ['todos'],
  setTodosError: ['error'],
});

export const TodosTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoading: false,
  data: [],
  error: null,
});

/* ------------- Reducers ------------- */

export const todosRequest = state => state.merge({isLoading: true});
export const setTodos = (state, action) =>
  state.merge({isLoading: false, data: action.todos, error: null});
export const setTodosError = (state, error) =>
  state.merge({isLoading: false, error: error});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TODOS_REQUEST]: todosRequest,
  [Types.SET_TODOS]: setTodos,
  [Types.SET_TODOS_ERROR]: setTodosError,
});
