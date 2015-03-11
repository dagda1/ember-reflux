import Ember from 'ember';

var set = Ember.set,
    get = Ember.get;

export default Ember.Component.extend({
  actions: {
    handleEditStart: function() {
      set(this, 'isEditing', true);

      set(this, 'description', get(this, 'todo.description'));

      Ember.run.next(() => {
        this.$('input.edit').focus();
      });
    },

    handleBlur: function() {
      set(this, 'isEditing', false);

      if (!get(this, 'isEditing')) {
        return;
      }

      console.log(event);
    }
  },
  keyDown: function(e) {
    let text = e.target.value || '';

    if (e.which === 13 && text.length) {
      this.send('handleBlur');
    }
    else if (e.which === 27) {
      this.$('input.edit').val('').blur();
    }
  },
  isEditing: false,
  classNameBindings: ['isEditing:editing'],
});

