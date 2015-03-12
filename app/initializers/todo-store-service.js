export function initialize(container, application) {
  application.inject('component', 'todoStoreService', 'service:todo-store');
  application.inject('route', 'TodoStore', 'service:todo-store');

  // we need to do this to initialise the listeners
  let todoStore = container.lookup('service:todo-store');
}

export default {
  name: 'todo-store-service',
  initialize: initialize
};
