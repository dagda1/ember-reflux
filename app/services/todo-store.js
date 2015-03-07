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

      let newList = this.list.unshift(newItem);

      this.send('updateList', this.list, newList);

      this.list = newList;
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

  list: null,
  undoList: null,
  redoList: null,

  canUndo: Ember.computed.bool('undoList.size'),
  canRedo: Ember.computed.bool('redolist.size'),

  setup: Ember.on('init', function(){
    this._actions = this.actions;

    this.list = Immutable.List.of();
    this.undoList = Immutable.List.of();
    this.redoList = Immutable.List.of();
  })
});
