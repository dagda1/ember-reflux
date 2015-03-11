import Ember from 'ember';

let __slice = Array.prototype.slice;

export default Ember.Object.extend({
  createActions: function(actionList) {
    let actions = {},
        pubsub = this.pubsub;

    let createAction = function(actions, action){
      actions[action] = function() {
        let args = __slice.apply(arguments);

        args.unshift(action);

        pubsub.publish.apply(pubsub, args);
      };
    };

    for(let action of actionList){
      createAction(actions, action);
    }

    return actions;
  },

  connectListeners: function(listenables) {
    if(!listenables || !listenables.length) {
      return;
    }

    let i = 0,
        pubsub = this.pubsub;

    for(; i < listenables.length; i++) {
      let action = listenables[i],
          handler = 'on' + action.capitalize();

      Ember.assert("You have no handler named " + handler + " for the action " + action, typeof this[handler] === "function");

      pubsub.subscribe(action, this, this[handler].bind(this));
    }

    if(this.trigger){
      return;
    }

    this.trigger = function() {
      let args = __slice.apply(arguments);

      pubsub.publish.apply(pubsub, args);
    };
  }
});
