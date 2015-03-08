import Ember from 'ember';

let get = Ember.get;

export default Ember.Service.extend(Ember.ActionHandler, Ember.Evented, {
  actions:{
    addItem: function(description) {
      var newItem = {
        key: UUID4.generate(),
        created: new Date(),
        finished: false,
        description: description
      };

      let newList = mori.cons(newItem, this.todos);

      this.send('updateList', this.todos, newList);

      this.todos = newList;
    },

    updateList: function(oldList, newList) {
      let payload = {
        todos: newList,
        canRedo: get(this, 'canRedo'),
        canUndo: get(this, 'canUndo')
      };

      this.trigger('listUpadated', payload);
    }
  },

  todos: null,
  undoList: null,
  redoList: null,

  canUndo: Ember.computed('undoList', function(){
    return mori.count(get(this, 'undoList')) > 0;
  }),

  canRedo: Ember.computed('redoList', function(){
    return mori.count(get(this, 'redoList')) > 0;
  }),

  setup: Ember.on('init', function(){
    this._actions = this.actions;

    this.todos = mori.vector();
    this.undoList = mori.vector();
    this.redoList = mori.vector();
  })
});
