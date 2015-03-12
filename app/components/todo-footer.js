import Ember from 'ember';
import TodoStoreListenerMixin from '../mixins/todo-store-listener.js';

export default Ember.Component.extend(TodoStoreListenerMixin, {
  todos: Ember.A(),

  onListUpdated: function(payload) {
    this._super.apply(this, arguments);

    this.set('todosLeft', payload.todosLeft);
  }
});
