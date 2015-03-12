import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    this.controllerFor('todos').set('filter', 'active');
    this.TodoStore.set('filter', 'completed');
    this.TodoActions.getTodos();
  }
});
