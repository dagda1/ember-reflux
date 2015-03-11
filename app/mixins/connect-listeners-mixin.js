import Ember from 'ember';

export default Ember.Mixin.create({
  connect: Ember.on('init', function(){
    this.Reflux.connectListeners.call(this, this.listenables);
  })
});
