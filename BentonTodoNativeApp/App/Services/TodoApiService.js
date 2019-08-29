import api from 'BentonTodoNativeApp/App/Services/ApiService';

const getTodos = () => api.get('utility/v1/todos');
const getTodo = id => api.get(`utility/v1/todos/${id}`);
const createTodo = name => api.post('utility/v1/todos', {name: name});
const updateTodo = todo => api.put(`utility/v1/todos/${todo.id}`, todo);
const deleteTodo = id => api.delete(`utility/v1/todos/${id}`);

export default {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
