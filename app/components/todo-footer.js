import Ember from 'ember';
import TodoStoreListenerMixin from '../mixins/todo-store-listener.js';

export default Ember.Component.extend(TodoStoreListenerMixin, {
  todos: Ember.A(),

  completed: Ember.computed.filter('todos', function(todo){
    return !todo.finished;
  })
});
