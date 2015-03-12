import Ember from 'ember';
import ConnectListenersMixin from '../mixins/connect-listeners-mixin.js';
import TodoActions from '../utils/todo-actions';

let get = Ember.get;

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

let filters = {
  all: () => {
    return true;
  },
  active: (todo) => {
    return !todo.finished;
  },
  completed: (todo) => {
    return todo.finished;
  },
};

export default Ember.Service.extend(ConnectListenersMixin, {
  onToggleAll: function() {
    this.undoList = mori.cons(this.todos, this.undoList);

    let transform = (todo) => {
      let existing = getExistingByKey(todo.key, this.todos),
          cloned = $.extend({}, existing);

      cloned.finished = !cloned.finished;

      return cloned;
    };

    let newList = mori.map(transform, this.todos);

    this.updateList(newList);
  },

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

  onDestroyItem: function(key) {
    this.undoList = mori.cons(this.todos, this.undoList);

    let predicate = (todo) => {
      return todo.key === key;
    };

    let newList = mori.remove(predicate, this.todos);

    this.updateList(newList);
  },

  onToggleItem: function(key) {
    let existing = getExistingByKey(key, this.todos),
        index = getIndexByKey(key, this.todos),
        cloned = $.extend({}, existing);

    this.undoList = mori.cons(this.todos, this.undoList);

    cloned.finished = !existing.finished;

    let newList = mori.assoc(this.todos, index, cloned);

    this.updateList(newList);
  },

  onGetTodos: function() {
    let payload = this.getPayLoad(this.todos);

    this.trigger('listUpdated', payload);
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

  getPayLoad: function(list) {
    let filter = get(this, 'filter'),
        todos = null,
        todosLeft = mori.count(mori.filter(filters['active'], list));

    todos = mori.filter(filters[filter], list);

    return {
      todos: mori.toJs(todos),
      canRedo: mori.count(this.redoList) > 0,
      canUndo: mori.count(this.undoList) > 0,
      todosLeft: todosLeft
    };
  },

  updateList: function(newList) {
    let payload = this.getPayLoad(newList);

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
