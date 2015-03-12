import Ember from 'ember';
import ConnectListenersMixin from '../mixins/connect-listeners-mixin.js';
import TodoActions from '../utils/todo-actions';

function getExistingByKey(key, coll) {
  let found =  mori.first(mori.filter((t) => t.key === key, coll));

  return found;
}

function getIndexByKey(key, coll) {
  let i = 0,
      count = mori.count(coll);

  for (;i < count; i++) {
    let item = mori.get(coll, i);

    if (item.key === key) {
      return i;
    }
  }
}

export default Ember.Service.extend(ConnectListenersMixin, {
  onEditItem: function(key, description) {
    let existing = getExistingByKey(key, this.todos),
        index = getIndexByKey(key, this.todos),
        cloned = $.extend({}, existing);

    this.undoList = mori.cons(this.todos, this.undoList);

    cloned.description = description;

    var newList = mori.assoc(this.todos, index, cloned);

    this.updateList(newList);
  },

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
