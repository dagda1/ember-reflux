import Ember from 'ember';

var get = Ember.get;

export default Ember.Component.extend({
  target: Ember.computed.oneWay('todoStoreService'),

  keyDown: function (e) {
    Ember.run.next(() => {
      let text = e.target.value || '';

      if(e.which === 13 && text.length) {
        this.send('addItem', text);
        e.target.value = '';
        e.target.focus();
      }
    });
  }
});
