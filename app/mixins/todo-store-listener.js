import Ember from 'ember';

let get = Ember.get,
    set = Ember.set;

export default Ember.Mixin.create({
  setup: Ember.on('didInsertElement', function() {
    let pubsub = get(this, 'pubsub');

    pubsub.subscribe('listUpadated', this, this.onListUpaded.bind(this));
  }),

  onListUpaded: function(payload){
    set(this, 'todos', payload.todos);
  }
});
