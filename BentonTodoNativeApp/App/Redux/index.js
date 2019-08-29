import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';

export const reducers = combineReducers({
  theme: require('./Theme').reducer,
  todos: require('./Todos').reducer,
});

export default () => {
  return createStore(reducers, applyMiddleware(thunk));
};
