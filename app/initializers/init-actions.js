import TodoActionList from '../utils/todo-actions';

export function initialize(container, application) {
  let reflux = container.lookup('service:reflux'),
      TodoActions = reflux.createActions(TodoActionList);

  application.register('todoactions:current', TodoActions, {instantiate: false});

  application.inject('component', 'TodoActions', 'todoactions:current');
  application.inject('route', 'TodoActions', 'todoactions:current');

  application.register('reflux:current', reflux, {instantiate: false});

  application.inject('component', 'Reflux', 'reflux:current');
  application.inject('service', 'Reflux', 'reflux:current');
}

export default {
  name: 'init-actions',
  after: 'pubsub-service',
  initialize: initialize
};
