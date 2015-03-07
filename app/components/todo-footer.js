import Ember from 'ember';

var get = Ember.get;

export default Ember.Component.extend({
  setup: Ember.on('didInsertElement', function() {
    let todoStore = get(this, 'todoStoreService');

    todoStore.on('listUpadated', this, this.onListUpaded.bind(this));
  }),

  onListUpaded: function(payload){
    this.set('todos', Ember.A(payload.todos.toJS()));
  },

  todos: Ember.A(),

  completed: Ember.computed.filter('todos', function(todo){
    return !todo.finished;
  })
});
