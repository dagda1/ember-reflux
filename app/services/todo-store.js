import Ember from 'ember';

export default Ember.Service.extend(Ember.ActionHandler, Ember.Evented, {
  addItem: function(description) {
    var newItem = {
      key: UUID4.generate(),
      created: new Date(),
      finished: false,
      description: description
    };

    let newList = mori.cons(newItem, this.todos);

    this.undoList = mori.cons(this.todos, this.undoList);

    this.updateList(this.todos, newList);

    this.todos = newList;
  },

  updateList: function(oldList, newList) {
    let payload = {
      todos: newList,
      canRedo: mori.count(this.redoList) > 0,
      canUndo: mori.count(this.undoList) > 0
    };

    console.log(payload);

    this.trigger('listUpadated', payload);
  },

  todos: null,
  undoList: null,
  redoList: null,

  setup: Ember.on('init', function(){
    this._actions = this.actions;

    this.todos = mori.vector();
    this.undoList = mori.vector();
    this.redoList = mori.vector();
  })
});
