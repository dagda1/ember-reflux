import Ember from 'ember';
import ConnectListenersMixin from '../mixins/connect-listeners-mixin.js';
import TodoActions from '../utils/todo-actions';

export default Ember.Service.extend(ConnectListenersMixin, {
  onAddItem: function(description) {
    var newItem = {
      key: UUID4.generate(),
      created: new Date(),
      finished: false,
      description: description
    };

    let newList = mori.conj(this.todos, newItem);

    this.undoList = mori.cons(this.todos, this.undoList);

    this.updateList(newList);
  },

  onUndo: function() {
    let reverted = mori.first(this.undoList);

    this.redoList = mori.cons(this.todos, this.redoList);
    this.undoList = mori.drop(1, this.undoList);

    this.updateList(reverted);
  },

  onRedo: function() {
    let reverted = mori.first(this.redoList);

    this.undoList = mori.cons(this.todos, this.undoList);
    this.redoList = mori.drop(1, this.redoList);

    this.updateList(reverted);
  },

  updateList: function(newList) {
    let payload = {
      todos: mori.toJs(newList),
      canRedo: mori.count(this.redoList) > 0,
      canUndo: mori.count(this.undoList) > 0
    };

    this.trigger('listUpdated', payload);

    this.todos = newList;
  },

  todos: null,
  undoList: null,
  redoList: null,

  listenables: TodoActions,

  setup: Ember.on('init', function(){
    this.todos = mori.vector();
    this.undoList = mori.vector();
    this.redoList = mori.vector();
  })
});
