import Ember from 'ember';
import TodoStoreListenerMixin from '../mixins/todo-store-listener.js';

var get = Ember.get,
    set = Ember.set;

export default Ember.Component.extend(TodoStoreListenerMixin, {

  canUndo: false,
  canRedo: false,

  disableUndo: Ember.computed.not('canUndo'),
  disableRedo: Ember.computed.not('canRedo'),

  keyDown: function (e) {
    Ember.run.next(() => {
      let text = e.target.value || '',
          todoStore = get(this, 'todoStoreService');

      if(e.which === 13 && text.length) {
        todoStore.addItem(text);
        e.target.value = '';
        e.target.focus();
      }
    });
  },

  onListUpaded: function(payload) {
    this._super.apply(this, arguments);

    set(this, 'canUndo', payload.canUndo);
    set(this, 'canRedo', payload.canRedo);
  }
});
