import Ember from 'ember';
import TodoStoreListenerMixin from '../mixins/todo-store-listener.js';

export default Ember.Component.extend(TodoStoreListenerMixin, {
  actions: {
    toggleAll: function(){
      this.TodoActions.toggleAll();
    }
  }
});
