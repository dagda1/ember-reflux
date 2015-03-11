import Ember from 'ember';
import TodoStoreListenerMixin from '../mixins/todo-store-listener.js';

var set = Ember.set;

export default Ember.Component.extend(TodoStoreListenerMixin, {
  actions: {
    undo: function() {
      this.TodoActions.undo();
    },

    redo: function() {
      this.TodoActions.redo();
    }
  },

  canUndo: false,
  canRedo: false,

  disableUndo: Ember.computed.not('canUndo'),
  disableRedo: Ember.computed.not('canRedo'),

  keyDown: function (e) {
    Ember.run.next(() => {
      let text = e.target.value || '';

      if(e.which === 13 && text.length) {
        this.TodoActions.addItem(text);
        e.target.value = '';
        e.target.focus();
      }
    });
  },

  onListUpdated: function(payload) {
    this._super.apply(this, arguments);

    set(this, 'canUndo', payload.canUndo);
    set(this, 'canRedo', payload.canRedo);
  }
});
