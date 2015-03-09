import Ember from 'ember';

let get = Ember.get;

export default Ember.Mixin.create({
  listenToMany: Ember.on('init', function(){
    let i = 0;

    for(; i < this.listenables.length; i++) {
      let action = this.listenables[i],
          handler = 'on' + action.capitalize();

      this.pubsub.subscribe(action, this, this[handler].bind(this));
    }
  })
});
