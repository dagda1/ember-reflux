import Ember from 'ember';

let get = Ember.get,
    __slice = Array.prototype.slice;

export default Ember.Mixin.create({
  listenToMany: Ember.on('init', function(){
    let i = 0,
        pubsub = this.pubsub;

    for(; i < this.listenables.length; i++) {
      let action = this.listenables[i],
          handler = 'on' + action.capitalize();

      pubsub.subscribe(action, this, this[handler].bind(this));
    }

    if(this.trigger){
      return;
    }

    this.trigger = function() {
      let args = __slice.apply(arguments);

      pubsub.publish.apply(pubsub, args);
    };
  })
});
