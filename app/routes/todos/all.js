import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function() {
    this.controllerFor('todos').set('filter', 'active');
    this.TodoStore.set('filter', 'all');
    this.TodoActions.getTodos();
  }
});
