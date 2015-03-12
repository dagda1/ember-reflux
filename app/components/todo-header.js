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

  disableUndo: true,
  disableRedo: true,

  keyDown: function (e) {
    Ember.run.next(() => {
      let text = e.target.value || '';

      if(e.which === 13 && text.length) {
        this.TodoActions.addItem(text);
        e.target.value = '';
        e.target.focus();
      }
      else if (e.which === 27) {
        e.target.value = '';
      }
    });
  },

  onListUpdated: function(payload) {
    this._super.apply(this, arguments);

    set(this, 'disableUndo', !payload.canUndo);
    set(this, 'disableRedo', !payload.canRedo);
  },

  setup: Ember.on('didInsertElement', function() {
    this._super.apply(this, arguments);

    this.TodoActions.getInitial();
  })
});
