import Ember from 'ember';
import TodoStoreListenerMixin from '../../../mixins/todo-store-listener';
import { module, test } from 'qunit';

module('TodoStoreListenerMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var TodoStoreListenerObject = Ember.Object.extend(TodoStoreListenerMixin);
  var subject = TodoStoreListenerObject.create();
  assert.ok(subject);
});
