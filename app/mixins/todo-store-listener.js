import Ember from 'ember';

let get = Ember.get,
    set = Ember.set;

export default Ember.Mixin.create({
  setup: Ember.on('didInsertElement', function() {
    let todoStore = get(this, 'todoStoreService');

    todoStore.on('listUpadated', this, this.onListUpaded);
  }),

  onListUpaded: function(payload){
    set(this, 'todos', payload.todos);
  }
});
