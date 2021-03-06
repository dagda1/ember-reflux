import Ember from 'ember';
import ConnectListenersMixin from '../mixins/connect-listeners-mixin.js';

let set = Ember.set;

export default Ember.Mixin.create( ConnectListenersMixin, {
  listenables: ['listUpdated'],

  onListUpdated: function(payload){
    set(this, 'todos', payload.todos);
  }
});
